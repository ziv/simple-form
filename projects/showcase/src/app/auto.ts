import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { XprFieldset } from '../../../xpr/simple-form/src/components/fieldset';
import { XprSimpleForm } from '../../../xpr/simple-form/src/components/simple-form';
import { FormElementType, toForm } from '../../../xpr/simple-form/src/to-form';

@Component({
  selector: 'xpr-auto',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    XprSimpleForm,
    XprFieldset
  ],
  template: `
    <h1>AUTO</h1>
    <main class="xprd">
      <xpr-fieldset legend="Legend">
        <xpr-simple-form [form]="form"/>
<!--        <xpr-fieldset legend="Legend">-->
<!--          <xpr-simple-form [form]="form"/>-->
<!--        </xpr-fieldset>-->
        <!--        <xpr-fieldset legend="Legend">-->
        <!--          <xpr-auto-form [form]="{form, items}"/>-->
        <!--        </xpr-fieldset>-->
        <!--        <h3>Another items</h3>-->
        <!--        <xpr-auto-form [form]="{form, items}"/>-->
        <!--        <h3>Another items</h3>-->
        <!--        <xpr-auto-form [form]="{form, items}" />-->
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
  form = toForm(this.items);

  constructor() {

  }
}
