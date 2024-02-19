import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  QueryList,
  ViewChildren
} from '@angular/core';
import { merge, Subscription } from 'rxjs';
import { XprFieldset } from './fieldset';
import type { FieldsetInput } from './simple-form';

@Component({
  selector: 'xpr-fieldsets',
  standalone: true,
  imports: [XprFieldset],
  template: `
        @for (desc of desc; track $index) {
          <xpr-fieldset [descriptor]="desc[1]" (changed)="update(desc[0], $event)"></xpr-fieldset>
        }
  `
})
export class XprFieldsets implements AfterViewInit, OnDestroy {
  protected sub?: Subscription;
  protected data: { [key: string]: unknown } = {};
  @ViewChildren(XprFieldset) protected fieldSets!: QueryList<XprFieldset>;

  @Input() autoClose = true;
  @Input() descriptors?: Record<string, FieldsetInput>;
  @Output() changed = new EventEmitter();

  update(group: string, data: unknown,) {
    this.data[group] = data;
    this.changed.emit(this.data);
  }

  ngAfterViewInit() {
    if (!this.autoClose) return;
    this.sub?.unsubscribe();
    this.sub = merge(...this.fieldSets.map(f => f.opened)).subscribe(field => {
      for (const f of this.fieldSets) if (f !== field) f.close();
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  protected get desc() {
    return this.descriptors ? Object.entries(this.descriptors) : [];
  }
}
