import { Component} from '@angular/core';
import {ContentOfForm, TYPE_OF_FORM} from "@core/models";

@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.component.html',
  styleUrls: ['./geolocation.component.css']
})
export class GeolocationComponent {
  contentOfForm:ContentOfForm|null=null;
  readonly TYPE_OF_FORM = TYPE_OF_FORM;

  onSubmitContentOfForm(content:ContentOfForm){
    this.contentOfForm = content;
    console.log(content);
  }

  onNewFormDisplay(content:ContentOfForm){
    this.contentOfForm = content;
    console.log("RETOUR",content)
  }
}
