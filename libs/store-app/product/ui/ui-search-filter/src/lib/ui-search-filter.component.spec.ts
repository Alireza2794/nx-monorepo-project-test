import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiSearchFilterComponent } from './ui-search-filter.component';

describe('UiSearchFilterComponent', () => {
  let component: UiSearchFilterComponent;
  let fixture: ComponentFixture<UiSearchFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiSearchFilterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiSearchFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
