import { Injectable, Type } from '@angular/core';
import { FirstComponent } from './first/first.component';
import { SecondComponent } from './second/second.component';
import { ThirdComponent } from './third/third.component';

@Injectable({
  providedIn: 'root'
})
export class DynamicService {

  constructor() { }

  getDynamicComponent(componentDetails: string) {
    let data: any = [];
    switch (componentDetails) {
      case 'First':
        data = [
          new DynamicItem(
            FirstComponent,
            { name: 'Home', content: 'This is home component dynamically loaded using view container reference.' }
          )]
        break;

      case 'Second':
        data = [
          new DynamicItem(
            SecondComponent,
            { name: 'About', content: 'This is about component dynamically loaded using view container reference.' }
          )]
        break;

      case 'Third':
        data = [
          new DynamicItem(
            ThirdComponent,
            { name: 'Contact', content: 'This is contact component dynamically loaded using view container reference.' }
          )]
        break;
      }
      return data;
  }
}

export class DynamicItem {
  constructor(public component: Type<any>, public data: any) { }
}


export interface AddComponent {
  data: any;
}