import { Component } from '@angular/core';
import { XprFieldset } from '@xpr/simple-form';
import { JsonPipe } from '@angular/common';
import { FieldsetInput, FieldsetTypes } from '../../../xpr/simple-form/src/lib/simple-form';
import { XprFieldsets } from '../../../xpr/simple-form/src/lib/fieldsets';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [XprFieldset, XprFieldsets, JsonPipe],
  template: `
    <main>
<!--      <xpr-fieldset [desc]="desc[1]" (changed)="value=$event"></xpr-fieldset>-->
      <xpr-fieldsets [descriptors]="desc" (changed)="value=$event" />
    </main>
    <pre>{{ value | json }}</pre>
  `,
})
export class AppComponent {
  value: any = {
    color: '#00FF00'
  };

  desc: FieldsetInput[] = [
    {
      legend: 'Another',
      group: 'another',
      sections: [
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
    {
      legend: 'Click me to expand',
      group: 'name',
      defaultValue: {
        color: '#00FF00'
      },
      sections: [
        {
          label: 'Sub section A',
          items: [
            {
              type: FieldsetTypes.Color,
              label: 'color',
              control: 'color'
            }
          ]
        },
        {
          label: 'Sub section B',
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
              min: 0,
              max: 100,
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
  ];
}
