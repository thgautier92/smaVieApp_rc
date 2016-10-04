import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Rdv page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-rdv',
  templateUrl: 'rdv.html'
})
export class Rdv {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello Rdv Page');
  }

}
