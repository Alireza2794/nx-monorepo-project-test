import { ProductModel } from '@angular-monorepo/product-store.model';
import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'lib-ui-card-product-store',
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './ui-card-product-store.component.html',
  styleUrl: './ui-card-product-store.component.scss',
  animations: [
    trigger('enterLeaveAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        animate('500ms ease-in', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'scale(1)' }),
        animate(
          '500ms ease-in',
          style({ opacity: 0, transform: 'scale(0.8)' })
        ),
      ]),
    ]),
  ],
})
export class UiCardProductStoreComponent {
  @Input() Product: ProductModel | any;
  @Output() addToCart: EventEmitter<ProductModel> = new EventEmitter();
  @Output() edit: EventEmitter<number> = new EventEmitter();
  @Output() remove: EventEmitter<number> = new EventEmitter();
  @Output() removeFromCart: EventEmitter<ProductModel> = new EventEmitter();

  @HostBinding('@enterLeaveAnimation') animate = true;

  AddToCart(product: ProductModel) {
    this.addToCart.emit(product);
  }

  Edit(id: number) {
    this.edit.emit(id);
  }

  Remove(id: number) {
    this.remove.emit(id);
  }

  RemoveFromCart(product: ProductModel) {
    this.removeFromCart.emit(product);
  }
}
