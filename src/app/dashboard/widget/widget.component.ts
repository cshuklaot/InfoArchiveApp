import { NgModule, Component, OnInit, Input } from '@angular/core';
import { InputDataModel } from '../../beans/InputDataModel';
import { BrowserModule } from '@angular/platform-browser';

import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  ValidatorFn
} from '@angular/forms';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css']
})
export class WidgetComponent {
  type: string;
  constructor() { }
  formControl: FormControl;
  @Input() inputmodel: InputDataModel;
  @Input() form: FormGroup;
  ngOnInit(): void {
    this.formControl = new FormControl('', this.getvalidators(this.inputmodel));
    this.form.addControl(this.inputmodel.name, this.formControl);
  }


  getvalidators(simple: InputDataModel):ValidatorFn[] {
    console.log(simple.name);

    let v: ValidatorFn[] = [];
    if (simple.minLength > 0) {
      v.push(Validators.minLength(simple.minLength))
      console.log('minLength');
    }
    if (simple.maxLength > 0) {
      v.push(Validators.maxLength(simple.maxLength))
      console.log('maxLength');

    }
    if (simple.minvalue > 0) {
      v.push(Validators.min(simple.minvalue))
      console.log('minvalue');

    }
    if (simple.maxvalue > 0) {
      v.push(Validators.max(simple.maxvalue))
      console.log('maxvalue');
    }
    console.log('-------');

    return v;
  }

}
