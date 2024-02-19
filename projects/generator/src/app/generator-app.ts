import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { FieldsetTypes } from '../../../xpr/simple-form/src/lib/simple-form';
import { SimpleFormSelector } from './simple-form-selector';
import { toCode } from './to-code';

export interface ControlDescriptor {
  type: string;
  label: string;
  control: string;
}

const ItemMap: Record<string, any> = {
  [FieldsetTypes.Number]: {
    min: [0],
    max: [0],
  },
  [FieldsetTypes.Range]: {
    min: [0, Validators.required],
    max: [0, Validators.required],
    step: [1],
  },
  [FieldsetTypes.Select]: {
    options: [[]],
  }
}

@Component({
  selector: 'xpr-root',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    JsonPipe,
    SimpleFormSelector,
  ],
  styles: [
    `
      section {
        padding: 0 1em;
        line-height: 2em;

        select {
        }
      }

      label {
        display: flex;
        gap: 1em;
        justify-content: space-between;
        align-items: center;
        //border: 1px solid red;

        > span {
          flex: 2;

          + span, + input {
            flex: 8;
          }
        }
      }
      //.wrap {
      //  display: flex;
      //
      //  > main, > aside {
      //    flex: 1
      //  }
      //}
      //
      //main, section {
      //  display: flex;
      //  flex-direction: column;
      //  gap: .7em;
      //}
      //
      //section {
      //  //border: 1px solid #dadada;
      //  //border-radius: .2em;
      //}
      //
      //label, .label {
      //  display: flex;
      //  gap: 1em;
      //  justify-content: space-between;
      //  align-items: center;
      //
      //  var {
      //    font-size: 1.5em;
      //    cursor: pointer;
      //  }
      //
      //  span {
      //    width: 8em;
      //    height: 1.5em;
      //
      //    + div, + input {
      //      display: flex;
      //      flex-direction: column;
      //      gap: .5em;
      //      flex: 1;
      //    }
      //  }
      //}
    `
  ],
  template: `
    <h1>SIMPLE FORM GENERATOR</h1>
    <main>
      <form [formGroup]="form">
        <fieldset>
          <legend>
            <label>
              <span>legend</span>
              <input type="text" formControlName="legend">
            </label>
          </legend>
          @for (section of itr(form); track $index) {
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
            <button (click)="addSection(form)">ADD SECTION</button>
          </section>
        </fieldset>
      </form>
    </main>
    <div>
      <p>export default {{code}}</p>
    </div>
  `,
})
export class GeneratorApp {
  fb = new FormBuilder();
  form = this.fb.group({
    legend: [''],
    items: this.fb.array([])
  });

  get code() {
    return toCode(this.form.value);
  }

  addItem(group: FormGroup, type: string) {
    (group.get('items') as FormArray).push(this.fb.group({
      type: [type],
      label: ['', Validators.required],
      control: ['', Validators.required],
    }));
  }

  addSection(group: FormGroup) {
    (group.get('items') as FormArray).push(this.fb.group({
      legend: [''],
      items: this.fb.array([])
    }));
  }




  // @ts-ignore
  groups: FormArray<FormGroup> = this.fb.array([]);
  types = Object.values(FieldsetTypes);


  toArr(form: FormGroup, key: string) {
    return form.get(key) as FormArray;
  }

  removeAt(form: FormArray, idx: number) {
    form.removeAt(idx);
  }

  addGroup() {
    this.groups.push(this.fb.group({
      legend: [''],
      group: [''],
      sections: this.fb.array([]),
    }));
  }



  // addItem(group: FormGroup, type: string) {
  //   (group.get('items') as FormArray).push(this.fb.group({
  //     type: [type],
  //     label: ['', Validators.required],
  //     control: ['', Validators.required],
  //     ...(ItemMap[type as FieldsetTypes] ?? {})
  //   }));
  // }

  * itr(form: FormGroup): Generator<FormGroup> {
    const {controls, length} = form.get('items') as FormArray;
    for (let i = 0; i < length; ++i) {
      yield controls[i] as FormGroup;
    }
  }
}
