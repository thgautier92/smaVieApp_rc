import { Component, ViewChild, ElementRef, Input } from '@angular/core';

declare var JSONFormatter: any;
/*
  Generated class for the Record component.

  See https://angular.io/docs/ts/latest/api/core/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'record',
  templateUrl: 'record.html',
})

export class Record {
  checkColor: any;
  resultDiv: HTMLDivElement;
  @ViewChild('result') result: ElementRef;
  @Input() dataRecord: any;
  formatter: any;
  levelOpen: number = 3;
  dataJson: any;
  okVisu:boolean=false;
  constructor() {
    this.checkColor = 'transparent';
  }
  ngOnInit() {
    this.resultDiv = this.result.nativeElement;
  }
  ngOnChanges(changes: any) {
    //console.log(changes);
    this.dataJson = changes['dataRecord'].currentValue;
    this.render(this.dataJson, this.levelOpen);
  }
  levelChange() {
    this.render(this.dataJson, this.levelOpen);
  }
  render(data, level) {
    if (this.resultDiv) {
      try {
        this.formatter = new JSONFormatter(data, level);
        this.resultDiv.innerHTML = '';
        this.resultDiv.appendChild(this.formatter.render());
        this.checkColor = 'transparent';
        this.okVisu=true;
      } catch (e) {
        console.log("Erreur JSONFormatter", e);
        this.checkColor = 'rgba(197, 69, 110, 0.30)';
        this.okVisu=false;
      }
    }
  }
}
