import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Documents } from '../documents/documents';
import { Start } from '../start/start';
import { Synchro } from '../synchro/synchro';


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
  constructor(public navCtrl: NavController) {
    this.items = [
      { 'title': 'Go !', 'icon': 'rdv.jpg', 'description': "Démarrer un RDV", 'link': Start },
      //{ 'title': 'Découvrir', 'icon': 'regime_retraite_complementaire.jpg', 'description': "Découvrir les offres", 'link': StartPage },
      { 'title': 'Synchroniser', 'icon': 'sync.jpeg', 'description': "Synchroniser vos données", 'link': Synchro },
      { 'title': 'Documents', 'icon': 'documents.jpg', 'description': "La base documentaire", 'link': Documents },
    ];
  }

  ionViewDidLoad() {
    console.log('Hello Home Page');
  }
  openNavDetailsPage(item) {
    this.navCtrl.setRoot(item.link);
  }
  
}
