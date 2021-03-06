import { Component } from '@angular/core';
import { NavController, ViewController,NavParams, Events } from 'ionic-angular';
import { DisplayTools } from '../../../providers/comon/display';
import { CalcTools } from '../../../providers/comon/calculate';
import { SignServices } from '../../../providers/sign/sign';
/*
  Generated class for the Signature page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-signature',
  templateUrl: 'signature.html',
  providers: [DisplayTools,CalcTools,SignServices]
})
export class Signature {
  lstSign: any = [];
  srv: any;
  lstForms: any = [];
  lstDocSign: any = [];
  docSign: any = "";
  dataIn: any = {};
  idPage: any = {};
  idClient: any = "";
  dataOut: any = {};
  pageStatus: any;
  constructor(public navCtrl: NavController, public params: NavParams,public viewCtrl:ViewController, 
  public events: Events,
    public CalcTools: CalcTools,
    public display: DisplayTools,
    public sign: SignServices) {
    this.idPage = 4;
    this.idClient = this.params.data['currentCli'];
    this.dataIn = this.params.data['currentDoc'];
    this.dataOut = {};
    this.lstForms = [
      { "id": 7, "title": "Vérification des données", "pres": "detail", "status": "" }
    ];
    this.lstDocSign = [
      { "code": "diag", "lib": "Diagnostic Conseil", "refExterne": "", "forms": [1, 2, 3] },
      { "code": "sous", "lib": "Souscription", "refExterne": "", "forms": [1, 2, 3] },
      { "code": "autre", "lib": "Autre", "refExterne": "", "forms": [1, 2, 3] }
    ];
    // Return events from inputs forms
    this.events.subscribe('clientChange', eventData => {
      this.idClient = eventData[0]['currentCli'];
      this.dataIn = eventData[0]['currentDoc'];
      for (var key in this.lstForms) { this.lstForms[key]['status'] = ""; }
      CalcTools.calcPageStatus(this.idPage, this.lstForms);
    });
    this.events.subscribe('rdvUpdate', eventData => {
      this.dataIn = eventData[0];
    });
    this.events.subscribe('rdvStatus_' + this.idPage, dataReturn => {
      //console.log("Update status form", this.lstForms, dataReturn);
      let idForm = dataReturn[0]['form']['id'];
      let f = this.lstForms.filter(item => item['id'] === idForm);
      console.log("Search Form status", f);
      f[0]['status'] = dataReturn[0]['status'];
      CalcTools.calcPageStatus(this.idPage, this.lstForms);
    });
    this.srv = "";
    this.sign.getLstParams().then(response => {
      this.lstSign = response;
    })
  }
  ionViewDidLoad() {
    console.log('Hello Signature Page');
  }
  getTemplates() {
    //let load = this.display.displayLoading("Chargement des modèles",5);
    this.sign.callApi(this.srv, "listTemplate").then(response => {
      console.log(response);
      this.lstDocSign = response['envelopeTemplates'];
      //load.dismiss();
    }, error => {
      //load.dismiss();
      this.display.displayToast("Service de signature NON DISPONIBLE");
      console.log(error);

    })
  }
  startIdNum() {
    console.log("Start call " + this.srv, this.docSign);
  }
  startSign() {
    this.sign.loadRootApi(this.srv).then(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }
  loadDocSign() {

  }
  loadProofSign() {

  }
  close() {
    this.viewCtrl.dismiss();
  }


}
