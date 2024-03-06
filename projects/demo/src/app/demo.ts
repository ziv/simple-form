import { Component, inject } from '@angular/core';
import { JsonPipe, UpperCasePipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { border, borders, size } from '../../../xpr/form-inputs/src/common/forms';
import { XprFieldsets } from '../../../xpr/simple-form/src/lib/fieldsets';
import { Size } from '../../../xpr/form-inputs/src/css/size';
import { Border } from '../../../xpr/form-inputs/src/css/border';
import { Borders } from '../../../xpr/form-inputs/src/css/borders';
import { FieldsetInput, FormElementType } from '../../../xpr/simple-form/src/lib/simple-form';
import { XprFieldset } from '../../../xpr/simple-form/src/components/fieldset';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'demo-root',
  standalone: true,
  imports: [ReactiveFormsModule, XprFieldsets, JsonPipe, Size, Border, Borders, UpperCasePipe, XprFieldset, RouterLink],
  template: `
    <nav>
      <ul>
        <li routerLink="/auto">Simple Form</li>
      </ul>
    </nav>
    <form [formGroup]="form">
      <h1>DEMO</h1>
      <h2>Form Elements</h2>
      <table>
        <tr>
          <td>Checkbox</td>
          <td><input type="checkbox" formControlName="checkbox"></td>
          <td>{{ value.checkbox | json }}</td>
        </tr>
        <tr>
          <td>Radio</td>
          <td>
            <input type="radio" name="radio" value="A" formControlName="radio">
            <input type="radio" name="radio" value="B" formControlName="radio">
          </td>
          <td>{{ value.radio | json }}</td>
        </tr>
        <tr>
          <td>Range</td>
          <td><input type="range" formControlName="range"></td>
          <td>{{ value.range | json }}</td>
        </tr>
        <tr>
          <td>Text</td>
          <td><input type="text" formControlName="text"></td>
          <td>{{ value.text | json }}</td>
        </tr>
        <tr>
          <td>Color</td>
          <td><input type="color" formControlName="color"></td>
          <td>{{ value.color | uppercase | json }}</td>
        </tr>
        <tr>
          <td>Date</td>
          <td><input type="date" formControlName="date"></td>
          <td>{{ value.date | json }}</td>
        </tr>
        <tr>
          <td>select</td>
          <td>
            <select>
              <option>options 1</option>
              <option>options 2</option>
            </select>
          </td>
        </tr>
      </table>
      <h2>XPR Form Elements</h2>
      <h3>Size</h3>
      <xpr-css-size formControlName="size"/>
      <h3>Border</h3>
      <xpr-css-border formControlName="border"/>
      <h3>Borders</h3>
      <xpr-css-borders formControlName="borders"/>
    </form>
    <pre>{{ form.value | json }}</pre>
  `,
})
export class Demo {
  form = inject(FormBuilder).group({
    checkbox: [true],
    radio: ['A'],
    range: [20],
    text: ['text'],
    color: ['#FF00FF'],
    date: ['2020-12-31'],
    size: [size()],
    border: [border()],
    borders: [borders()],
  });

  get value() {
    return this.form.value;
  }

  log(msg: any) {
    console.log(msg);
  }

  desc: FieldsetInput = {
    legend: 'Layout',
    items: [
      {
        type: FormElementType.Checkbox,
        label: 'Transparent Background',
        control: 'transparent',
      },
      {
        type: FormElementType.Color,
        label: 'color',
        control: 'color',
      }
    ]
  };
}
