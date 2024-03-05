import { FormInput } from './form-input';

export abstract class FormSimpleInput<T = number | string | boolean> extends FormInput<T> {
  protected value?: T;
  protected disabled: boolean = false;

  writeValue(value: T) {
    this.value = value;
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }
}
