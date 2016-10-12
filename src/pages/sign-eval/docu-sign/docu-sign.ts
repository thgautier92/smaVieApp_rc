import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DocuSignServices } from '../../../providers/sign/docuSign';
import { Record } from '../../../components/record/record';

/*
  Generated class for the DocuSign page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-docu-sign',
  templateUrl: 'docu-sign.html'
})
export class DocuSignPage {
  lstApi: any;
  signSend: any;
  lstModels: any;
  saveModel: any;
  option: any = "sign";
  lstEnvelopes: any = [];
  dataAccount: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private docuSign: DocuSignServices) {
    this.signSend = this.navParams.get('model');
    this.saveModel = this.navParams.get('onSave');
    this.lstApi = [
      { "code": "lstEnvelopes", "title": "Historique des signatures", "method": "" },
      { "code": "sign", "title": "Signer un document", "method": "" },
      { "code": "dwnDoc", "title": "Télécharger le document signé", "method": "" },
      { "code": "dwnProof", "title": "Télécharger la preuve", "method": "" }
    ]
  }
  ngOnInit() {
    this.getLstModel();
  }

  ionViewDidLoad() {
    console.log('Hello DocuSign Page');
  }
  listEnvelopes(folder) {
    this.docuSign.getListEnv(2016, 1, folder).then(response => {
      console.log(response);
      this.lstEnvelopes = response;
    }, error => {
      console.log("List Envelopes error", error);
    });

  }
  getLstModel() {
    this.docuSign.getTemplates().then(response => {
      console.log("Templates", response);
      this.lstModels = response;
    }, error => {
      console.log("Templates error", error);
    })
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
      this.docuSign.sendSignEnv(dataSend).then(response => {
        console.log(response);
        dataEnv = response;
        this.signSend['envId'] = response['envelopeId'];
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

}
