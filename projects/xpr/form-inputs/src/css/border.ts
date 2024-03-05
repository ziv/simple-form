import { CssSize, Size } from './size';
import { Component, inject, Input } from '@angular/core';
import { FormBuilder, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { FormGroupInput } from '../common/form-group-input';
import { size } from '../common/forms';
import { Select } from '../simple/select';

export interface CssBorder {
  width: CssSize;
  type: string;
  color: string;
  radius: CssSize;
}

@Component({
  selector: 'xpr-css-border',
  standalone: true,
  imports: [ReactiveFormsModule, Size, Select],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: Border,
      multi: true
    }
  ],
  styles: [
    `
      :host {
        display: inline-flex;

        label {
          display: flex;
          flex-direction: column;
          margin: 0 1px;

          span {
            font-size: .7em;
            color: #595959;
          }
        }
        /** {*/
        /*  border: 0;*/
        /*}*/

        /**:focus {*/
        /*  border: 0;*/
        /*  outline: 0;*/
        /*}*/
      }
    `
  ],
  template: `
    <ng-container [formGroup]="form">
      <label>
        <span>width</span>
        <xpr-css-size formControlName="width"/>
      </label>
      <label>
        <span>type</span>
        <xpr-select formControlName="type" [options]="types"/>
      </label>
      <label>
        <span>color</span>
        <input type="color" formControlName="color">
      </label>
      <label>
        <span>radius</span>
        <xpr-css-size formControlName="radius"/>
      </label>
    </ng-container>
  `
})
export class Border extends FormGroupInput<CssBorder> {
  protected types = ['solid', 'dash'];
  form = inject(FormBuilder).group({
    width: [size()],
    type: ['solid'],
    color: ['#000000'],
    radius: [size()],
  });
}
