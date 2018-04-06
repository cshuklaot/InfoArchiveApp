import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { MapOperator } from 'rxjs/operators/map';
import { tanent } from '../beans/tanent';
import { application } from '../beans/application';
import { holding } from '../beans/holding';
import { restObject } from '../beans/restObject';
import { InputDataModel } from '../beans/InputDataModel';
import { returnModel } from '../beans/returnModel';
import { NgModule } from '@angular/core';
import { NgForm, Validators, ValidatorFn } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { saveAs } from 'file-saver/FileSaver';
const APPLICATION_KEY = 'http://identifiers.emc.com/applications';
const HOLDINGS_KEY = 'http://identifiers.emc.com/holdings';
const SCHEMA_URL_KEY = 'http://identifiers.emc.com/pdi-schemas';
const CONTENTS_KEY = 'http://identifiers.emc.com/contents';
const CONTENTS_DOWNLOAD_KEY = 'http://identifiers.emc.com/content-download';
const apiCreateEndpoint = 'upload/store/'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public tanents: tanent[] = [];
  public appliactions: application[] = [];
  public holdings: holding[] = [];
  public datamodel: returnModel;
  private selectedTanent: tanent;
  private selectedApplication: application;
  private selectedHolding: holding;
  public loading: boolean = false;
  fileToUpload: File = null;
  public form: FormGroup;
  constructor(
    private restService: RestService) {

    this.form = new FormGroup({
      tanent: new FormControl('', <any>Validators.required),
      application: new FormControl('', <any>Validators.required),
      holding: new FormControl('', <any>Validators.required)
    });
  }

  ngOnInit() {
    this.getTanents();
  }
  getTanents() {
    this.clean(this.tanents);
    this.clean(this.appliactions);
    this.clean(this.holdings);
    this.restService.doGet("restapi/systemdata/tenants").
      subscribe(
        (tan: any) =>
          tan._embedded.tenants.forEach(element => {
            let t = new tanent(element);
            this.tanents.push(t);
          })
      );
  }
  getApplications() {
    this.clean(this.appliactions);
    this.clean(this.holdings);
    this.restService.doGet(this.selectedTanent.map.get(APPLICATION_KEY).replace(/^(?:\/\/|[^\/]+)*\//, "")).
      subscribe(
        (app: any) =>
          app._embedded.applications.forEach(element => {
            if (element.archiveType === 'SIP') {
              let t = new application(element);
              this.appliactions.push(t);
            }
          })
      );
  }
  getHolding() {
    this.clean(this.holdings);
    this.restService.doGet(this.selectedApplication.map.get(HOLDINGS_KEY).replace(/^(?:\/\/|[^\/]+)*\//, "")).
      subscribe(
        (app: any) =>
          app._embedded.holdings.forEach(element => {
            let t = new holding(element);
            console.log(t);
            this.holdings.push(t);
          })
      );
  }
  setNewTanent(tanent: any) {
    this.selectedTanent = tanent;
    this.getApplications();
  }
  setNewApplication(app: any) {
    this.selectedApplication = app;
    this.getHolding();

  }
  setNewHolding(holding: any) {
    this.selectedHolding = holding;
    this.reFreshHoldingSchema();
  }
  reFreshHoldingSchema() {
    let pdiSchemas: restObject;
    this.getRestChildObject(this.selectedApplication, SCHEMA_URL_KEY).subscribe
      (
      (app: any) =>
        app._embedded.pdiSchemas.forEach(element => {
          if (element.name === this.selectedHolding.schema) {
            pdiSchemas = new restObject(element);
            console.log(pdiSchemas);
            this.getRestChildObject(pdiSchemas, CONTENTS_KEY).subscribe(
              (app: any) =>
                app._embedded.contents.forEach(element => {
                  let contentDownload = new restObject(element);
                  console.log(contentDownload);
                  this.getcontent(contentDownload, CONTENTS_DOWNLOAD_KEY).subscribe(
                    (dataReceived: any) => {
                      console.log("processing Content");
                      console.log(dataReceived);
                      var blob = new Blob([dataReceived.body], { type: 'application/octet-stream' });
                      const formData: FormData = new FormData();
                      formData.append('schema', blob, "pdi-schema.xml");
                      this.restService.dopost("/parse/schema", formData).subscribe(
                        (app: any) => {
                          this.datamodel = app;
                          //this.refreshFormGroup();
                        })
                    },
                  )
                })
            )
          }
        }, )
      );
    console.log(pdiSchemas);
  }
  /*  refreshFormGroup() {
     this.datamodel.simpleModels.forEach
       (simple => {
         this.form.addControl(simple.name, new FormControl('', this.getvalidators(simple)));
       })
   } */
  getRestChildObject(rest: restObject, key: String) {
    return this.restService.doGet(rest.map.get(key).replace(/^(?:\/\/|[^\/]+)*\//, ""));
  }

  getcontent(rest: restObject, key: String) {
    return this.restService.getBinary(rest.map.get(key).replace(/^(?:\/\/|[^\/]+)*\//, ""));
  }
  upload() {
    console.log(this.form.value);
    let formdata = this.prepareformdata();
    this.restService.postBinary(apiCreateEndpoint, formdata).
      subscribe(
      //   data => this.saveToFileSystem(data)
    ),
      error => console.log("Error downloading the file."),
      () => console.info("OK")
  }

  private saveToFileSystem(response) {
    const contentDispositionHeader: string = response.headers.get('Content-Disposition');
    const parts: string[] = contentDispositionHeader.split(';');
    const filename = parts[1].split('=')[1];
    const blob = new Blob([response.body], { type: 'text/plain' });
    saveAs(blob, filename);
  }
  prepareformdata(): FormData {
    const formData: FormData = new FormData();
    formData.append('files', this.fileToUpload, this.fileToUpload.name);
    formData.append("formInfo", JSON.stringify(this.form.value));
    formData.append("InputModel", JSON.stringify(this.datamodel));
    console.log(formData);
    return formData;
  }
  clean(array: Array<any>) {
    return array.splice(0, array.length);
  }
  handleFileInput(files: FileList) {
    let fileItem = files.item(0);
    this.fileToUpload = fileItem;
  }
}
