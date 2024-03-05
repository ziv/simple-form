import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { FieldsetItem, type FieldsetItemU, FieldsetTypes } from './simple-form';

@Component({
  selector: 'xpr-auto-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  template: `
    <ng-container [formGroup]="form()">
      @for (item of itr(); track item.control) {
        <label [ngClass]="'xpr type-'+item.type">
          <span>{{ item.label }}</span>
          @switch (item.type) {
            @case (types.Checkbox) {
              <!-- todo checkbox does not working when bound -->
              <input type="checkbox"
                     [formControlName]="item.control">
            }
            @case (types.Range) {
              <input type="range"
                     [formControlName]="item.control"
                     [min]="item.min"
                     [max]="item.max"
                     [step]="item.step">
            }
            @case (types.Select) {
              <select [formControlName]="item.control">
                @for (el of item.options; track el.label) {
                  <option [ngValue]="el.value">{{ el.label }}</option>
                }
              </select>
            }
            @default {
              <input [type]="item.type"
                     [formControlName]="item.control">
            }
          }
        </label>
      }
    </ng-container>
  `
})
export class XprAutoForm {
  protected readonly types = FieldsetTypes;
  form = input.required<FormGroup>();
  descriptor = input.required<FieldsetItem[]>();

  protected* itr(): Generator<FieldsetItemU> {
    for (const item of this.descriptor())
      if (item.condition ? item.condition(this.form().value) : true)
        yield item as FieldsetItemU;

  }
}
