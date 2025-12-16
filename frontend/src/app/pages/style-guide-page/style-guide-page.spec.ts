import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StyleGuidePage } from './style-guide-page';

describe('StyleGuidePage', () => {
  let component: StyleGuidePage;
  let fixture: ComponentFixture<StyleGuidePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StyleGuidePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StyleGuidePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
