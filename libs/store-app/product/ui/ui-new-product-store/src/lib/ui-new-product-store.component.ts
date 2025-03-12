import {
  ProductFormModel,
  ProductModel,
} from '@angular-monorepo/product-store.model';
import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import {
  Component,
  effect,
  inject,
  OnInit,
  signal,
  Signal,
} from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogClose,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export interface DialogData {
  Form: FormGroup;
  handleFile: (input: File | Event) => void;
  fileUrlFinall: Signal<string>;
  oldData?: any;
  isEdit?: boolean;
}

@Component({
  selector: 'lib-ui-new-product-store',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogClose,
  ],
  templateUrl: './ui-new-product-store.component.html',
  styleUrl: './ui-new-product-store.component.scss',
  animations: [
    trigger('wobble', [
      transition('false => true', [
        animate(
          '0.75s',
          keyframes([
            style({ transform: 'translateX(-5%)', offset: 0.1 }),
            style({ transform: 'translateX(5%)', offset: 0.3 }),
            style({ transform: 'translateX(-5%)', offset: 0.5 }),
            style({ transform: 'translateX(5%)', offset: 0.7 }),
            style({ transform: 'translateX(-5%)', offset: 0.9 }),
            style({ transform: 'translateX(0)', offset: 1 }),
          ])
        ),
      ]),
    ]),
  ],
})
export class UiNewProductStoreComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<UiNewProductStoreComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  productForm!: FormGroup<ProductFormModel>;

  // for change mode status
  isEdit = signal<boolean>(false);

  protected wobbleField = false;

  constructor() {
    // set finall url file uploaded signal to form after change
    effect(() => {
      this.productForm.patchValue({
        imageUrl: this.data.fileUrlFinall() ?? '',
      });
    });
  }

  ngOnInit() {
    // get empty form in first load
    this.productForm = this.data.Form ?? null;

    if (this.data.isEdit) {
      // change mode to edit
      this.isEdit.set(this.data.isEdit);

      // patch data to form
      this.productForm.patchValue({
        id: this.data.oldData.id,
        title: this.data.oldData.title,
        price: this.data.oldData.price,
        description: this.data.oldData.description,
        imageUrl: this.data.oldData.imageUrl,
      });
    }
  }

  // function fo sent input event to utility service for upload file
  handleFileInput(event: Event) {
    this.data.handleFile(event);
  }

  onSubmit() {
    this.dialogRef.close(this.productForm.value);
  }

  ngOnDestroy() {
    this.productForm.reset();
  }
}
