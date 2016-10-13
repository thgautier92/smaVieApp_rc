import { Component } from '@angular/core';
import { NavController, NavParams,Events } from 'ionic-angular';
import { DocuSignServices } from '../../../providers/sign/docuSign';
//import { Record } from '../../../components/record/record';

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
  option: any = "lstEnvelopes";
  lstEnvelopes: any = [];
  dataAccount: any;
  dataDoc:any={"default":true};
  constructor(public navCtrl: NavController, public navParams: NavParams, public events:Events,private docuSign: DocuSignServices) {
    this.signSend = this.navParams.get('model');
    this.saveModel = this.navParams.get('onSave');
    this.lstApi = [
      { "code": "lstEnvelopes", "title": "Historique des signatures", "method": "" },
      { "code": "sign", "title": "Signer un nouveau document", "method": "" },
      { "code": "detail", "title": "Détail", "method": "" },
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
  getDocSigned(item) {
    let id = item.envelopeId;
    var dataSend = {};
    this.docuSign.getdocSigned(id).then(data => {
      //console.log(data);
      var file = new Blob([data], { type: 'application/pdf' });
      let pdfUrl = URL.createObjectURL(file);
      window.open(pdfUrl, '_system', 'location=yes');
    }, reason => {
      console.log('Failed: ' + JSON.stringify(reason));
    })
  }
  signSender(item) {
    let id = item.envelopeId;
    var dataSend = {};
    this.docuSign.senderSignEnv(id, dataSend).then(data => {
      console.log(data);
      window.open(data['url'], '_system');
    }, reason => {
      console.log('Failed: ' + JSON.stringify(reason));
    })
  }
  getDocData(item) {
    let id = item.envelopeId;
    let dataSend = {};
    this.dataDoc={};
    this.docuSign.getdocSignedData(id).then(data => {
      //console.log(data);
      this.dataDoc['infoDoc'] = data;
      this.docuSign.getDocEvents(id).then(dataEvents => {
        //console.log(dataEvents);
        this.dataDoc['events'] = dataEvents;
        console.log("Data for doc #",id,this.dataDoc);
        this.option="detail";
      }, reason => {
        console.log('Failed: ' + JSON.stringify(reason));
      })
    }, reason => {
      console.log('Failed: ' + JSON.stringify(reason));
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
