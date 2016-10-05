import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the DiagConseil page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-diag-conseil',
  templateUrl: 'diag-conseil.html'
})
export class DiagConseil {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello DiagConseil Page');
  }

}
