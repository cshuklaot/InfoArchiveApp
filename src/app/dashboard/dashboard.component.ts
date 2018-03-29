import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { MapOperator } from 'rxjs/operators/map';
import { tanent } from '../beans/tanent';
import { application } from '../beans/application';
import { holding } from '../beans/holding';
import { FileUploadService } from '../file-upload.service';
const APPLICATION_KEY='http://identifiers.emc.com/applications';
const HOLDINGS_KEY='http://identifiers.emc.com/holdings';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public tanents: tanent[] = [];
  public appliactions: application[] = [];
  public holdings: holding[] = [];
  private selectedTanent: tanent;
  private selectedApplication: application;
  private selectedHolding:holding;
  public loading:boolean=false;
  fileToUpload: File  = null;
  constructor(
    private restService: RestService,
    private fileuploadService:FileUploadService) { }

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
            let t = new application(element);
            this.appliactions.push(t);
          })
      );
  }
  getHolding(){
    this.clean(this.holdings);
    this.restService.doGet(this.selectedApplication.map.get(HOLDINGS_KEY).replace(/^(?:\/\/|[^\/]+)*\//, "")).
    subscribe(
      (app: any) =>
        app._embedded.holdings.forEach(element => {
          let t = new holding(element);
          this.holdings.push(t);
          console.log(t);
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
  }
  
  upload() {
    this.loading=true;
     this.fileuploadService.fileUpload(this.fileToUpload,{
      'tanent':this.selectedTanent.name,
      'application':this.selectedApplication.name,
      'holding':this.selectedHolding.name      
    }).subscribe(
      error=>{
          console.log("Server error")
      });;
  }
  clean(array:Array<any>)
  {
    return array.splice(0,array.length);
  }
  handleFileInput(files: FileList) {
    let fileItem = files.item(0);
    console.log("file input has changed. The file is", fileItem)
    this.fileToUpload = fileItem;
}
}
