import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type NitIcon = { display: boolean, backgroundColor: string; id: string; };

/**
 * Example to NG_VALUE_ACCESSOR with no use of Angular 2-way-binding in the template
 */
@Component({
  selector: 'nit-icons-field',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: IconsField,
    }
  ],
  template: `
    @for (icon of icons; track icon.id) {
      <section>
        <span>{{ icon.id }}</span>
        <label>
          <input type="checkbox" [checked]="icon.display" (change)="update($event, icon.id)" [disabled]="disabled">
          <span>Display</span>
        </label>
        <label>
          <input type="color" [value]="icon.backgroundColor" (change)="update($event, icon.id)" [disabled]="disabled">
          Color
        </label>
      </section>
    }
  `
})
export class IconsField implements ControlValueAccessor {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange = (icons: NitIcon[]) => {
  };
  onTouched = () => {
  };

  disabled = false;
  touched = false;

  @Input() icons: NitIcon[] = [];

  update(e: Event, id: string) {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
    const el = e.target as HTMLInputElement;
    this.icons = this.icons.map(icon => {
      if (id === icon.id && el.type === 'color') return {...icon, backgroundColor: el.value};
      if (id === icon.id && el.type === 'checkbox') return {...icon, display: el.checked};
      return icon;
    });
    this.onChange(this.icons);
  }

  registerOnChange(fn: (icons: NitIcon[]) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  writeValue(icons: NitIcon[]): void {
    if (icons) {
      this.icons = icons;
    }
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }
}
