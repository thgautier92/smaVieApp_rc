import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the OptionPieces page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-option-pieces',
  templateUrl: 'option-pieces.html'
})
export class OptionPieces {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello OptionPieces Page');
  }

}
