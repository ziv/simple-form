import { ControlValueAccessor } from '@angular/forms';

export abstract class FormInput<T> implements ControlValueAccessor {

  abstract writeValue(value: T): void;

  abstract setDisabledState(disabled: boolean): void;

  onTouched = () => {
  };

  onChange = (value: T) => {
  };


  registerOnChange(fn: (value: T) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
