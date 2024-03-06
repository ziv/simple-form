import { Component, input, model } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'xpr-fieldset',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <fieldset class="xpr-fieldset">
      <legend (click)="toggle()" class="xpr-legend">
        <span class="xpr-icon">{{ icon() }}</span>
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
