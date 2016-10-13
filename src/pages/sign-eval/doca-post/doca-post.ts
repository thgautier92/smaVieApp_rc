import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the DocaPost page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-doca-post',
  templateUrl: 'doca-post.html'
})
export class DocaPost {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello DocaPost Page');
  }
  openAdminCtrl(){}

}
