import { Component } from '@angular/core';
import { FormElementType, toForm } from '../../../xpr/simple-form/src/to-form';
import { XprCustomForm } from '../../../xpr/simple-form/src/components/custom-form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe, NgClass, NgComponentOutlet } from '@angular/common';

@Component({
  selector: 'demo-root',
  standalone: true,
  imports: [XprCustomForm, FormsModule, NgComponentOutlet, ReactiveFormsModule, NgClass, JsonPipe],
  template: `
    <table border="1">
      <xpr-custom-form [form]="form" [tpl]="tpl"/>
    </table>
    <pre>{{ form.value | json }}</pre>
    <ng-template let-ctx #tpl>
      <ng-container [formGroup]="ctx.group">
        <tr>
          <td>
            <label [ngClass]="'xpr-label xpr-type-'+ctx.item.type">
              <span class="xpr-label">{{ ctx.item.label }}</span>
            </label>
          </td>
          <td>
          <span class="xpr-input">
            @switch (ctx.item.type) {
              @case (types.Checkbox) {
                <!-- todo checkbox does not working when bound -->
                <input type="checkbox"
                       [formControlName]="ctx.item.control">
              }
              @case (types.Range) {
                <input type="range"
                       [formControlName]="ctx.item.control"
                       [min]="ctx.item.min"
                       [max]="ctx.item.max"
                       [step]="ctx.item.step">
              }
              @case (types.Select) {
                <select [formControlName]="ctx.item.control">
                @for (el of ctx.item.options; track el.value) {
                  <option [ngValue]="el.value">{{ el.label }}</option>
                }
              </select>
              }
              @default {
                <input [type]="ctx.item.type"
                       [formControlName]="ctx.item.control">
              }
            }
          </span>
          </td>
        </tr>
      </ng-container>
    </ng-template>
  `,
})
export class Demo {
  form = toForm([
    {
      type: FormElementType.Checkbox,
      label: 'Transparent Background',
      control: 'transparent',
    },
    {
      type: FormElementType.Color,
      label: 'Background color',
      control: 'color',
      condition: (data: { [x: string]: any; }) => !data['transparent']
    },
    {
      type: FormElementType.Range,
      label: 'Range?',
      control: 'range',
      value: 20
    }
  ]);
  protected readonly types = FormElementType;
}
