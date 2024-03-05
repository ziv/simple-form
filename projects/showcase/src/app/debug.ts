import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { border, borders, size } from '../../../xpr/form-inputs/src/common/forms';
import { Border } from '../../../xpr/form-inputs/src/css/border';
import { Borders } from '../../../xpr/form-inputs/src/css/borders';
import { Size } from '../../../xpr/form-inputs/src/css/size';
import { JsonPipe, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'xpr-debug',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    Border,
    Borders,
    Size,
    JsonPipe,
    UpperCasePipe
  ],
  template: `
    <main>
      <div class="xprd">
        <h1>DEBUG</h1>
        <form [formGroup]="form">
          <h2>Native Form Elements</h2>
          <table>
            <tr>
              <th>Element</th>
              <th>Preview</th>
              <th>Value</th>
            </tr>
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
              <td><input type="text" formControlName="text" placeholder="Type here"></td>
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
                <select formControlName="options">
                  <option>options 1</option>
                  <option>options 2</option>
                </select>
              </td>
              <td>{{ value.options | json }}</td>
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
      </div>
      <div>
        <h1>Edit</h1>
        <form [formGroup]="root">
          <table>
            <tr>
              <td>accent color</td>
              <td>
                <input type="color" formControlName="--xpr-accent-color">
              </td>
            </tr>
          </table>
        </form>
      </div>
    </main>
  `,
  styles: [`
    main {
      display: flex;
    }
    `],
})
export class Debug {
  get value() {
    return this.form.value;
  }

  root = inject(FormBuilder).group({
    '--xpr-accent-color': ['']
  });

  form = inject(FormBuilder).group({
    checkbox: [true],
    radio: ['A'],
    range: [20],
    text: ['text'],
    color: ['#FF00FF'],
    options: ['options 1'],
    date: ['2020-12-31'],
    size: [size()],
    border: [border()],
    borders: [borders()],
  });

  constructor() {
    this.root.valueChanges.subscribe(value => {
      const [[key, val]] = Object.entries(value);
      /* @ts-ignore */
      // this.root.style.setProperty(key, val);
      document.documentElement.style.setProperty(key, val);
      if (key === '--xpr-accent-color') {
        this.form.get('color')?.setValue(val);
      }
    });
  }
}
