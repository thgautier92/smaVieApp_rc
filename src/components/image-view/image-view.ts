import { Component } from '@angular/core';
import {NavParams, ViewController} from 'ionic-angular';

/*
  Generated class for the ImageView component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'image-view',
  templateUrl: 'image-view.html'
})
export class ImageView {

  url: string;
  constructor(public navParams:NavParams, public viewCtrl:ViewController) {
    console.log('Hello ImageView Component');
    this.url = this.navParams['data']['img64'];
  }
    close() {
    this.viewCtrl.dismiss();
  }

}
