import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Signature page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-signature',
  templateUrl: 'signature.html'
})
export class Signature {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello Signature Page');
  }

}
