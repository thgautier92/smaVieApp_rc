import { Component } from '@angular/core';

/*
  Generated class for the Test component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'test',
  templateUrl: 'test.html'
})
export class Test {

  text: string;

  constructor() {
    console.log('Hello Test Component');
    this.text = 'Hello World';
  }

}
