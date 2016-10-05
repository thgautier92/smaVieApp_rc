import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the OptionCopier page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-option-copier',
  templateUrl: 'option-copier.html'
})
export class OptionCopier {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello OptionCopier Page');
  }

}
