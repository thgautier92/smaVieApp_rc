import { Component } from '@angular/core';
import { NavController, ModalController, NavParams, ViewController } from 'ionic-angular';
import { Paramsdata } from '../../providers/params-data/params-data';

/*
  Generated class for the Documents page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-documents',
  templateUrl: 'documents.html',
  providers:[Paramsdata]
})
export class Documents {
  lstDocs: any = [];
  searchQuery: string = '';
  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public paramsApi: Paramsdata) { }

  ionViewDidLoad() {
    console.log('Hello Documents Page');
  }
  ngOnInit() {
    this.initializeItems();
  }
  initializeItems() {
    this.paramsApi.loadDocs().then(response => {
      this.lstDocs = response;
    }, error => {
      console.log(error);
    })
  }
  getItems(ev: any) {
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.lstDocs = this.lstDocs.filter((item) => {
        return (item['lib'].toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
  onCancel(evt) {
    this.initializeItems();
  }
  openFile(item) {
    //console.log(item);
    //let modal = this.modalCtrl.create(ViewPage, { "file": item.file, "title":item.lib });
    //modal.present();
    if (item.file !== "") this.navCtrl.push(ViewPage, { "file": item.file, "title": item.lib });
  };

}
@Component({
  selector: 'page-view',
  templateUrl: 'view.html',
})
export class ViewPage {
  file: any;
  title: any = "";
  constructor(public nav: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    //console.log(this.navParams);
    this.file = this.navParams.data['file'];
    this.title = this.navParams.data['title'];
    //console.log(this.file);
  }
  close() {
    this.viewCtrl.dismiss();
  }
}