import { Component } from '@angular/core';
import { NavController, ViewController, NavParams, ModalController, AlertController, Events } from 'ionic-angular';
import { ImageView } from '../../../components/image-view/image-view';
import { DisplayTools } from '../../../providers/comon/display';
import { CalcTools } from '../../../providers/comon/calculate';
import { Paramsdata } from '../../../providers/params-data/params-data';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Camera } from 'ionic-native';

@Component({
  selector: 'page-option-pieces',
  templateUrl: 'option-pieces.html',
  providers: [DisplayTools, CalcTools, Paramsdata]
})
export class OptionPieces {
  action: string = "docs";
  form: any;
  idClient: any;
  dataIn: any;
  lstCible: any = [];
  lstNatureInfo: any;
  lstfields: any = [];
  cible: any = null;
  nature: any = "";
  base64Image: any = '';
  okCapture: boolean = false;
  constructor(public navCtrl: NavController, public params: NavParams, public viewCtrl: ViewController, public modalCtrl: ModalController, private alertCtrl: AlertController,
    public events: Events,
    public CalcTools: CalcTools,
    public display: DisplayTools,
    public paramsApi: Paramsdata) {
    this.idClient = params.data['currentCli'];
    this.dataIn = params.data['currentDoc'];
    this.lstCible = [];
    for (let i in this.dataIn['clients']) {
      //console.log(i, this.dataIn['clients'][i]);
      this.lstCible.push({ "id": i, "name": this.dataIn['clients'][i]['client']['output'][0]['NOM'], "sel": false })
    };
    this.lstNatureInfo = [
      { "code": "cni", "lib": "Carte d'identité Nationale" },
      { "code": "passport", "lib": "Passport" },
      { "code": "permisauto", "lib": "Permis de conduire" },
      { "code": "livretfam", "lib": "Livret de famille" }
    ]
  }

  ionViewDidLoad() {
    console.log('Hello OptionPieces Page');
  }
  ngOnInit() {
    this.form = new FormGroup({
      nature: new FormControl('', [<any>Validators.required, <any>Validators.minLength(5)]),
      reference: new FormControl('', <any>Validators.required),
      validite: new FormControl('', <any>Validators.required)
    });
  }
  delItem(idx) {
    console.log(idx);
    this.dataIn['rdv']['docsInput'].splice(idx, 1);
    this.events.publish('rdvSave', this.dataIn);
  }
  close() {
    this.viewCtrl.dismiss();
  }
  natureChange(idx) { }
  takePhoto() {
    let srcType = Camera.PictureSourceType.CAMERA;
    let options = setOptions(srcType);
    let me = this;
    try {
      Camera.getPicture(options).then(imageData => {
        me.base64Image = 'data:image/jpg;base64,' + imageData;
        this.okCapture = true;
      }, (err) => {
        // Handle error
        this.okCapture = false;
        let alert = this.alertCtrl.create({
          title: 'Capture de documents',
          subTitle: 'Appareil non disponible. <br>Erreur  : ' + err,
          buttons: ['OK']
        });
        alert.present();
      });
    } catch (error) {
      this.okCapture = false;
      let alert = this.alertCtrl.create({
        title: 'Capture de documents',
        subTitle: 'Appareil non disponible : ' + error,
        buttons: ['OK']
      });
      alert.present();
    }
  }
  viewImage(item){
    
    let modal=this.modalCtrl.create(ImageView,item)
    modal.present();
  }
  takeMail() { }
  execute() {
    //store Image Data+Ref in docs
    console.log(this.dataIn, this.form);
    let idDoc = 0;
    this.dataIn['rdv']['docsInput'].push(
      {
        "idClient": this.idClient,
        "idDoc": idDoc,
        "nature": this.form['_value']['nature'],
        "reference": this.form['_value']['reference'],
        "validite": this.form['_value']['validite'],
        "img64": this.base64Image
      });
    // Save data to the client folder
    for (let key in this.lstCible) {
      console.log(this.dataIn, key);
      if (this.lstCible[key]['sel']) {
        this.dataIn['rdv']['resultByClient'][key]['docs'].push({ "idClient": this.idClient, "idDoc": idDoc, "ts": new Date() });
      }
    }
    this.events.publish('rdvSave', this.dataIn);
  }


}
function setOptions(srcType) {
  var options = {
    // Some common settings are 20, 50, and 100
    quality: 50,
    destinationType: Camera.DestinationType.DATA_URL,
    // In this app, dynamically set the picture source, Camera or photo gallery
    sourceType: srcType,
    encodingType: Camera.EncodingType.JPEG,
    mediaType: Camera.MediaType.PICTURE,
    allowEdit: true,
    correctOrientation: true  //Corrects Android orientation quirks
  }
  return options;
}
