import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Patrimoine page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-patrimoine',
  templateUrl: 'patrimoine.html'
})
export class Patrimoine {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello Patrimoine Page');
  }

}
