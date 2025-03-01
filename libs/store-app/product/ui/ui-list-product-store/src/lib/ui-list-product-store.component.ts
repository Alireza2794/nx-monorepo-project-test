import { UiCardProductStoreComponent } from '@angular-monorepo/ui-card-product-store';
import { CommonModule } from '@angular/common';
import {
  Component
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'lib-ui-list-product-store',
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    UiCardProductStoreComponent,
  ],
  templateUrl: './ui-list-product-store.component.html',
  styleUrl: './ui-list-product-store.component.scss',
})
export class UiListProductStoreComponent {

}
