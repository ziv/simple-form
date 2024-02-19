import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';


export interface SimpleFormItem {
  type: string;
  label: string;
  control: string;
  condition?: (value: Record<string, unknown>) => boolean;
}

// export interface SimpleFormBase {
//   legend: string;
// }
//
// export interface SimpleFormItems extends SimpleFormBase {
//   items: SimpleFormItem[];
// }
//
// export interface SimpleFormNested extends SimpleFormBase {
//   forms: SimpleForm[];
// }
//
// export type SimpleForm = SimpleFormItems | SimpleFormNested;
// export type SimpleFormU = SimpleFormItems & SimpleFormNested;

@Component({
  selector: 'xpr-root',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    JsonPipe,
  ],
  styles: [],
  template: '',
})
export class SimpleFormGenerator {
  fb: FormBuilder = new FormBuilder();
  root: FormArray = this.fb.array([]);

  startGroup(parent?: AbstractControl) {

  }

  start(group?: any) {
    if (!group) {
      this.root = this.fb.array([]);
    }
  }
}
