import { Component, input, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import type { FieldsetInput } from './simple-form';
import { XprFieldset } from './fieldset';
import { XprAutoForm } from './auto-form';

@Component({
  selector: 'xpr-fieldsets',
  standalone: true,
  imports: [XprFieldset, XprAutoForm],
  template: `
    @for (desc of descriptors(); track desc.legend; let i = $index) {
      <xpr-fieldset [legend]="desc.legend" [expand]="opened()===i" (expandChange)="expanded(i)">
        <xpr-auto-form [form]="form()" [descriptor]="desc.items"/>
      </xpr-fieldset>
    }
    <ng-content/>
  `
})
export class XprFieldsets {
  form = input.required<FormGroup>();
  descriptors = input.required<FieldsetInput[]>();
  opened = signal(0);

  expanded(idx: number) {
    this.opened.set(idx);
  }
}
