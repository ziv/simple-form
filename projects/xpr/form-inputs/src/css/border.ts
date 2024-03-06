import { CssSize, Size } from './size';
import { Component, inject } from '@angular/core';
import { FormBuilder, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { FormGroupInput } from '../common/form-group-input';
import { Defaults } from './constants';

export interface CssBorder {
  width: CssSize;
  type: string;
  color: string;
  radius: CssSize;
}

@Component({
  selector: 'xpr-css-border',
  standalone: true,
  imports: [ReactiveFormsModule, Size],
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
      }
    `
  ],
  template: `
    <ng-container [formGroup]="form">
      <xpr-css-size formControlName="width" title="Border Size"/>
      <select formControlName="type" title="Border Type">
        @for (t of types; track t) {
          <option [value]="t">{{ t }}</option>
        }
      </select>
      <input type="color" formControlName="color" title="Border Color">
      <xpr-css-size formControlName="radius" title="Border Radius Size"/>
    </ng-container>
  `
})
export class Border extends FormGroupInput<CssBorder> {
  protected types = ['solid', 'dash'];
  protected form = inject(FormBuilder).group({
    type: [Defaults.BorderType],
    color: [Defaults.Color],
    width: [{...Defaults.Size}],
    radius: [{...Defaults.Size}],
  });
}
