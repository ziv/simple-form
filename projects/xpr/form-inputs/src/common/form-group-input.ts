import { ControlValueAccessor, FormGroup } from '@angular/forms';
import { Directive, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Directive()
export abstract class FormGroupInput<T extends { [key: string]: any }> implements ControlValueAccessor, OnDestroy {
  abstract form: FormGroup;
  protected sub = new Subscription();

  writeValue(value: T) {
    this.form.setValue(value, {emitEvent: false});
  }

  onTouched = () => {
  };

  setDisabledState(disabled: boolean) {
    disabled ? this.form.disable() : this.form.enable();
  }

  registerOnChange(fn: (value: any) => void) {
    this.sub.add(this.form.valueChanges.subscribe(fn));
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
