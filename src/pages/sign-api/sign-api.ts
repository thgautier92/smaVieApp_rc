import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DocuSignServices } from '../../providers/sign/docuSign';

/*
  Generated class for the SignApi page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-sign-api',
  templateUrl: 'sign-api.html',
  providers: [DocuSignServices]
})
export class SignApi {
  lstModels: any = [];
  docModel:any="";
  lstSign: any = [];
  lstApi: any = [];
  srv: any;
  api: any;
  result: any;
  constructor(public navCtrl: NavController, public params: NavParams, private docuSign: DocuSignServices) {
    this.srv = "docusign";
  }
  ngOnInit() {
    this.getLstModel();
  }
  getLstModel() {
    this.docuSign.getTemplates().then(response => {
      console.log("Templates",response);
      this.lstModels = response;
    }, error => {
      console.log("Templates error",error);
     })
  }

  ionViewDidLoad() {
    console.log('Hello SignApi Page');
  }

}
