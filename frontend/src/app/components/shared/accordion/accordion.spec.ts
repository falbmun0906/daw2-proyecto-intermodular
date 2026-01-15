import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Accordion } from './accordion';

describe('Accordion', () => {
  let component: Accordion;
  let fixture: ComponentFixture<Accordion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Accordion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Accordion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle item expansion', () => {
    component.items = [
      { id: '1', title: 'Item 1', content: 'Content 1', isExpanded: false }
    ];

    component.toggle('1');

    expect(component.items[0].isExpanded).toBe(true);
  });

  it('should collapse other items when allowMultiple is false', () => {
    component.items = [
      { id: '1', title: 'Item 1', content: 'Content 1', isExpanded: true },
      { id: '2', title: 'Item 2', content: 'Content 2', isExpanded: false }
    ];
    component.allowMultiple = false;

    component.toggle('2');

    expect(component.items[0].isExpanded).toBe(false);
    expect(component.items[1].isExpanded).toBe(true);
  });

  it('should not toggle disabled items', () => {
    component.items = [
      { id: '1', title: 'Item 1', content: 'Content 1', isExpanded: false, disabled: true }
    ];

    component.toggle('1');

    expect(component.items[0].isExpanded).toBe(false);
  });
});

