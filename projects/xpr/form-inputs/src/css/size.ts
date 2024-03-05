import { Component, inject, ViewChild } from '@angular/core';
import { FormBuilder, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { FormGroupInput } from '../common/form-group-input';
import { SizeUnits } from './constants';
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

        &:has(input:focus, select:focus) {
          outline: 1px solid #FF00FF;
        }

        input, select {
          border: 0;
          background-color: transparent;
          height: 1.5em;
          font-family: monospace;

          &:focus {
            outline: 0;
            background-color: #FF00FF;
          }
        }

        select {
          width: 2.5em;
          cursor: pointer;
          appearance: none;
        }

        input {
          text-align: right;
          width: 2em;
        }

        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        input[type=number] {
          -moz-appearance: textfield;
        }
      }

    `
  ],
  template: `
    @if (form) {
      <ng-container [formGroup]="form">
        <input type="number" formControlName="value" [ngStyle]="width">
        <select formControlName="unit" #select>
          @for (u of units; track u) {
            <option [value]="u">{{ u }}</option>
          }
        </select>
      </ng-container>
    }
  `
})
export class Size extends FormGroupInput<CssSize> {
  protected units = SizeUnits;
  form = inject(FormBuilder).group({value: [0], unit: ['px']});

  @ViewChild('select') s: any;

  get width() {
    // todo I don't like it, I want the input will be stretch automatically (its in flex container)
    const w = Math.log(this.form.value.value as number) * .275;
    return {
      width: `${w + 1}em`
    };
  }
}
