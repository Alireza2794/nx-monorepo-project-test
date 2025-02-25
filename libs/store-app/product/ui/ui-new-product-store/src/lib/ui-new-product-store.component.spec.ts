import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiNewProductStoreComponent } from './ui-new-product-store.component';

describe('UiNewProductStoreComponent', () => {
  let component: UiNewProductStoreComponent;
  let fixture: ComponentFixture<UiNewProductStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiNewProductStoreComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiNewProductStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
