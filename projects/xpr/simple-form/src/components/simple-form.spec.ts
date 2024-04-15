import { ComponentFixture, TestBed } from '@angular/core/testing';
import { XprSimpleForm } from './simple-form';
import { FormElement, FormElementType, toForm } from '../to-form';
import { By } from '@angular/platform-browser';

const form: FormElement[] = [
  {
    type: FormElementType.Checkbox,
    label: 'a',
    control: 'a',
  },
  {
    type: FormElementType.Color,
    label: 'b',
    control: 'b',
  },
  {
    type: FormElementType.Range,
    label: 'c',
    control: 'c',
    value: 20
  }
];
describe('simple-form', () => {
  let fixture: ComponentFixture<XprSimpleForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({imports: [XprSimpleForm]}).compileComponents();
    fixture = TestBed.createComponent(XprSimpleForm);
    // fixture.componentInstance.form = input(toForm(form));
    fixture.componentRef.setInput('form', toForm(form));
    fixture.detectChanges();
  });

  it('should render the input form', () => {
    expect(fixture.debugElement.queryAll(By.css('label')).length).toBe(3);
  });
});
