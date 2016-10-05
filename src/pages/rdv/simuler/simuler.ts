import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Simuler page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-simuler',
  templateUrl: 'simuler.html'
})
export class Simuler {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello Simuler Page');
  }

}
