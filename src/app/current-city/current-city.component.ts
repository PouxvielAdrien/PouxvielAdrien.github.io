import {Component} from '@angular/core';
import {ContentOfForm, TYPE_OF_FORM} from "@core/models";
@Component({
  selector: 'app-current-city',
  templateUrl: './current-city.component.html',
  styleUrls: ['./current-city.component.css']
})
export class CurrentCityComponent {
  contentOfForm:ContentOfForm|null=null;
  readonly TYPE_OF_FORM = TYPE_OF_FORM;

  onSubmitContentOfForm(content:ContentOfForm){
    this.contentOfForm = content;
    console.log(content);
  }

  onNewFormDisplay(content:ContentOfForm){
    this.contentOfForm = content;
  }
}





