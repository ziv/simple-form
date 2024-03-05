import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { FormSimpleInput } from '../common/form-simple-input';

@Component({
  selector: 'xpr-select',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: Select,
      multi: true
    }
  ],
  styles: [
    `
      :host {
        display: inline-flex;
        align-items: center;
      }

      select {
        border: 0;
        appearance: none;
        background-color: transparent;
        height: 1.5em;

        &:focus {
          outline: 0;
          background-color: #FF00FF;
        }
      }
    `
  ],
  template: `
    <select (change)="writeValue(s.value);onChange(s.value)" #s>
      @for (item of options; track item) {
        <option [value]="item">{{ item }}</option>
      }
    </select>`
})
export class Select extends FormSimpleInput<string> {
  @Input() options: string[] = [];
}
