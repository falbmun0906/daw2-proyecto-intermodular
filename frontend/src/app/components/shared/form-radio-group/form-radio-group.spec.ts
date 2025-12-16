import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRadioGroup } from './form-radio-group';

describe('FormRadioGroup', () => {
  let component: FormRadioGroup;
  let fixture: ComponentFixture<FormRadioGroup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormRadioGroup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormRadioGroup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
