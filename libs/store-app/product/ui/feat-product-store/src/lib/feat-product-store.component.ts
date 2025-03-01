import { ProductStoreMid } from '@angular-monorepo/product-store.mid';
import { ProductModel } from '@angular-monorepo/product-store.model';
import { UiCardProductStoreComponent } from '@angular-monorepo/ui-card-product-store';
import { UiNewProductStoreComponent } from '@angular-monorepo/ui-new-product-store';
import { UiSearchFilterComponent } from '@angular-monorepo/ui-search-filter';
import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Observable } from 'rxjs';

@Component({
  selector: 'lib-feat-product-store',
  imports: [
    CommonModule,
    MatToolbarModule,
    UiCardProductStoreComponent,
    UiSearchFilterComponent,
  ],
  templateUrl: './feat-product-store.component.html',
  styleUrl: './feat-product-store.component.scss',
})
export class FeatProductStoreComponent implements OnInit {
  private _mid: ProductStoreMid = inject(ProductStoreMid);
  readonly dialog = inject(MatDialog);

  searchFilter = signal<string>('');

  public data$: Observable<ProductModel[]> = this._mid.getProductList$();

  public ProductList: WritableSignal<ProductModel[]> = signal([]);

  public filteredList = computed(() => {
    return this.filterData();
  });

  constructor() {
    effect(() => {
      this.filterData();
    });
  }

  ngOnInit() {
    this.getListData();
  }

  getListData() {
    this.data$.subscribe((res: ProductModel[]) => {
      this.ProductList.set(res);
    });
  }

  filterData() {
    return this.ProductList().filter((item) =>
      item.title.includes(this.searchFilter())
    );
  }

  onSearchFilter(event: string) {
    this.searchFilter.set(event);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(UiNewProductStoreComponent, {
      minWidth: '50dvw',
      width: '50dvw',
      height: '50dvh',
    });

    dialogRef.afterClosed().subscribe((result: ProductModel) => {
      if (result !== undefined && result !== null) {
        this._mid.insertProduct$(result);
        this.getListData();
      }
    });
  }

  addToCart(event: number) {
    console.log(event);
  }
}
