import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiCardProductStoreComponent } from './ui-card-product-store.component';

describe('UiCardProductStoreComponent', () => {
  let component: UiCardProductStoreComponent;
  let fixture: ComponentFixture<UiCardProductStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiCardProductStoreComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiCardProductStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
