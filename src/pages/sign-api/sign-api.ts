import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the SignApi page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-sign-api',
  templateUrl: 'sign-api.html'
})
export class SignApi {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello SignApi Page');
  }

}
