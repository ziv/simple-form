import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { fieldset, FieldsetInput, FieldsetItem, FieldsetTypes } from './simple-form';
import { Subscription } from 'rxjs';

@Component({
  selector: 'xpr-fieldset',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  template: `
    @if (form && descriptor) {
      <fieldset [formGroup]="form">
        <legend (click)="expand=!expand;notify()">
          <span>{{ icon() }}</span>
          {{ descriptor.legend }}
        </legend>
        @if (expand) {
          @for (section of descriptor.sections; track section.label) {
            @if (section.label) {
              <h3>{{ section.label }}</h3>
            }
            <section>
              @for (item of section.items; track item.control) {
                @if (displayItem(item)) {
                  <label [ngClass]="'type-'+item.type">
                    @switch (item.type) {
                      @case (types.Checkbox) {
                        <span></span>
                        <var><input type="checkbox" [formControlName]="item.control"></var>
                        <span>{{ item.label }}</span>
                      }
                      @case (types.Range) {
                        <span>{{ item.label }}</span>
                        <input type="range" [formControlName]="item.control"
                               [max]="item.max" [min]="item.min" [step]="item.step ?? 1">
                      }
                      @case (types.Number) {
                        <span>{{ item.label }}</span>
                        <input type="number" [formControlName]="item.control"
                               [max]="item.max ?? null" [min]="item.min ?? null">
                      }
                      @case (types.Color) {
                        <span></span>
                        <var><input type="color" [formControlName]="item.control"></var>
                        <span>{{ item.label }}</span>
                      }
                      @case (types.Text) {
                        <span>{{ item.label }}</span>
                        <input type="text" [formControlName]="item.control">
                      }
                      @case (types.Email) {
                        <span>{{ item.label }}</span>
                        <input type="email" [formControlName]="item.control">
                      }
                      @case (types.Date) {
                        <span>{{ item.label }}</span>
                        <input type="date" [formControlName]="item.control">
                      }
                      @case (types.Select) {
                        <span>{{ item.label }}</span>
                        <select [formControlName]="item.control">
                          @for (el of item.options; track el.label) {
                            <option [ngValue]="el.value">{{ el.label }}</option>
                          }
                        </select>
                      }
                    }
                  </label>
                }
              }
            </section>
          }
        }
      </fieldset>
    }
  `
})
export class XprFieldset implements OnDestroy, AfterViewInit {
  protected types = FieldsetTypes;
  protected expand = false;
  protected sub?: Subscription;
  protected descriptor?: FieldsetInput;
  protected form?: FormGroup;

  @Input() set desc(desc: FieldsetInput) {
    if (!desc) return;
    this.form = fieldset(desc);
    this.descriptor = desc;
    this.sub?.unsubscribe();
    this.sub = this.form.valueChanges.subscribe(value => this.changed.emit(value));
  }

  @Output() opened = new EventEmitter<XprFieldset>();
  @Output() changed = new EventEmitter();

  close() {
    this.expand = false;
  }

  open() {
    this.expand = true;
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  ngAfterViewInit() {
    // create a microtask to update value
    this.form && Promise.resolve().then(() => this.changed.emit(this.form?.value));
  }

  protected icon() {
    return this.expand ? '▼' : '▶';
  }

  protected notify() {
    if (this.expand) this.opened.emit(this);
  }

  protected displayItem(item: FieldsetItem) {
    return item.condition ? item.condition(this.form?.value) : true;
  }
}
