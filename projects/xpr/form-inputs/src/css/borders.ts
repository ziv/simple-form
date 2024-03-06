import { Border, CssBorder } from './border';
import { Component, inject } from '@angular/core';
import { FormBuilder, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { border } from '../common/forms';
import { FormGroupInput } from '../common/form-group-input';

export interface CssBorders {
  locked: boolean;
  top: CssBorder;
  right: CssBorder;
  bottom: CssBorder;
  left: CssBorder;
}

@Component({
  selector: 'xpr-css-borders',
  standalone: true,
  imports: [ReactiveFormsModule, Border],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: Borders,
      multi: true
    }
  ],
  styles: [
    `
      :host {
        display: inline-flex;
        flex-direction: column;
        gap: 2px;

        label {
          display: flex;

          span {
            width: 4.5em;
          }
        }
      }
    `
  ],
  template: `
    <ng-container [formGroup]="form">
      <label>
        <span>Lock</span>
        <input type="checkbox" formControlName="locked">
      </label>
      <label>
        <span>top</span>
        <xpr-css-border formControlName="top" title="Top Border"/>
      </label>
      @if (!form.value.locked) {
        <label>
          <span>right</span>
          <xpr-css-border formControlName="right" title="Right Border"/>
        </label>
        <label>
          <span>bottom</span>
          <xpr-css-border formControlName="bottom" title="Bottom Border"/>
        </label>
        <label>
          <span>left</span>
          <xpr-css-border formControlName="left" title="Left Border"/>
        </label>


      }
    </ng-container>
  `
})
export class Borders extends FormGroupInput<CssBorders> {
  form = inject(FormBuilder).group({
    locked: [true],
    top: [border()],
    right: [border()],
    bottom: [border()],
    left: [border()],
  });
}
