import { FormBuilder } from '@angular/forms';

/*

  +-- FieldsetInputNew -------------------+
  | legend                                |
  +---------------------------------------+
  | +--FieldsetSectionNew[0] -----------+ |
  | | legend                            | |
  | +-----------------------------------+ |
  | | item[0]                           | |
  | | ...                               | |
  | +-----------------------------------+ |
  | ...                                   |
  +---------------------------------------+

 */

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
  type: string;
  label: string;
  control: string;
  condition?: (value: Record<string, unknown>) => boolean;
  value?: unknown;
}

export interface FieldsetRange extends BaseFieldsetItem {
  min: number;
  max: number;
  step?: number;
}

export interface FieldsetNumber extends BaseFieldsetItem {
  min?: number;
  max?: number;
}

export interface FieldsetCheckbox extends BaseFieldsetItem {
}

export interface FieldsetColor extends BaseFieldsetItem {
}

export interface FieldsetText extends BaseFieldsetItem {
  placeholder?: string;
}

export interface FieldsetEmail extends BaseFieldsetItem {
}

export interface FieldsetDate extends BaseFieldsetItem {
}

export interface FieldsetTime extends BaseFieldsetItem {
}

export interface FieldsetSelect extends BaseFieldsetItem {
  options: {
    value: string | number | boolean | object;
    label: string;
  }[];
}

export interface FieldsetIcons extends BaseFieldsetItem {
}

export interface FieldsetFont extends BaseFieldsetItem {
}

export type FieldsetItemU =
  FieldsetFont
  & FieldsetIcons
  & FieldsetSelect
  & FieldsetText
  & FieldsetColor
  & FieldsetCheckbox
  & FieldsetRange
  & FieldsetNumber
  & FieldsetEmail
  & FieldsetDate
  & FieldsetTime;

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

export type FieldsetContainer<T> = { items: T[]; legend?: string; };
export type FieldsetSection = FieldsetContainer<FieldsetItem>;
export type FieldsetInput = FieldsetContainer<FieldsetSection>;

const FieldsMap: Record<string, unknown> = {
  [FieldsetTypes.Checkbox]: true,
  [FieldsetTypes.Range]: 0,
  [FieldsetTypes.Number]: 0,
  [FieldsetTypes.Text]: '',
  [FieldsetTypes.Email]: '',
  [FieldsetTypes.Date]: {},
  [FieldsetTypes.Time]: {},
  [FieldsetTypes.Select]: '',
  [FieldsetTypes.Color]: '#FF00FF',
  // specials
  [FieldsetTypes.Font]: {},
  [FieldsetTypes.Icons]: [],
};

export function fieldset(i: FieldsetInput) {
  const group: Record<string, unknown> = {};
  for (const sub of i.items) {
    for (const {control, type, value} of sub.items) {
      group[control] = [value ?? FieldsMap[type]];
    }
  }
  return new FormBuilder().group(group);
}
