import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Identit page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-identity',
  templateUrl: 'identity.html'
})
export class Identity {
  signSend: any = {};
  saveModel: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.signSend = this.navParams.get('model');
    this.saveModel = this.navParams.get('onSave');
  }

  ionViewDidLoad() {
    console.log('Hello Identity Page');
  }

}
