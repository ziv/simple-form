import { Component, inject } from '@angular/core';
import { FormBuilder, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { FormGroupInput } from '../common/form-group-input';
import { Defaults, SizeUnits } from './constants';
import { NgStyle } from '@angular/common';

export interface CssSize {
  value: number;
  unit: string;
}

@Component({
  selector: 'xpr-css-size',
  standalone: true,
  imports: [ReactiveFormsModule, NgStyle],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: Size,
      multi: true
    }
  ],
  styles: [
    `
      :host {
        display: inline-flex;
        align-items: center;
        background-color: var(--xpr-bg-color);
        border: var(--xpr-form-element-border);
        border-radius: var(--xpr-form-element-border-radius);
        height: calc(var(--xpr-form-element-height) + .5px); /* todo check firefox */

        > span {
          width: 60px;
          text-align: center;
        }

        &:has(input:focus, select:focus) {
          outline: 1px solid var(--xpr-accent-color);
        }

        select {
          cursor: pointer;
          appearance: none;
        }

        input {
          text-align: end;
        }

        input, select {
          border: 0;
          border-radius: 0;
          background-color: transparent;
          flex-shrink: 1;
          width: 30px;
          /*transform: translateY(-1px);*/

          &:focus {
            outline: 0;
            background-color: #FF00FF;
          }
        }



        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        input[type="number"] {
          -moz-appearance: textfield;
        }
      }

    `
  ],
  template: `
      <ng-container [formGroup]="form">
        <input type="number" formControlName="value">
        <select formControlName="unit" #select>
          @for (u of units; track u) {
            <option [value]="u">{{ u }}</option>
          }
        </select>
      </ng-container>
  `
})
export class Size extends FormGroupInput<CssSize> {
  protected units = SizeUnits;
  protected form = inject(FormBuilder).group({...Defaults.Size});
}
