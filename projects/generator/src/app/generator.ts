import { Component } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { formByType } from './forms';
import { JsonPipe } from '@angular/common';
import { XprSimpleForm } from '../../../xpr/simple-form/src/components/simple-form';
import { FormElementType, SimpleFormGroup, toForm } from '../../../xpr/simple-form/src/to-form';

@Component({
  selector: 'xpr-root',
  standalone: true,
  imports: [ReactiveFormsModule, XprSimpleForm, JsonPipe],
  styles: [`
    .add {
      border: 1px solid red;
    }
    xpr-simple-form {
      display: flex;
      flex-direction: column;
    }
  `],
  template: `
    <h1>FORM GENERATOR</h1>
    <form [formGroup]="form">
      <fieldset>
        <legend>Generator</legend>
        @for (group of form.controls['items'].controls; track group) {
          <xpr-simple-form [form]="group"/>
        }
        <div class="add">
          <label>
            <select #type>
              @for (t of types; track t) {
                <option [value]="t">{{ t }}</option>
              }
            </select>
            <button (click)="addItem(type.value)">add</button>
          </label>
        </div>
      </fieldset>
    </form>
    <pre>{{ form.value | json }}</pre>
  `
})
export class FormGenerator {
  types = Object.values(FormElementType) as string[];
  form = new FormGroup({items: new FormArray<SimpleFormGroup>([])});

  addItem(type: string) {
    this.form.controls['items'].push(toForm(formByType(type as FormElementType)))
  }
}
