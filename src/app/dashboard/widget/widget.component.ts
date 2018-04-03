import { Component, OnInit ,Input} from '@angular/core';
import { InputDataModel } from '../../beans/InputDataModel';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css']
})
export class WidgetComponent  {

  constructor() { }

  @Input() inputmodel: InputDataModel;

}
