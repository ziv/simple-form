import { Component, contentChild, input, TemplateRef, viewChild, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { JsonPipe, NgClass, NgComponentOutlet, NgTemplateOutlet } from '@angular/common';
import { FormElements, FormElementType, SimpleFormGroup } from '../to-form';

@Component({
  selector: 'xpr-custom-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, NgComponentOutlet, NgTemplateOutlet, JsonPipe],
  encapsulation: ViewEncapsulation.None,
  template: `
    @if (tpl()) {
      @for (item of itr(); track item.control) {
        <ng-container *ngTemplateOutlet="tpl();context: {$implicit: {item, group: form()}}"/>
      }
    }
  `
})
export class XprCustomForm {
  protected readonly types = FormElementType;
  tpl = input.required<TemplateRef<any>>();
  form = input.required<SimpleFormGroup>();

  protected* itr(): Generator<FormElements> {
    for (const c of Object.values(this.form().controls)) {
      yield c.desc as FormElements;
    }
  }

  constructor() {
    // @ts-ignore
    window['ziv'] = this;
  }
}
