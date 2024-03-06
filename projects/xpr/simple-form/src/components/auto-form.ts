import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgClass, NgComponentOutlet } from '@angular/common';
import { FormElement, type FormElements, FormElementType } from '../lib/simple-form';

export interface XprAutoFormInput {
  form: FormGroup;
  items: FormElement[];
}

@Component({
  selector: 'xpr-auto-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, NgComponentOutlet],
  template: `
    <ng-container [formGroup]="form().form">
      @for (item of itr(); track item.control) {
        <label [ngClass]="'xpr-label xpr-type-'+item.type">
          <span class="xpr-label">{{ item.label }}</span>
          <span class="xpr-input">
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
                @for (el of item.options; track el.value) {
                  <option [ngValue]="el.value">{{ el.label }}</option>
                }
              </select>
              }
              @case (types.Custom) {
                <ng-container *ngComponentOutlet="item.cmp;inputs:{form: form().form}"/>
              }
              @default {
                <input [type]="item.type"
                       [formControlName]="item.control">
              }
            }
          </span>
        </label>
      }
    </ng-container>
  `
})
export class XprAutoForm {
  protected readonly types = FormElementType;
  form = input.required<XprAutoFormInput>();

  protected* itr(): Generator<FormElements> {
    const {form, items} = this.form();
    for (const item of items)
      if (item.condition ? item.condition(form.value) : true)
        yield item as FormElements;

  }
}
