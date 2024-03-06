import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { FormElementType } from '../../../xpr/simple-form/src/lib/simple-form';
import { toCode } from './to-code';
import { LegendDirective } from './legend';

const ItemMap: Record<string, any> = {
  [FormElementType.Number]: {
    min: [0],
    max: [0],
  },
  [FormElementType.Range]: {
    min: [0, Validators.required],
    max: [0, Validators.required],
    step: [1],
  },
  [FormElementType.Select]: {
    options: [[]],
  }
}

@Component({
  selector: 'xpr-root',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    LegendDirective,
    JsonPipe,
  ],
  styles: [
    `
      main {
        margin: 1em;

        form {
          white-space: pre;
          font-family: monospace;
        }

        fieldset {
          border: 0;
          border-left: 1px solid red;
          border-radius: .5em;
          margin: 0;
          padding-top: .5em;

          legend {
            margin: 0 -.5em;
          }

          fieldset {
            border-left: 1px solid blueviolet;

            legend {
              color: blueviolet;
            }

            fieldset {
              border-left: 1px solid green;
              margin-bottom: 1em;

              legend {
                color: green;
              }
            }
          }

          section {
            margin-top: 1em;
          }

          input {
            border: 0;
            border-bottom: 1px solid grey;
            text-align: center;
          }
        }
      }

      //section {
      //  margin: 0 0 0 1em;
      //  line-height: 2em;
      //
      //  select {
      //  }
      //}

      label {
        display: flex;
        gap: 1em;
        justify-content: space-between;
        align-items: center;

        > span {
          flex: 2;

          + span, + input {
            flex: 8;
          }
        }
      }
    `
  ],
  template: `
    <main>
      <h1>SIMPLE FORM GENERATOR</h1>
      <form [formGroup]="form">
        @for (group of groups; track $index) {
          <fieldset [formGroup]="group[1]">
            <legend>
              <label>
                Group [ {{ group[0] }} ],
                <span>legend</span>
                [<input type="text" formControlName="legend">]
              </label>
            </legend>
            @for (section of itr(group[1]); track $index) {
              <fieldset [formGroup]="section">
                <legend>
                  <label>
                    <span>legend</span>
                    <input type="text" formControlName="legend"> (optional)
                  </label>
                </legend>
                @for (item of itr(section); track $index) {
                  <fieldset [formGroup]="item">
                    <legend>{{ item.value.type }}</legend>
                    <label>
                      <span>label</span>
                      <input type="text" formControlName="label">
                    </label>
                    <label>
                      <span>control</span>
                      <input type="text" formControlName="control">
                    </label>
                    <label>
                      <span>default value</span>
                      <input type="text" formControlName="value"> (optional)
                    </label>
                    @if (item.value.type == 'range' || item.value.type == 'number') {
                      <label>
                        <span>min</span>
                        <input type="number" formControlName="min">
                      </label>
                      <label>
                        <span>max</span>
                        <input type="number" formControlName="max">
                      </label>
                    }
                    @if (item.value.type == 'range') {
                      <label>
                        <span>step</span>
                        <input type="number" formControlName="step">
                      </label>

                    }
                  </fieldset>
                }
                <section>
                  <select #type>
                    @for (t of types; track t) {
                      <option [value]="t">{{ t }}</option>
                    }
                  </select>
                  <button (click)="addItem(section, type.value)">ADD ITEM</button>
                </section>
              </fieldset>
            }
            <section>
              <button (click)="addSection(group[1])">ADD SECTION</button>
            </section>
          </fieldset>
        }
      </form>
      <p>
        <input type="text" placeholder="Group name" #gn>
        <button (click)="addGroup(gn.value)">ADD GROUP</button>
      </p>
      <div>
        <textarea>export default {{ code }}</textarea>
      </div>
    </main>
  `,
})
export class GeneratorApp {
  fb = new FormBuilder();
  form = this.fb.group({});

  get groups(): [string, FormGroup][] {
    return Object.entries(this.form.controls);
  }

  get code() {
    return toCode(this.form.value);
  }

  addGroup(name: string) {
    if (!name) return console.error('addGroup(): missing name');
    if (name in this.form.value) return console.error('addGroup(): name exists');
    this.form.addControl(name, this.fb.group({
      legend: [''],
      items: this.fb.array([])
    }));
  }

  addItem(group: FormGroup, type: string) {
    (group.get('items') as FormArray).push(this.fb.group({
      type: [type],
      label: ['', Validators.required],
      control: ['', Validators.required],
      value: [''],
      ...ItemMap[type] ?? {}
    }));
  }

  addSection(group: FormGroup) {
    (group.get('items') as FormArray).push(this.fb.group({
      legend: [''],
      items: this.fb.array([])
    }));
  }


  // @ts-ignore
  // groups: FormArray<FormGroup> = this.fb.array([]);
  types = Object.values(FormElementType);


  toArr(form: FormGroup, key: string) {
    return form.get(key) as FormArray;
  }

  removeAt(form: FormArray, idx: number) {
    form.removeAt(idx);
  }

  * itr(form: FormGroup): Generator<FormGroup> {
    const {controls, length} = form.get('items') as FormArray;
    for (let i = 0; i < length; ++i) {
      yield controls[i] as FormGroup;
    }
  }
}
