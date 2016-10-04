import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

//import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';

//import { About } from '../pages/about/about';
//import { Auth } from '../pages/auth/auth';
import { Contact } from '../pages/contact/contact';
import { Documents } from '../pages/documents/documents';
import { Home } from '../pages/home/home';
import { Rdv } from '../pages/rdv/rdv';
import { SignApi } from '../pages/sign-api/sign-api';
import { Start } from '../pages/start/start';
import { Synchro } from '../pages/synchro/synchro';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = Home;
  pages: Array<{ title: string, component: any, icon: any, color: any }>;
  isAut:boolean=false;

  constructor(public platform: Platform) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Rendez-vous', component: Start, icon: "people", color: "primary" },
      { title: 'Synchronisation', component: Synchro, icon: "sync", color: "danger" },
      { title: 'Espace Documentaire', component: Documents, icon: "albums", color: "action" },
      { title: 'Outil de signature', component: SignApi, icon: "bug", color: "secondary" }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  goHome(){
    this.nav.setRoot(Home);
  }

}
