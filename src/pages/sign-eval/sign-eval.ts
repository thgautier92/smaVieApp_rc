import { Component } from '@angular/core';
import { NavController,Events } from 'ionic-angular';
import { Identity } from './identity/identity'
import { DocuSignPage } from './docu-sign/docu-sign'
import { DocaPost } from './doca-post/doca-post'

/*
  Generated class for the SignEval tabs.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Component({
  selector: 'page-sign-eval',
  templateUrl: 'sign-eval.html'
})
export class SignEval {

  tab1Root: any = Identity;
  tab2Root: any = DocuSignPage;
  tab3Root: any = DocaPost;
  signSend: any = {};
  constructor(public navCtrl: NavController, public events:Events) {
    this.signSend = { 
      "name": "Doc GAUTIER", 
      "email": "doc.gautier@gmail.com", 
      "title": "Document à signer", 
      "data": "", 
      "docModel": "",
      "envId":""
     }
  }
  saveModel(){

  }

}