import { Component } from '@angular/core';
import { FieldsetInput, FieldsetTypes } from '../../../xpr/simple-form/src/lib/simple-form';
import { JsonPipe } from '@angular/common';
import { autoForm } from '../../../xpr/simple-form/src/lib/utils';
import { XprFieldset } from '../../../xpr/simple-form/src/lib/fieldset';
import { XprFieldsets } from '../../../xpr/simple-form/src/lib/fieldsets';
import { XprAutoForm } from '../../../xpr/simple-form/src/lib/auto-form';

@Component({
  standalone: true,
  selector: 'xpr-fieldset-demo',
  imports: [XprFieldset, JsonPipe, XprFieldsets, XprAutoForm],
  template: `
    <h1>auto form</h1>
    <xpr-fieldsets [form]="form" [descriptors]="d" #x>
      <xpr-fieldset [legend]="desc.legend" [expand]="x.opened()===100" (expandChange)="x.expanded(100)">
        <xpr-auto-form [form]="form" [descriptor]="[]"/>
      </xpr-fieldset>
    </xpr-fieldsets>
    <h2>Output</h2>
    <pre>{{ form.value | json }}</pre>
  `,
})
export class FieldsetDemo {
  get d() {
    return [this.desc, this.desc2];
  }
  desc: FieldsetInput = {
    legend: 'Demo',
    items: [
      {
        type: FieldsetTypes.Checkbox,
        label: 'Transparent Background',
        control: 'transparent',
      },
      {
        type: FieldsetTypes.Color,
        label: 'Background color',
        control: 'color',
        condition: data => !data['transparent']
      },
      {
        type: FieldsetTypes.Range,
        label: 'Range?',
        control: 'range',
        value: 20
      }
    ]
  };
  desc2: FieldsetInput = {
    legend: 'Demo2',
    items: [
      {
        type: FieldsetTypes.Checkbox,
        label: 'Transparent Background',
        control: 't',
      },
      {
        type: FieldsetTypes.Color,
        label: 'Background color',
        control: 'c',
        condition: data => !data['transparent']
      },
      {
        type: FieldsetTypes.Range,
        label: 'Range?',
        control: 'r',
        value: 20
      }
    ]
  };
  form = autoForm([...this.desc.items, ...this.desc2.items]);
}
