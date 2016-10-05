import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Concurrents page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-concurrents',
  templateUrl: 'concurrents.html'
})
export class Concurrents {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello Concurrents Page');
  }

}
