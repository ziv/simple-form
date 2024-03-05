import { Component, input, model } from '@angular/core';
import { NgClass } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { XprAutoForm } from './auto-form';

@Component({
  selector: 'xpr-fieldset',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, XprAutoForm],
  template: `
    <fieldset class="xpr">
      <legend (click)="toggle()" class="xpr">
        <span>{{ icon() }}</span>
        {{ legend() }}
      </legend>
      @if (expand()) {
        <ng-content/>
      }
    </fieldset>
  `
})
export class XprFieldset {
  expand = model<boolean>(true);
  legend = input.required<string>();
  collapsable = input<boolean>(true);

  protected icon() {
    return this.expand() ? '▼' : '▶';
  }

  protected toggle() {
    if (!this.collapsable()) return;
    this.expand.set(!this.expand());
  }
}
