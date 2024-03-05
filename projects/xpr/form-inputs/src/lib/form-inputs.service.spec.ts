import { TestBed } from '@angular/core/testing';

import { FormInputsService } from './form-inputs.service';

describe('FormInputsService', () => {
  let service: FormInputsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormInputsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
