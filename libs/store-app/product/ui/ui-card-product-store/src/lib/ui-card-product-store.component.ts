import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ProductModel } from '@angular-monorepo/product-store.model';

@Component({
  selector: 'lib-ui-card-product-store',
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './ui-card-product-store.component.html',
  styleUrl: './ui-card-product-store.component.scss',
})
export class UiCardProductStoreComponent {
  @Input() Product: ProductModel | any;
  @Output() addToCart: EventEmitter<ProductModel> = new EventEmitter();
  @Output() edit: EventEmitter<number> = new EventEmitter();
  @Output() remove: EventEmitter<number> = new EventEmitter();

  AddToCart(product: ProductModel) {
    this.addToCart.emit(product);
  }

  Edit(id: number) {
    this.edit.emit(id);
  }

  Remove(id: number) {
    this.remove.emit(id);
  }
}
