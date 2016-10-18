import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events, ModalController } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { CouchDbServices } from '../providers/couch/couch';
//import { Page1 } from '../pages/page1/page1';
//import { Page2 } from '../pages/page2/page2';

import { About } from '../pages/about/about';
import { Auth } from '../pages/auth/auth';
//import { Contact } from '../pages/contact/contact';
import { Documents } from '../pages/documents/documents';
import { Home } from '../pages/home/home';
//import { Rdv } from '../pages/rdv/rdv';
import { Start } from '../pages/start/start';
import { Synchro } from '../pages/synchro/synchro';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = Auth;
  pages: Array<{ title: string, component: any, icon: any, color: any }>;
  isAuth: boolean = false;
  userData: any;
  constructor(public platform: Platform, public events: Events, public modalCtrl: ModalController, public couch: CouchDbServices) {
    this.initializeApp();
    this.pages = [
      { title: 'Rendez-vous', component: Start, icon: "people", color: "primary" },
      { title: 'Synchronisation', component: Synchro, icon: "sync", color: "danger" },
      { title: 'Espace Documentaire', component: Documents, icon: "albums", color: "action" },
      { title: 'A propos', component: About, icon: "information-circle", color: "standard" }
    ];
    this.events.subscribe('userChange', eventData => {
      this.userData = eventData[0];
      this.isAuth = eventData[0]['ok'];
    });

  }
  ngOnInit() {
    
  };
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      this.couch.verifSession(true).then(response => {
      //console.log(response);
      this.userData = response;
      this.isAuth = true;
      this.nav.setRoot(Home, this.userData);
    }, error => {
      console.log("Verif return", error);
      this.isAuth = false;
      this.userData = {};
      this.nav.setRoot(Auth);
    });
    });
  }
  connect() {
    this.callConnect()
  };
  callConnect() {
    console.log("Call AUTH page");
    let modal = this.modalCtrl.create(Auth);
    modal.onDidDismiss(response => {
      console.log("Return from AUTH page", response);
      this.userData = response;
      this.nav.setRoot(Home, this.userData);
    })
  }
  disConnect() {
    this.couch.closeSession();
    this.userData = {};
    this.isAuth = false;
    this.nav.setRoot(Auth);
  };
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  goHome() {
    this.nav.setRoot(Home,this.userData);
  }
}
