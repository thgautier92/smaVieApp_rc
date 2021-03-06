import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ViewController, NavParams, Events } from 'ionic-angular';
import { CalcTools } from '../../../providers/comon/calculate';
import {ProfilRisque} from "../profil-risque/profil-risque";
/*
  Generated class for the DiagConseil page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-diag-conseil',
  templateUrl: 'diag-conseil.html',
  providers:[CalcTools]
})
export class DiagConseil {
lstForms: any = [];
  dataIn: any = {};
  idPage: any = {};
  idClient: any = "";
  dataOut: any = {};
  pageStatus: any;
  profilCalculated: any = null;
   constructor(public navCtrl: NavController, public params: NavParams,public viewCtrl:ViewController, public events: Events, public CalcTools: CalcTools) {
    this.idPage = 10;
    this.idClient = this.params.data['currentCli'];
    this.dataIn = this.params.data['currentDoc'];
    this.dataOut = {};
    this.lstForms = [
       { "id": 31, "title": "", "pres": "detail", "status": "" }
    ];
    // Return events from inputs forms
    this.events.subscribe('clientChange', eventData => {
      this.idClient = eventData[0]['currentCli'];
      this.dataIn = eventData[0]['currentDoc'];
      for (var key in this.lstForms) { this.lstForms[key]['status'] = ""; }
      CalcTools.calcPageStatus(this.idPage, this.lstForms);
    });
    this.events.subscribe('rdvStatus_' + this.idPage, dataReturn => {
      //console.log("Update status form", this.lstForms, dataReturn);
      let idForm = dataReturn[0]['form']['id'];
      let f = this.lstForms.filter(item => item['id'] === idForm);
      f[0]['status'] = dataReturn[0]['status'];
      //CalcTools.calcPageStatus(this.idPage, this.lstForms);
    });
    this.events.subscribe('profilCalculted', dataReturn => {
      this.profilCalculated = dataReturn[0];
    })
  }

  ionViewDidLoad() {
    console.log('Hello DiagConseil Page');
  }
  close() {
    this.viewCtrl.dismiss();
  }
  callProfil() {
    this.navCtrl.push(ProfilRisque,{"currentCli":this.idClient,"currentDoc":this.dataIn});
  }

}
