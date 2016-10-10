import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Documents } from '../documents/documents';
import { Start } from '../start/start';
import { Synchro } from '../synchro/synchro';

declare var PouchDB: any;

/*
  Generated class for the Home page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class Home {
  items: any;
  db: any;
  infoBase: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.items = [
      { 'title': 'Go !', 'icon': 'rdv.jpg', 'description': "Démarrer un RDV", 'link': Start, "info": {} },
      //{ 'title': 'Découvrir', 'icon': 'regime_retraite_complementaire.jpg', 'description': "Découvrir les offres", 'link': StartPage,,"info":{} },
      { 'title': 'Synchroniser', 'icon': 'sync.jpeg', 'description': "Synchroniser vos données", 'link': Synchro, "info": {} },
      { 'title': 'Documents', 'icon': 'documents.jpg', 'description': "La base documentaire", 'link': Documents, "info": {} },
    ];

  }

  ionViewDidLoad() {
    console.log('Hello Home Page');
    //this.getDbInfo();
  }
  ngOnInit() {
    
  }
  getDbInfo() {
    let base = this.navParams['data']['name'];
    this.db = new PouchDB(base);
    this.db.info().then(result => {
      this.infoBase = result;
    }).error(function (err) {
      console.log(err);
    });
  }
  openNavDetailsPage(item) {
    this.navCtrl.setRoot(item.link);
  }

}
