import { FormGroupInput } from '../common/form-group-input';
import { CssLength } from './length';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

export type Corners = {
  tl: CssLength;
  tr: CssLength;
  bl: CssLength;
  br: CssLength;
};

const defaultCorner = {value: 0, unit: 'px'};

@Component({
  selector: 'xpr-css-corners',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: ``
})
export class CornersComponent extends FormGroupInput<Corners> {
  form = inject(FormBuilder).group({
    tl: [{...defaultCorner}],
    tr: [{...defaultCorner}],
    bl: [{...defaultCorner}],
    br: [{...defaultCorner}],
  });

  writeValue(corners: Corners) {
    this.form.setValue(corners);
  }
}
