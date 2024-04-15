import { Component, computed, input, model } from '@angular/core';

@Component({
  selector: 'xpr-fieldset',
  standalone: true,
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
  legend = input.required<string>();
  expand = model<boolean>(true);
  collapsable = input<boolean>(true);
  protected icon = computed(() => this.expand() ? '▼' : '▶');

  protected toggle() {
    if (!this.collapsable()) return;
    this.expand.set(!this.expand());
  }
}
