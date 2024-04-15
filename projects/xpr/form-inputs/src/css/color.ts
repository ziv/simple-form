import { FormGroupInput } from '../common/form-group-input';
import { Component, inject } from '@angular/core';
import { FormBuilder, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { Defaults } from './constants';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'xpr-css-color',
  standalone: true,
  imports: [ReactiveFormsModule, NgStyle],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: Color,
      multi: true
    }
  ],
  styles: [
    `
      :host {
        display: inline-flex;

        input[type=range] {
          transform: translateY(0);
        }
      }
    `
  ],
  template: `
    <ng-container [formGroup]="form">
      <input type="color" formControlName="color">
      <div [ngStyle]="bg">
        <input type="range" formControlName="alpha" min="0" max="255">
      </div>
    </ng-container>`
})
export class Color extends FormGroupInput<any> {
  protected form = inject(FormBuilder).group({
    color: [Defaults.Color],
    alpha: [Defaults.Alpha],
  });

  get bg() {
    return {
      background: `linear-gradient(90deg, rgba(0, 0, 0, 0), ${this.form.value.color})`
    };
  }
}
