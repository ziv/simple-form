import { FormElement, FormElementType } from './simple-form';
import { FormBuilder } from '@angular/forms';

export const FieldsMap: Record<string, unknown> = {
  [FormElementType.Checkbox]: true,
  [FormElementType.Range]: 0,
  [FormElementType.Number]: 0,
  [FormElementType.Text]: '',
  [FormElementType.Email]: '',
  [FormElementType.Date]: {},
  [FormElementType.Time]: {},
  [FormElementType.Select]: '',
  [FormElementType.Color]: '#FF00FF'
};

export function toForm(items: FormElement[]) {
  const group: { [key: string]: unknown } = {};
  for (const {control, type, value} of items) {
    group[control] = [undefined !== value ? value : FieldsMap[type]];
  }
  return new FormBuilder().group(group);
}
