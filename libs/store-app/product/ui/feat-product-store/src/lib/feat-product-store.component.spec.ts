import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatProductStoreComponent } from './feat-product-store.component';

describe('FeatProductStoreComponent', () => {
  let component: FeatProductStoreComponent;
  let fixture: ComponentFixture<FeatProductStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatProductStoreComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatProductStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
