import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { XprAutoForm } from '../../../xpr/simple-form/src/components/auto-form';
import { FormElementType } from '../../../xpr/simple-form/src/lib/simple-form';
import { XprFieldset } from '../../../xpr/simple-form/src/components/fieldset';

@Component({
  selector: 'xpr-auto',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    XprAutoForm,
    XprFieldset
  ],
  template: `
    <h1>AUTO</h1>
    <main class="xprd">
      <xpr-fieldset legend="Legend">
        <xpr-fieldset legend="Legend">
          <xpr-auto-form [form]="{form, items}"/>
        </xpr-fieldset>
        <xpr-fieldset legend="Legend">
          <xpr-auto-form [form]="{form, items}"/>
        </xpr-fieldset>
        <h3>Another items</h3>
        <xpr-auto-form [form]="{form, items}"/>
        <h3>Another items</h3>
        <xpr-auto-form [form]="{form, items}" />
      </xpr-fieldset>
    </main>
  `,
  styles: [`
    main {
      max-width: 500px;
    }
  `],
})
export class Auto {
  form = new FormBuilder().group({
    transparent: [true],
    color: ['#ff00ff'],
    range: [30],
    render: ['svg'],
    text: ['']
  });
  items = [
    {
      type: FormElementType.Range,
      label: 'Range?',
      control: 'range',
      value: 20
    },
    {
      type: FormElementType.Select,
      label: 'Type',
      control: 'render',
      options: [
        {value: 'png', label: 'PNG'},
        {value: 'svg', label: 'SVG'}
      ]
    },
    {
      type: FormElementType.Text,
      label: 'Text',
      control: 'text'
    },
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
  ];

  constructor() {

  }
}
