import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';

import { About } from '../pages/about/about';
import { Auth, SignUpPage } from '../pages/auth/auth';
import { Contact } from '../pages/contact/contact';
import { Documents, ViewPage } from '../pages/documents/documents';
import { Home } from '../pages/home/home';
// Rdv pages
import { Rdv } from '../pages/rdv/rdv';
import { Concurrents } from '../pages/rdv/concurrents/concurrents';
import { Decouverte } from '../pages/rdv/decouverte/decouverte';
import { DiagConseil } from '../pages/rdv/diag-conseil/diag-conseil';
import { OptionCopier } from '../pages/rdv/option-copier/option-copier';
import { OptionPieces } from '../pages/rdv/option-pieces/option-pieces';
import { Patrimoine } from '../pages/rdv/patrimoine/patrimoine';
import { ProfilRisque } from '../pages/rdv/profil-risque/profil-risque';
import { Signature } from '../pages/rdv/signature/signature';
import { Simuler, SimulerDetail } from '../pages/rdv/simuler/simuler';
import { Souscription, ClauseDetail } from '../pages/rdv/souscription/souscription';
import { Synthese } from '../pages/rdv/synthese/synthese';

import { SignApi } from '../pages/sign-api/sign-api';
import { Start } from '../pages/start/start';
import { Synchro, StatSynchroModal } from '../pages/synchro/synchro';
// pipes
import { ValuesPipe, arrayByKeyPipe, binaryData, groupBy, KeysPipe, maxByKeyPipe, textToDate } from '../pipes/comon';
// components
import { FlexDisplay } from '../components/flex-display/flex-display';
import { FlexInput } from '../components/flex-input/flex-input';
import { FlexList, FlexDetail } from '../components/flex-list/flex-list';
import { PdfViewer } from '../components/pdf-viewer/pdf-viewer';
import { Record } from '../components/record/record';
import { Stat } from '../components/stat/stat';
import { ImageView } from '../components/image-view/image-view';
// providers
import { CalcTools } from '../providers/comon/calculate';
import { DisplayTools } from '../providers/comon/display';
import { InfoDevice } from '../providers/comon/info-device';
import { CouchDbServices } from '../providers/couch/couch';
import { JsonDemo } from '../providers/json-demo/json-demo';
import { Paramsdata } from '../providers/params-data/params-data';
import { Pouch } from '../providers/pouch/pouch';
import { SignServices } from '../providers/sign/sign';
import { Simu } from '../providers/simu/simu';

@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    About,
    Auth, SignUpPage,
    Contact,
    Documents, ViewPage,
    Home,
    Rdv,
    Concurrents,
    Decouverte,
    DiagConseil,
    OptionCopier,
    OptionPieces,
    Patrimoine,
    ProfilRisque,
    Signature,
    Simuler, SimulerDetail,
    Souscription, ClauseDetail,
    Synthese,
    SignApi,
    Start,
    Synchro, StatSynchroModal, Stat,
    ValuesPipe, arrayByKeyPipe, binaryData, groupBy, KeysPipe, maxByKeyPipe, textToDate,
    PdfViewer,
    Record,
    FlexDisplay, FlexInput, FlexDetail, FlexList, ImageView
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
    About,
    Auth, SignUpPage,
    Contact,
    Documents, ViewPage,
    Home,
    Rdv,
    Concurrents,
    Decouverte,
    DiagConseil,
    OptionCopier,
    OptionPieces,
    Patrimoine,
    ProfilRisque,
    Signature,
    Simuler, SimulerDetail,
    Souscription, ClauseDetail,
    Synthese,
    SignApi,
    Start,
    Synchro, StatSynchroModal,
    FlexDetail,
    PdfViewer,
    ImageView
  ],
  providers: [Storage, CalcTools, DisplayTools, InfoDevice, CouchDbServices, JsonDemo, Paramsdata, Pouch,
    SignServices, Simu]
})
export class AppModule { }
