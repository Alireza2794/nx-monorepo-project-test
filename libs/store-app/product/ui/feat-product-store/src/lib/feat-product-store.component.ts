import { ProductStoreMid } from '@angular-monorepo/product-store.mid';
import { ProductModel } from '@angular-monorepo/product-store.model';
import { UiCardProductStoreComponent } from '@angular-monorepo/ui-card-product-store';
import { UiNewProductStoreComponent } from '@angular-monorepo/ui-new-product-store';
import { UiSearchFilterComponent } from '@angular-monorepo/ui-search-filter';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatProductStoreComponent implements OnInit {
  private _mid: ProductStoreMid = inject(ProductStoreMid);
  readonly dialog = inject(MatDialog);

  // searchFilter = signal<string>('');

  // public data$: Observable<ProductModel[]> = this._mid.getProductList$();
  // public data$: Observable<ProductModel[]> ;

  // public ProductList: WritableSignal<ProductModel[]> = signal([]);

  // public filteredList = computed(() => {
  //   return this.ProductList().filter((item) =>
  //     item.title.includes(this.searchFilter())
  //   );
  // });

  ngOnInit() {
    this.getListData();
  }

  store$() {
    return this._mid.store;
  }

  getListData() {
    const query = this._mid.store_query$();
    this._mid.getProductList$(query);

    // this.data$.subscribe((res: ProductModel[]) => {
    //   this.ProductList.set([...res]);
    // });
  }

  onSearchFilter(event: string) {
    // this.searchFilter.set(event);
    this._mid.updateQuery(event);
    this.getListData();
  }

  openDialog(id: number, type: 'new' | 'edit'): void {
    const dialogRef = this.dialog.open(UiNewProductStoreComponent, {
      minWidth: '50dvw',
      width: '50dvw',
      height: '50dvh',
      data: type === 'new' ? this.onNew() : this.onEdit(id),
    });

    dialogRef.afterClosed().subscribe((result: ProductModel) => {
      if (result !== undefined && result !== null) {
        if (type === 'new') {
          this._mid.insertProduct$(result);
        } else {
          this._mid.updateProduct$(result);
        }

        this.getListData();
        this._mid.fileUrlFinall.set('');
      }
    });
  }

  addToCart(event: number) {
    console.log(event);
  }

  onNew() {
    return {
      Form: this._mid.getProductForm(),
      handleFile: this._mid.uploadImage.bind(this._mid),
      fileUrlFinall: this._mid.fileUrlFinall,
    };
  }

  onEdit(id: number) {
    const findProduct = this.store$()
      .products()
      .find((item) => item.id === id);

    if (findProduct) {
      this._mid.fileUrlFinall.set(findProduct.imageUrl);

      return {
        Form: this._mid.getProductForm(),
        handleFile: this._mid.uploadImage.bind(this._mid),
        fileUrlFinall: this._mid.fileUrlFinall,
        oldData: findProduct,
        isEdit: true,
      };
    } else {
      return;
    }
  }

  onRemove(id: number) {
    this._mid.removeProduct$(id);
  }
}
