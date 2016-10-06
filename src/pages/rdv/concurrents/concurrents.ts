import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { CalcTools } from '../../../providers/comon/calculate';

/*
  Generated class for the Concurrents page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-concurrents',
  templateUrl: 'concurrents.html',
  providers: [CalcTools]
})
export class Concurrents {
  lstForms: any = [];
  dataIn: any;
  idPage: any = {};
  idClient: any = "";
  dataOut: any = {};
  pageStatus: any;
  constructor(public navCtrl: NavController, public params: NavParams, public events: Events, public CalcTools: CalcTools) {
    this.idPage = 4
    this.lstForms = [
      { "id": 12, "title": "Concurrents", "pres": "list", "status": "" }
    ];
    // Return events from inputs forms
    this.events.subscribe('clientChange', eventData => {
      this.idClient = eventData[0]['currentCli'];
      this.dataIn = eventData[0]['currentDoc'];
      for (var key in this.lstForms) { this.lstForms[key]['status'] = ""; }
      CalcTools.calcPageStatus(this.idPage, this.lstForms);
    });
    this.events.subscribe('rdvUpdate', eventData => {
      console.log("Update page with data", eventData);
      this.dataIn = eventData[0];
      for (var key in this.lstForms) { this.lstForms[key]['status'] = ""; }
    });
    this.events.subscribe('rdvStatus_' + this.idPage, dataReturn => {
      //console.log("Update status form", this.lstForms, dataReturn);
      let idForm = dataReturn[0]['form']['id'];
      let f = this.lstForms.filter(item => item['id'] === idForm);
      f[0]['status'] = dataReturn[0]['status'];
      CalcTools.calcPageStatus(this.idPage, this.lstForms);
    });
  }
  ionViewDidLoad() {
    console.log('Hello Concurrents Page');
  }
  ngOnInit() {
    this.idClient = this.params.data['currentCli'];
    this.dataIn = this.params.data['currentDoc'];
    this.dataOut = {};
  }
}

