import {Component} from '@angular/core';
import {ContentOfForm, TYPE_OF_FORM} from "@core/models";

@Component({
  selector: 'app-forecast-coord',
  templateUrl: './forecast-coord.component.html',
  styleUrls: ['./forecast-coord.component.css']
})
export class ForecastCoordComponent {
  contentOfForm:ContentOfForm|null=null;
  readonly TYPE_OF_FORM = TYPE_OF_FORM;

  onSubmitContentOfForm(content:ContentOfForm){
    this.contentOfForm = content;
  }

  onNewFormDisplay(content:ContentOfForm){
    this.contentOfForm = content;
  }
}
