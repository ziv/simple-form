import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'xpr-root',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    JsonPipe
  ],
  styles: [
    `
      section.group {
        border: 1px solid grey;
        padding: 1em;

        label, .label {
          display: flex;
          justify-content: space-between;
          margin: .5em;

          span {
            flex: 1;
          }
          input {
            flex: 4;
          }

          div {
            flex: 4;
            display: flex;
            flex-direction: column;
          }
        }

        section.section {
          border: 1px solid grey;
          padding: 1em;
        }
      }
    `
  ],
  template: `
    <h1>SIMPLE FORM GENERATOR</h1>
    <main>
      @for (group of groups; track group.value.group) {
        <section [formGroup]="group" class="group">
          <label>
            <span>Legend</span>
            <input type="text" formControlName="legend">
          </label>
          <label>
            <span>group</span>
            <input type="text" formControlName="group">
          </label>
          <div class="label">
            <span>sections</span>
            <div>
              @for (section of itr(group); track section) {
                <section [formGroup]="section" class="section">
                  <label>
                    <span>Label</span>
                    <input type="text" formControlName="label"> (optional)
                  </label>
                  <button>ADD ITEM</button>
                </section>
              }
              <button (click)="addSection(group)">ADD SECTION</button>
            </div>
          </div>
        </section>
      }
      <button (click)="addGroup()">ADD FORM GROUP</button>
      @for (g of groups; track g) {
        <pre>{{ g.value | json }}</pre>
      }
    </main>
  `,
})
export class AppComponent {
  fb = new FormBuilder();
  groups: FormGroup[] = [];

  addGroup() {
    this.groups = [
      ...this.groups,
      this.fb.group({
        legend: [''],
        group: [''],
        sections: this.fb.array([]),
      })
    ];
  }

  addSection(group: FormGroup) {
    (group.get('sections') as FormArray).push(this.fb.group({
      label: [''],
      items: this.fb.array([]),
    }));
  }

  addItem(group: FormGroup) {
    (group.get('items') as FormArray).push(this.fb.group({

    }));
  }

  * itr(form: FormGroup): Generator<FormGroup> {
    const f = form.get('sections') as FormArray;
    for (let i = 0; i < f.length; ++i) {
      yield f.controls[i] as FormGroup;
    }
  }
}
