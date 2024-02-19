import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';

class GEl {

}

class AEl {

}

class EEl {

}

@Component({
  selector: 'xpr-selector',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    JsonPipe,
  ],
  styles: [],
  template: `
    <label>
      <!--      <span>Select</span>-->
      <!--      <select (change)="x($event.target)">-->
      <!--        @for (o of options; track o.value) {-->
      <!--          <option [value]="o.value">{{ o.label }}</option>-->
      <!--        }-->
      <!--      </select>-->
    </label>
    <button (click)="addArray()">ARR</button>
    <button (click)="addGroup()">GRP</button>
    <pre>{{ root | json }}</pre>
  `,
})
export class SimpleFormSelector {
  root?: any[] | any;

  addArray() {
    this.root = [];
  }

  addGroup() {
    this.root = {};
  }
  // fb = new FormBuilder();
  // root = this.fb.array([]);
  // selected = '';
  // options = [
  //   {
  //     label: 'form group',
  //     value: 'g'
  //   },
  //   {
  //     label: 'form array',
  //     value: 'a'
  //   },
  //   {
  //     label: 'form element',
  //     value: 'e'
  //   }
  // ];
  //
  // x(a: any) {
  //   console.log((a as HTMLSelectElement).value);
  // }
  //
  // add(el: 'g' | 'a' | 'e') {
  //
  // }
}
