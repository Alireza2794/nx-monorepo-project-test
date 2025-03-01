import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiListProductStoreComponent } from './ui-list-product-store.component';

describe('UiListProductStoreComponent', () => {
  let component: UiListProductStoreComponent;
  let fixture: ComponentFixture<UiListProductStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiListProductStoreComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiListProductStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
