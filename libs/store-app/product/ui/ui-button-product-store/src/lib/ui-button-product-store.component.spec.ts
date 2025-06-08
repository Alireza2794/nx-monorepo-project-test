import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiButtonProductStoreComponent } from './ui-button-product-store.component';

describe('UiButtonProductStoreComponent', () => {
  let component: UiButtonProductStoreComponent;
  let fixture: ComponentFixture<UiButtonProductStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiButtonProductStoreComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiButtonProductStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
