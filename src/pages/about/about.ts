import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InfoDevice } from '../../providers/comon/info-device';

/*
  Generated class for the About page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  providers: [InfoDevice]
})
export class About {
  infos: any;
  constructor(public navCtrl: NavController, public infosDevice: InfoDevice) {

  }
  ionViewDidLoad() {
    console.log('Hello About Page');
  }
  ngOnInit(){
    this.getInfoDevice();
  }
  getInfoDevice() {
    this.infos = {};
    this.infosDevice.getDeviceInfos().then(response => {
      this.infos = response;
      //console.log(response);
    })
  }
}
