import { Component } from '@angular/core';
import { FormElementType } from '../../../xpr/simple-form/src/lib/simple-form';
import { JsonPipe } from '@angular/common';
import { XprAutoForm } from '../../../xpr/simple-form/src/components/auto-form';
import { toForm } from '../../../xpr/simple-form/src/lib/utils';

@Component({
  standalone: true,
  selector: 'xpr-auto-form-demo',
  imports: [XprAutoForm, JsonPipe],
  template: `
    <h1>auto form</h1>
    <xpr-auto-form [form]="form" [descriptor]="desc" />
    <h2>Output</h2>
    <pre>{{ data | json }}</pre>
  `,
})
export class AutoFormDemo {
  data: any = undefined;
  desc = [
    {
      type: FormElementType.Checkbox,
      label: 'Transparent Background',
      control: 'transparent',
    },
    {
      type: FormElementType.Color,
      label: 'Background color',
      control: 'color',
      condition: (data: { [x: string]: any; }) => !data['transparent']
    },
    {
      type: FormElementType.Range,
      label: 'Range?',
      control: 'range',
      value: 20
    }
  ];
  form = toForm(this.desc);

  constructor() {
    this.form.valueChanges.subscribe((data: any) => this.data = data);
  }
}
