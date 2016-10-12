import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DocuSignServices } from '../../providers/sign/docuSign';
import { Record } from '../../components/record/record';

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
  docModel: any = "";
  signSend: any = {};
  lstEnvelopes: any = [];
  envId:any=null;
  dataAccount: any = null;
  lstApi: any;
  srv: any;
  detailApi: any = { "nom": "toto" };
  constructor(public navCtrl: NavController, public params: NavParams, private docuSign: DocuSignServices) {
    this.srv = "docusign";
    this.signSend = { "name": "Thierry GAUTIER", "email": "doc.gautier@gmail.com", "title": "Document à signer", "data": "", "docModel": "" }
    this.lstApi = {
      "docusign": [
        { "code": "", "title": "", "method": this.docuSign.getListEnv },
        { "code": "", "title": "", "method": "" }
      ],
      "docapost": [
        { "code": "", "title": "", "method": "" },
        { "code": "", "title": "", "method": "" }
      ]
    }
  }
  ngOnInit() {
    this.getLstModel();
  }
  // ===== Method for DOCUSIGN services =====
  getLstModel() {
    this.docuSign.getTemplates().then(response => {
      console.log("Templates", response);
      this.lstModels = response;
    }, error => {
      console.log("Templates error", error);
    })
  }
  listEnvelopes(folder) {
    this.docuSign.getListEnv(2016, 1, folder).then(response => {
      console.log(response);
      this.lstEnvelopes = response;
    }, error => {
      console.log("List Envelopes error", error);
    });

  }
  sendSign() {
    console.log("DOC", this.signSend);
    if (this.signSend.docModel) {
      let dataEnv = null;
      var dataSend = {
        "status": "sent",
        "emailBlurb": "Vous avez un document à signer. Merci de votre confiance.",
        "emailSubject": this.signSend.title,
        "templateId": this.signSend.docModel,
        "templateRoles": [
          { "email": this.signSend.email, "name": this.signSend.name, "roleName": "signataire", "clientUserId": "1001" }
        ]
      };
      this.docuSign.sendSignEnv(dataSend).then(response=> {
        console.log(response);
        dataEnv = response;
        this.envId = response['envelopeId'];
      }, function (reason) {
        console.log("List Envelopes error", reason);
      });
    }
  };
  infoAccount() {
    this.docuSign.getAccount().then(response => {
      console.log(response);
      this.dataAccount = response;
    }, function (reason) {
      console.log("infoAccount error", reason)
    });
  };
  ionViewDidLoad() {
    console.log('Hello SignApi Page');
  }

}
