import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Decouverte page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-decouverte',
  templateUrl: 'decouverte.html'
})
export class Decouverte {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello Decouverte Page');
  }

}
