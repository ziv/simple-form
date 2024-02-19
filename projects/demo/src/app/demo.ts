import { Component } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FieldsetTypes } from '../../../xpr/simple-form/src/lib/simple-form';
import { XprFieldsets } from '../../../xpr/simple-form/src/lib/fieldsets';

@Component({
  selector: 'demo-root',
  standalone: true,
  imports: [XprFieldsets, JsonPipe],
  template: `
    <h1>DEMO</h1>
    <main>
      <xpr-fieldsets [descriptors]="descriptors" (changed)="value=$event"></xpr-fieldsets>
    </main>
    <pre>{{ value | json }}</pre>
  `,
})
export class Demo {
  value: any = {};

  descriptors = {
    bob: {
      legend: 'Another',
      items: [
        {
          items: [
            {
              type: FieldsetTypes.Color,
              label: 'choose color',
              control: 'color'
            }
          ]
        }
      ]
    },
    alice: {
      legend: 'Click me to expand',
      items: [
        {
          legend: 'Sub section A',
          items: [
            {
              type: FieldsetTypes.Color,
              label: 'color',
              control: 'color'
            }
          ]
        },
        {
          legend: 'Sub section B',
          items: [
            {
              type: FieldsetTypes.Checkbox,
              label: 'Transparent Background',
              control: 'transparent'
            },
            {
              type: FieldsetTypes.Range,
              label: 'Range',
              control: 'range',
              value: -20,
              min: -20,
              max: 50,
              step: 10
            },
            {
              type: FieldsetTypes.Text,
              label: 'Text',
              control: 'text'
            },
            {
              type: FieldsetTypes.Number,
              label: 'Number',
              control: 'number',
            },
            {
              type: FieldsetTypes.Select,
              label: 'Select',
              control: 'select',
              options: [
                {
                  value: 'male',
                  label: 'Male'
                },
                {
                  value: 'female',
                  label: 'Female'
                }
              ]
            }
          ],
        },
      ]
    }
  };
}
