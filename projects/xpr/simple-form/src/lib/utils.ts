import { FieldsetItem, FieldsMap } from './simple-form';
import { FormBuilder } from '@angular/forms';

export function autoForm(items: FieldsetItem[]) {
  const group: { [key: string]: unknown } = {};
  for (const {control, type, value} of items) {
    group[control] = [undefined !== value ? value : FieldsMap[type]];
  }
  return new FormBuilder().group(group);
}
