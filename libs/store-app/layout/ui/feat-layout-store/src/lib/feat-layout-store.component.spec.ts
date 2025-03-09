import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatLayoutStoreComponent } from './feat-layout-store.component';

describe('FeatLayoutStoreComponent', () => {
  let component: FeatLayoutStoreComponent;
  let fixture: ComponentFixture<FeatLayoutStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatLayoutStoreComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatLayoutStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
