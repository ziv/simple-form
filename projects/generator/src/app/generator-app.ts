import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { FieldsetTypes } from '../../../xpr/simple-form/src/lib/simple-form';

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
  ],
  styles: [
    `
      .wrap {
        display: flex;

        > main, > aside {
          flex: 1
        }
      }

      main, section {
        display: flex;
        flex-direction: column;
        gap: .7em;
      }

      section {
        //border: 1px solid #dadada;
        //border-radius: .2em;
      }

      label, .label {
        display: flex;
        gap: .7em;
        justify-content: space-between;
        align-items: center;

        span {
          width: 8em;
          height: 1.5em;

          + div, + input {
            display: flex;
            flex-direction: column;
            gap: .5em;
            flex: 1;
          }
        }
      }
    `
  ],
  template: `
    <h1>SIMPLE FORM GENERATOR</h1>
    <div class="wrap">
      <main>
        @for (group of itr(form, 'groups'); track group.value.group) {
          <section [formGroup]="group" class="group">
            <label>
              <span>legend</span>
              <input type="text" formControlName="legend">
            </label>
            <label>
              <span>group</span>
              <input type="text" formControlName="group">
            </label>
            <div class="label">
              <span>sections</span>
              <div>
                @for (section of itr(group, 'sections'); track section) {
                  <section [formGroup]="section" class="section">
                    <label>
                      <span>label</span>
                      <input type="text" formControlName="label"> (optional)
                    </label>
                    <div class="label">
                      <span>items</span>
                      <div>
                        @for (item of itr(section, 'items'); track item) {
                          <section class="item" [formGroup]="item">
                            <label>
                              <span>type</span>
                              <span>{{ item.value.type }}</span>
                            </label>
                            <label>
                              <span>label</span>
                              <input type="text" formControlName="label">
                            </label>
                            <label>
                              <span>control</span>
                              <input type="text" formControlName="control">
                            </label>
                            @if (item.value.type === 'range' || item.value.type === 'number') {
                              <label>
                                <span>min</span>
                                <input type="number" formControlName="min">
                              </label>
                              <label>
                                <span>max</span>
                                <input type="number" formControlName="max">
                              </label>
                            }
                            @if (item.value.type === 'range') {
                              <label>
                                <span>step</span>
                                <input type="number" formControlName="step">
                              </label>
                            }
                          </section>
                        }
                      </div>
                    </div>
                    <div class="label">
                      <span></span>
                      <div>
                        <select #type>
                          @for (t of types; track t) {
                            <option [value]="t">{{ t }}</option>
                          }
                        </select>
                        <button (click)="addItem(section, type.value)">ADD ITEM</button>
                      </div>
                    </div>
                  </section>
                }
                <button (click)="addSection(group)">ADD SECTION</button>
              </div>
            </div>
          </section>
        }
        <button (click)="addGroup()">ADD GROUP</button>
      </main>
      <aside>
        <pre>{{ form.value.groups | json }}</pre>
      </aside>
    </div>
  `,
})
export class GeneratorApp {
  fb = new FormBuilder();
  form = this.fb.group({groups: this.fb.array([])});
  types = Object.values(FieldsetTypes);

  get groups() {
    return this.form.get('groups') as FormArray;
  }

  addGroup() {
    this.groups.push(this.fb.group({
      legend: [''],
      group: [''],
      sections: this.fb.array([]),
    }));
  }

  addSection(group: FormGroup) {
    (group.get('sections') as FormArray).push(this.fb.group({
      label: [''],
      items: this.fb.array([])
    }));
  }

  addItem(group: FormGroup, type: string) {
    (group.get('items') as FormArray).push(this.fb.group({
      type: [type],
      label: ['', Validators.required],
      control: ['', Validators.required],
      ...(ItemMap[type as FieldsetTypes] ?? {})
    }));
  }

  * itr(form: FormGroup, key: string): Generator<FormGroup> {
    const f = form.get(key) as FormArray;
    for (let i = 0; i < f.length; ++i) {
      yield f.controls[i] as FormGroup;
    }
  }
}
