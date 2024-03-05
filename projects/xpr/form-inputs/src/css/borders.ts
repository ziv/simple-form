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
  template: `
    <ng-container [formGroup]="form">
      <input type="checkbox" formControlName="locked"> Locked
      <xpr-css-border formControlName="top"/>
      <xpr-css-border formControlName="right"/>
      <xpr-css-border formControlName="bottom"/>
      <xpr-css-border formControlName="left"/>
    </ng-container>
  `
})
export class Borders extends FormGroupInput<CssBorders> {
  form = inject(FormBuilder).group({
    locked: [false],
    top: [border()],
    right: [border()],
    bottom: [border()],
    left: [border()],
  })
}
