import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltip } from '@angular/material/tooltip';
@Component({
  selector: 'lib-ui-header-store',
  imports: [
    CommonModule,
    MatToolbarModule,
    MatBadgeModule,
    MatButtonModule,
    MatTooltip,
  ],
  templateUrl: './ui-header-store.component.html',
  styleUrl: './ui-header-store.component.scss',
})
export class UiHeaderStoreComponent {
  @Input() orderCount: number | undefined = 0;
  @Input() totalAmount: number | undefined = 0;
  @Output() clickCart: EventEmitter<boolean> = new EventEmitter();

  onClick() {
    this.clickCart.emit(true);
  }
}
