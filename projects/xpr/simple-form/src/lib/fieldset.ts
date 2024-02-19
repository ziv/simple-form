import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Subscription } from 'rxjs';
import { fieldset, FieldsetInput, FieldsetItemU, FieldsetSection, FieldsetTypes } from './simple-form';

@Component({
  selector: 'xpr-fieldset',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  template: `
    @if (form && desc) {
      <fieldset [formGroup]="form" class="xpr">
        <legend (click)="toggle()" class="xpr">
          <span>{{ icon() }}</span>
          {{ desc.legend }}
        </legend>
        @if (expand) {
          @for (outer of desc.items; track $index) {
            @if (outer.legend) {
              <h3 class="xpr">{{ outer.legend }}</h3>
            }
            <section class="xpr">
              @for (item of itr(outer); track $index) {
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
                      <input [type]="item.control"
                             [formControlName]="item.control">
                    }
                  }
                </label>
              }
            </section>
          }
        }
      </fieldset>
    }
  `
})
export class XprFieldset implements OnDestroy, AfterViewInit {
  protected readonly types = FieldsetTypes;
  protected expand = false;
  protected sub?: Subscription;
  protected desc?: FieldsetInput;
  protected form?: FormGroup;

  @Input() collapsable = true;

  @Input() set descriptor(input: FieldsetInput) {
    if (!input) return;
    this.form = fieldset(input);
    this.desc = input;
    this.sub?.unsubscribe();
    this.sub = this.form.valueChanges.subscribe(value => this.changed.emit(value));
  }

  @Output() opened = new EventEmitter<XprFieldset>();
  @Output() changed = new EventEmitter();

  close() {
    if (this.collapsable) this.expand = false;
  }

  open() {
    if (this.collapsable) this.expand = true;
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  ngAfterViewInit() {
    // create a microtask to update value
    this.form && Promise.resolve().then(() => this.changed.emit(this.form?.value));
  }

  * itr(section: FieldsetSection): Generator<FieldsetItemU> {
    for (const item of section.items)
      if (item.condition ? item.condition(this.form?.value) : true)
        yield item as FieldsetItemU;

  }

  protected icon() {
    return this.expand ? '▼' : '▶';
  }

  protected toggle() {
    if (!this.collapsable) return;
    this.expand = !this.expand;
    if (this.expand) this.opened.emit(this);
  }
}
