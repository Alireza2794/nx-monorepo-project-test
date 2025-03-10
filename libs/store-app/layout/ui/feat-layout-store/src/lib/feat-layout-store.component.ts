import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiHeaderStoreComponent } from '@angular-monorepo/ui-header-store';
import { RouterModule } from '@angular/router';
import { LayoutStoreMid } from '@angular-monorepo/layout-store.mid';

@Component({
  selector: 'lib-feat-layout-store',
  imports: [CommonModule, RouterModule, UiHeaderStoreComponent],
  templateUrl: './feat-layout-store.component.html',
  styleUrl: './feat-layout-store.component.scss',
})
export class FeatLayoutStoreComponent implements OnInit {
  private _mid: LayoutStoreMid = inject(LayoutStoreMid);

  ngOnInit() {
    // this._mid.getOrderList$();

    console.log();
  }

  // get store date from mid and use to this component
  store$() {
    return this._mid.store;
  }

  clickCart(event: boolean) {
    console.log(event);
  }
}
