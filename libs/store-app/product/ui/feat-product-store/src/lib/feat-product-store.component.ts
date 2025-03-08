import { ProductStoreMid } from '@angular-monorepo/product-store.mid';
import { ProductModel } from '@angular-monorepo/product-store.model';
import { UiCardProductStoreComponent } from '@angular-monorepo/ui-card-product-store';
import { UiNewProductStoreComponent } from '@angular-monorepo/ui-new-product-store';
import { UiSearchFilterComponent } from '@angular-monorepo/ui-search-filter';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';

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

  //  old code without store for show product list

  // searchFilter = signal<string>('');
  // public data$: Observable<ProductModel[]> = this._mid.getProductList$();
  // public ProductList: WritableSignal<ProductModel[]> = signal([]);
  // public filteredList = computed(() => {
  //   return this.ProductList().filter((item) =>
  //     item.title.includes(this.searchFilter())
  //   );
  // });

  //  old code without store for show product list

  ngOnInit() {
    this.getListData();
  }

  // get store date from mid and use to this component
  store$() {
    return this._mid.store;
  }

  // get query data and set for get product list
  getListData() {
    const query = this._mid.store_query$();
    this._mid.getProductList$(query);

    //  old code without store for show product list

    // this.data$.subscribe((res: ProductModel[]) => {
    //   this.ProductList.set([...res]);
    // });

    //  old code without store for show product list
  }

  // get search box data and sent to store for search and change state
  onSearchFilter(event: string) {
    //  old code without store for show product list
    // this.searchFilter.set(event);
    //  old code without store for show product list

    // Update query filter
    this._mid.updateQuery(event);

    // call get list
    this.getListData();
  }

  // open dialog for add or edit product
  openDialog(id: number): void {
    const dialogRef = this.dialog.open(UiNewProductStoreComponent, {
      minWidth: '50dvw',
      width: '50dvw',
      height: '50dvh',
      data: id === 0 ? this.onNew() : this.onEdit(id),
    });

    dialogRef.afterClosed().subscribe((result: ProductModel) => {
      if (result !== undefined && result !== null) {
        // sent finall data recived from dialog to change state and sent to api
        if (id === 0) {
          this._mid.insertProduct$(result);
        } else {
          this._mid.updateProduct$(result);
        }

        // call new list
        this.getListData();

        // set empty for finall url file
        this._mid.fileUrlFinall.set('');
      }
    });
  }

  // add product to cart
  addToCart(event: number) {
    console.log(event);
  }

  // return dialog data and sent to dialog for add new product
  onNew() {
    return {
      // get empty form from utility service
      Form: this._mid.getProductForm(),
      // get function for uploade file from utility service
      handleFile: this._mid.uploadImage.bind(this._mid),
      // get file Url Finall uploaded file from utility service
      fileUrlFinall: this._mid.fileUrlFinall,
    };
  }

  // return dialog data and sent to dialog for add edit product
  onEdit(id: number) {
    // find product from all list
    const findProduct = this.store$()
      .products()
      .find((item) => item.id === id);

    if (findProduct) {
      // set product image to file Url Finall
      this._mid.fileUrlFinall.set(findProduct.imageUrl);

      return {
        // get empty form from utility service
        Form: this._mid.getProductForm(),
        // get function for uploade file from utility service
        handleFile: this._mid.uploadImage.bind(this._mid),
        // get file Url Finall uploaded file from utility service
        fileUrlFinall: this._mid.fileUrlFinall,
        // sent product data to dialog and patch to form
        oldData: findProduct,
        // change edit mode
        isEdit: true,
      };
    } else {
      return;
    }
  }

  // remove product
  onRemove(id: number) {
    this._mid.removeProduct$(id);
  }
}
