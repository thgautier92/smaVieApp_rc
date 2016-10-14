import { Component } from '@angular/core';
import { NavController, NavParams, Events, AlertController } from 'ionic-angular';
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
  option: any = "lstEnvelopes";
  lstEnvelopes: any = [];
  statusCode: any;
  dataAccount: any;
  dataEnv: any = null;
  dataDoc: any = null;
  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, public alertCtrl: AlertController, private docuSign: DocuSignServices) {
    this.signSend = this.navParams.get('model');
    this.saveModel = this.navParams.get('onSave');
    this.lstApi = [
      { "code": "lstEnvelopes", "title": "Historique des signatures", "method": "" },
      { "code": "sign", "title": "Signer un nouveau document", "method": "" },
      { "code": "detail", "title": "Détail", "method": "" },
      { "code": "model", "title": "Modèles", "method": "" },
    ]
    this.statusCode =
      {
        "created": "crée",
        "deleted": "supprimée",
        "sent": "envoyée",
        "delivered": "livrée",
        "signed": "signée",
        "completed": "terminée",
        "declined": "refusée",
        "voided": "annulée",
        "timedout": "hors délai",
        "authoritativecopy": "copie autorisée",
        "transfercompleted": "transfert terminé",
        "template": "modèle",
        "correct": "correcte"
      };
  }
  ngOnInit() {
    this.getLstModel();
    this.dataDoc = { "default": true };
  }
  ionViewDidLoad() {
    console.log('Hello DocuSign Page');
  }
  openAdminCtrl() {
    let url = "https://account-d.docusign.com/#/web/login";
    window.open(url, '_system');
  }
  getStatus(code) {
    return
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
    this.dataDoc = {};
    this.docuSign.getdocSignedData(id).then(data => {
      //console.log(data);
      this.dataDoc['infoDoc'] = data;
      this.docuSign.getDocEvents(id).then(dataEvents => {
        //console.log(dataEvents);
        this.dataDoc['events'] = dataEvents;
        //console.log("Data for doc #", id, this.dataDoc);
        this.option = "detail";
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
      this.dataEnv = null;
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
        this.dataEnv = response;
        this.signSend['envId'] = response['envelopeId'];
        console.log("Context data", this.signSend);
      }, function (reason) {
        console.log("List Envelopes error", reason);
      });
    } else {
      let alert = this.alertCtrl.create({
        title: 'Modèle de documents',
        subTitle: 'Veuillez choisir un modèle de document dans la liste',
        buttons: ["J'ai compris"]
      });
      alert.present();
    }
  };
  signClient(envelopeId) {
    if (envelopeId) {
      var dataSend = {
        "email": this.signSend.email,
        "userName": this.signSend.name,
        "returnUrl": "http://gautiersa.fr/vie/docuSignReturn",
        "authenticationMethod": "email",
        "clientUserId": "1001"
      }
      this.docuSign.destSignEnv(envelopeId, dataSend).then(data => {
        console.log(data);
        this.sendSign['urlSign'] = data['url'];
        window.open(data['url'], '_system');
      }, reason => {
        console.log('Failed: ' + JSON.stringify(reason));
      })
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
