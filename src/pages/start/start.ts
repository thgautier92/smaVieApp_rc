import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
//import { ModalController} from 'ionic-angular';
//import {FormBuilder} from '@angular/forms';
import { Rdv } from '../rdv/rdv';
import { CouchDbServices } from '../../providers/couch/couch';
//import {Paramsdata} from '../../providers/params-data/params-data';
import { DisplayTools } from '../../providers/comon/display';
import { groupBy, KeysPipe } from '../../pipes/comon';
declare var PouchDB: any;
/*
  Generated class for the Start page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-start',
  templateUrl: 'start.html',
  providers: [CouchDbServices, DisplayTools]
})
export class Start {
  srvInfo: any;
  userData: any;
  base: any;
  db: any;
  docs: any;
  params: any;
  constructor(public navCtrl: NavController, public display: DisplayTools, public couch: CouchDbServices) {
    //this.params = couch.getParams();
    //console.log(this.params);
    this.docs = [];
  }

  ionViewDidLoad() {
    console.log('Hello Start Page');
  }

  ngOnInit() {
    this.couch.verifSession(true).then(response => {
      this.userData = response;
      this.base = this.userData['name'].toLowerCase();
      this.loadBase(this.base);
    }, error => {
      console.error(error);
      this.userData = null;
      this.base = 'demo';
      this.display.displayToast("Veuillez vous identifier ! Mode démo activé", 1);
      this.loadBase(this.base);
    });
  }
  loadBase(base) {
    //let loading = this.display.displayLoading("Activation de la base " + base, 5);
    this.db = new PouchDB(base);
    this.docs = []
    this.showBase();
    //loading.dismiss();
  }
  showBase(status?) {
    let me = this;
    me.docs = [];
    this.db.allDocs({ include_docs: true, descending: true }, function (err, data) {
      //console.log(data);
      let d = {};
      if (status) {
        let dataFilter = data.rows.filter(item => item.doc.rdv.status === status);
        //console.log("Filter", dataFilter);
        d = new groupBy().transform(dataFilter, 'doc', 'rdv', 'dateRdv', 10);
      } else {
        d = new groupBy().transform(data.rows, 'doc', 'rdv', 'dateRdv', 10);
      }
      me.docs = new KeysPipe().transform(d);
      //console.log("RDV Doc group by date",me.docs);
    });
  };
  start(item) {
    // start the RDV with data
    console.log("Start RDV with item ", item);
    item['doc']['rdvEnded'] = false;
    let data = { base: this.base, rdvId: item.id };
    this.navCtrl.setRoot(Rdv, data).then(response => {
      console.log("Navigation reponse", response);
    }, error => {
      console.log("Navigation error", error);
    });
  }
}
