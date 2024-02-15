import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'xpr-input-text',
  standalone: true,
  template: `
    @if (form) {
      <section [formGroup]="form">
        <label>
          <span>Label</span>
          <input type="text" formControlName="label">
        </label>
        <label>
          <span>control</span>
          <input type="text" formControlName="control">
        </label>
      </section>
    }
  `,
  imports: [
    ReactiveFormsModule
  ]
})
export class InputText {
  @Input() form?: FormGroup;
  // type: string;
  // label: string;
  // control: string;
  // condition?: any;
}
