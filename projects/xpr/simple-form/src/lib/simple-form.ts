import { Type } from '@angular/core';

export enum FormElementType {
  Range = 'range',
  Number = 'number',
  Checkbox = 'checkbox',
  Color = 'color',
  Text = 'text',
  Select = 'select',
  Email = 'email',
  Date = 'date',
  Time = 'time',
  Custom = 'custom'
}

export interface FormElementItem<T = unknown> {
  type: FormElementType;
  label: string;
  control: string;
  value?: T;
  condition?: (value: Record<string, unknown>) => boolean;
}


export interface FormElementRange extends FormElementItem {
  min: number;
  max: number;
  step?: number;
}

export interface FormElementNumber extends FormElementItem {
  min?: number;
  max?: number;
}

export interface FormElementCheckbox extends FormElementItem {
}

export interface FormElementColor extends FormElementItem {
}

export interface FormElementText extends FormElementItem {
  placeholder?: string;
}

export interface FormElementEmail extends FormElementItem {
}

export interface FormElementDate extends FormElementItem {
}

export interface FormElementTime extends FormElementItem {
}

export interface FormElementCustom extends FormElementItem {
  cmp: Type<any>; // provide specific input
}

export interface FormElementSelect extends FormElementItem {
  options: {
    value: string | number | boolean | object;
    label: string;
  }[];
}

export type FormElements =
  & FormElementSelect
  & FormElementText
  & FormElementColor
  & FormElementCheckbox
  & FormElementRange
  & FormElementNumber
  & FormElementEmail
  & FormElementDate
  & FormElementTime
  & FormElementCustom;

export type FormElement =
  | FormElementSelect
  | FormElementText
  | FormElementColor
  | FormElementCheckbox
  | FormElementRange
  | FormElementNumber
  | FormElementEmail
  | FormElementDate
  | FormElementTime
  | FormElementCustom;

