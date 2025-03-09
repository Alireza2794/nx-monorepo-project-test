import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiHeaderStoreComponent } from './ui-header-store.component';

describe('UiHeaderStoreComponent', () => {
  let component: UiHeaderStoreComponent;
  let fixture: ComponentFixture<UiHeaderStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiHeaderStoreComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiHeaderStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
