import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductStoreMid } from '@angular-monorepo/product-store.mid';
import { UiNewProductStoreComponent } from '@angular-monorepo/ui-new-product-store';

@Component({
  selector: 'lib-feat-product-store',
  imports: [CommonModule, UiNewProductStoreComponent],
  templateUrl: './feat-product-store.component.html',
  styleUrl: './feat-product-store.component.scss',
})
export class FeatProductStoreComponent {
  private _mid: ProductStoreMid = inject(ProductStoreMid);
}
