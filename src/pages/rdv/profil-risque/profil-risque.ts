import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Events ,LoadingController, ViewController} from 'ionic-angular';
import { CalcTools } from '../../../providers/comon/calculate';
import { FlexInput } from '../../../components/flex-input/flex-input';

/*
  Generated class for the ProfilRisque page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-profil-risque',
  templateUrl: 'profil-risque.html',
  providers:[CalcTools]
})
export class ProfilRisque {
  @ViewChild(FlexInput) dataProfile: FlexInput
  lstForms: any = [];
  dataIn: any = {};
  idPage: any = {};
  idClient: any = "";
  dataOut: any = {};
  pageStatus: any;
  constructor(public navCtrl: NavController, public params: NavParams,public viewCtrl: ViewController, public events: Events, public CalcTools: CalcTools, public loadingCtrl: LoadingController) {
    this.idPage = 2
    this.idClient = this.params.data['currentCli'];
    this.dataIn = this.params.data['currentDoc'];
    this.dataOut = {};
    this.lstForms = [
      { "id": 32, "title": "", "pres": "detail", "status": "" }
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
      f[0]['status'] = dataReturn[0]['status'];
      CalcTools.calcPageStatus(this.idPage, this.lstForms);
    });
  }
  ionViewDidLoad() {
    console.log('Hello ProfilRisque Page');
  }
  calcProfil() {
    /* ==== Read Forms for calculate score
    let loader = this.loadingCtrl.create({
      content: "Calcul en cours..."
    });
    loader.present();
    let lstValue = [];
    for (let f of this.lstForms) {
      // Read form f['id']
      let idF = f['id'];
      let d = this.dataIn;
    }
    */
    this.dataProfile.diagNext('completed');
    let max=3;let min=1;
    this.events.publish("profilCalculted", (Math.floor((max-min)*Math.random())+min));
    //loader.dismiss();
    this.close();
  }
  close() {
    this.viewCtrl.dismiss();
  }
}
