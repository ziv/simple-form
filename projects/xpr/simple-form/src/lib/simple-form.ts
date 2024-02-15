import { FormBuilder, FormGroup } from '@angular/forms';

export enum FieldsetTypes {
  Range = 'range',
  Number = 'number',
  Checkbox = 'checkbox',
  Color = 'color',
  Text = 'text',
  Select = 'select',
  Email = 'email',
  Date = 'date',
  Time = 'time',
  Icons = 'icons',
  Font = 'font',
}

export interface BaseFieldsetItem {
  label: string;
  control: string;
  condition?: (value: Record<string, unknown>) => boolean;
}

export interface FieldsetRange extends BaseFieldsetItem {
  type: FieldsetTypes.Range;
  min: number;
  max: number;
  step?: number;
}

export interface FieldsetNumber extends BaseFieldsetItem {
  type: FieldsetTypes.Number;
  min?: number;
  max?: number;
}

export interface FieldsetCheckbox extends BaseFieldsetItem {
  type: FieldsetTypes.Checkbox;
}

export interface FieldsetColor extends BaseFieldsetItem {
  type: FieldsetTypes.Color;
}

export interface FieldsetText extends BaseFieldsetItem {
  type: FieldsetTypes.Text;
  placeholder?: string;
}

export interface FieldsetEmail extends BaseFieldsetItem {
  type: FieldsetTypes.Email;
}

export interface FieldsetDate extends BaseFieldsetItem {
  type: FieldsetTypes.Date;
}

export interface FieldsetTime extends BaseFieldsetItem {
  type: FieldsetTypes.Time;
}

export interface FieldsetSelect extends BaseFieldsetItem {
  type: FieldsetTypes.Select;
  options: {
    value: string | number | boolean | object;
    label: string;
  }[];
}

export interface FieldsetIcons extends BaseFieldsetItem {
  type: FieldsetTypes.Icons;
}

export interface FieldsetFont extends BaseFieldsetItem {
  type: FieldsetTypes.Font;
}

export type FieldsetItem =
  FieldsetFont
  | FieldsetIcons
  | FieldsetSelect
  | FieldsetText
  | FieldsetColor
  | FieldsetCheckbox
  | FieldsetRange
  | FieldsetNumber
  | FieldsetEmail
  | FieldsetDate
  | FieldsetTime;

export interface FieldsetSection {
  label?: string;
  items: FieldsetItem[];
}

export interface FieldsetInput {
  legend: string;
  group: string;
  sections: FieldsetSection[];
  defaultValue?: { [key: string]: unknown };
}

export const FieldsMap: Record<FieldsetTypes, unknown> = {
  [FieldsetTypes.Checkbox]: true,
  [FieldsetTypes.Range]: 0,
  [FieldsetTypes.Number]: 0,
  [FieldsetTypes.Text]: '',
  [FieldsetTypes.Email]: '',
  [FieldsetTypes.Date]: {},
  [FieldsetTypes.Time]: {},
  [FieldsetTypes.Select]: '',
  [FieldsetTypes.Color]: '#000000',
  // specials
  [FieldsetTypes.Font]: {},
  [FieldsetTypes.Icons]: [],
};

export function fieldset(input: FieldsetInput): FormGroup {
  const fb = new FormBuilder();
  const sub: Record<string, unknown> = {};
  for (const section of input.sections) {
    for (const item of section.items) {
      sub[item.control] = [FieldsMap[item.type]];
    }
  }
  const form = fb.group(sub);
  if (input.defaultValue) {
    form.patchValue(input.defaultValue);
  }
  return form;
}
