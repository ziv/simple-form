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
import { FieldsetInput } from './simple-form';
import { XprFieldset } from './fieldset';
import { merge, Subscription } from 'rxjs';

@Component({
  selector: 'xpr-fieldsets',
  standalone: true,
  imports: [XprFieldset],
  template: `
    @for (desc of descriptors; track desc.group) {
      <xpr-fieldset [desc]="desc" (changed)="update(desc.group, $event)"></xpr-fieldset>
    }
  `
})
export class XprFieldsets implements AfterViewInit, OnDestroy {
  protected sub?: Subscription;
  protected data: { [key: string]: unknown } = {};
  @ViewChildren(XprFieldset) protected fieldSets!: QueryList<XprFieldset>;

  @Input() descriptors: FieldsetInput[] = [];
  @Input() autoClose = true;
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
}
