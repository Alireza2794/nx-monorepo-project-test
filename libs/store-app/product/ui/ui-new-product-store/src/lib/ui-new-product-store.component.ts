import { ProductModel } from '@angular-monorepo/product-store.model';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal, Signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
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
  ],
  templateUrl: './ui-new-product-store.component.html',
  styleUrl: './ui-new-product-store.component.scss',
})
export class UiNewProductStoreComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<UiNewProductStoreComponent>);
  private _fb: FormBuilder = inject(FormBuilder);

  productForm!: FormGroup<any>;

  matcher = new MyErrorStateMatcher();

  fileToUpload: any = null;

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.productForm = this._fb.group({
      id: null,
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      imageUrl: new FormControl('', [Validators.required]),
    });
  }

  handleFileInput(event: any) {
    this.fileToUpload = event.files[0];

    //Show image preview
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.productForm.get('imageUrl')?.setValue(event.target.result);
    };
    reader.readAsDataURL(this.fileToUpload);
  }

  onSubmit() {
    if (this.productForm.invalid) {
      return console.log('Complate Form');
    }

    this.dialogRef.close(this.productForm.value);
  }

  onClose() {
    this.dialogRef.close(null);
  }
}
