import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Request, RequestMethod, ResponseContentType } from '@angular/http';
import { Platform } from 'ionic-angular';
import 'rxjs/add/operator/map';

@Injectable()
export class DocuSignServices {
    rootApi: any;
    account: any;
    httpApi: Request;
    options: RequestOptions;
    constructor(private http: Http, public platform: Platform) {
        this.rootApi = "https://demo.docusign.net/restapi/v2";
        if (this.platform.is('core')) {
            console.log("Proxy CORS added for Web application");
            this.rootApi = "/docuSign/restApi/v2"; // proxy CORS for Web Application    
        }
        let email = "thierry_gautier@groupe-sma.fr";
        let password = "Tga051163";
        let integratorKey = "TEST-43dd500e-9abc-42da-8beb-3d3f14698fbd";
        this.account = "1549349";
        // Create the comon request header
        let header = "<DocuSignCredentials><Username>" + email + "</Username><Password>" + password + "</Password><IntegratorKey>" + integratorKey + "</IntegratorKey></DocuSignCredentials>";
        let httpHeader = new Headers();
        httpHeader.append('Content-Type', 'application/json; charset=utf-8');
        httpHeader.append('X-DocuSign-Authentication', header);
        this.options = new RequestOptions({});
        this.options.headers = httpHeader;
        this.options.withCredentials = true;

        let statusCode =
            {
                "created": "crée",
                "deleted": "supprimée",
                "sent": "envoyée",
                "delivered": "livrée",
                "signed": "signée",
                "completed": "terminée",
                "declined": "refusée",
                "voided": "annulée",
                "timedout": "hors délai",
                "authoritativecopy": "copie autorisée",
                "transfercompleted": "transfert terminé",
                "template": "modèle",
                "correct": "correcte"
            };
    }
    getAccount() {
        return new Promise((resolve, reject) => {
            var api = "login_information?api_password=false&include_account_id_guid=true&login_settings=all"
            let url = this.rootApi + "/" + api;
            this.options.method = RequestMethod.Get;
            this.options.responseType = ResponseContentType.Json;
            this.http.request(url, this.options)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    console.log("GET error", error);
                    reject(error);
                });
        })
    };
    getTemplates() {
        return new Promise((resolve, reject) => {
            var api = "accounts/#account#/templates"
            api = api.replace("#account#", this.account);
            let url = this.rootApi + "/" + api;
            this.options.method = RequestMethod.Get;
            this.options.responseType = ResponseContentType.Json;
            this.http.request(url, this.options)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    console.log("GET error", error);
                    reject(error);
                });
        });
    };
    sendSignEnv(dataSend) {
        return new Promise((resolve, reject) => {
            var api = "accounts/#account#/envelopes"
            api = api.replace("#account#", this.account);
            let url = this.rootApi + "/" + api;
            this.options.method = RequestMethod.Post;
            this.options.responseType = ResponseContentType.Json;
            this.options.body = dataSend;
            this.http.request(url,this.options)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    console.log("GET error", error);
                    reject(error);
                });
        });
    };
    getListEnv(yearView, monthView, numFolder) {
        return new Promise((resolve, reject) => {
            var dateView = monthView + "/01/" + yearView;
            var lstFolder = ["all", "drafts", "awaiting_my_signature", "completed", "out_for_signature"]
            var folder = lstFolder[numFolder];
            var api = "accounts/#account#/search_folders/" + folder + "?from_date=" + dateView + "&to_date=&start_position=&count=&order=DESC&order_by=sent&include_recipients=true"
            api = api.replace("#account#", this.account);
            let url = this.rootApi + "/" + api;
            this.options.method = RequestMethod.Get;
            this.options.responseType = ResponseContentType.Json;
            this.http.request(url, this.options)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    console.log("GET error", error);
                    reject(error);
                });
        });
    };
    destSignEnv(envelopeId, dataSend) {
        return new Promise((resolve, reject) => {
            var api = "accounts/#account#/envelopes/#envelopeId#/views/recipient"
            api = api.replace("#account#", this.account);
            api = api.replace("#envelopeId#", envelopeId);
            let url = this.rootApi + "/" + api;
            this.options.method = RequestMethod.Post;
            this.options.responseType = ResponseContentType.Json;
            this.options.body = dataSend;
            this.http.request(url,this.options)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    console.log("GET error", error);
                    reject(error);
                });
        });
    };
    senderSignEnv(envelopeId, dataSend) {
        return new Promise((resolve, reject) => {
            var api = "accounts/#account#/envelopes/#envelopeId#/views/sender"
            api = api.replace("#account#", this.account);
            api = api.replace("#envelopeId#", envelopeId);
            let url = this.rootApi + "/" + api;
            this.options.method = RequestMethod.Post;
            this.options.responseType = ResponseContentType.Json;
            this.options.body = dataSend;
            this.http.request(url,this.options)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    console.log("GET error", error);
                    reject(error);
                });
        });
    };
    getdocSigned(envelopeId) {
        return new Promise((resolve, reject) => {
            var api = "accounts/#account#/envelopes/#envelopeId#/documents/combined?certificate=true&include_metadata=true&language=fr&show_changes=true"
            api = api.replace("#account#", this.account);
            api = api.replace("#envelopeId#", envelopeId);
           let url = this.rootApi + "/" + api;
            this.options.method = RequestMethod.Get;
            this.options.responseType = ResponseContentType.Json;
            this.http.request(url, this.options)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    console.log("GET error", error);
                    reject(error);
                });
        });
    };
    getdocSignedData(envelopeId) {
        return new Promise((resolve, reject) => {
            var api = "accounts/#account#/envelopes/#envelopeId#/recipients?include_tabs=true"
            api = api.replace("#account#", this.account);
            api = api.replace("#envelopeId#", envelopeId);
            let url = this.rootApi + "/" + api;
            this.options.method = RequestMethod.Get;
            this.options.responseType = ResponseContentType.Json;
            this.http.request(url, this.options)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    console.log("GET error", error);
                    reject(error);
                });
        });
    }
    getDocEvents(envelopeId) {
        return new Promise((resolve, reject) => {
            var api = "accounts/#account#/envelopes/#envelopeId#/audit_events"
            api = api.replace("#account#", this.account);
            api = api.replace("#envelopeId#", envelopeId);
            let url = this.rootApi + "/" + api;
            this.options.method = RequestMethod.Get;
            this.options.responseType = ResponseContentType.Json;
            this.http.request(url, this.options)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    console.log("GET error", error);
                    reject(error);
                });
        });
    }
}