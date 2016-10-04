import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Synchro page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-synchro',
  templateUrl: 'synchro.html'
})
export class Synchro {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello Synchro Page');
  }

}
