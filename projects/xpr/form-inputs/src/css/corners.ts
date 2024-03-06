import { FormGroupInput } from '../common/form-group-input';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CssSize } from './size';

export type Corners = {
  tl: CssSize;
  tr: CssSize;
  bl: CssSize;
  br: CssSize;
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
}
