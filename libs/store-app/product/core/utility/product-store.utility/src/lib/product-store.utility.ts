import { ProductFormModel } from '@angular-monorepo/product-store.model';
import { inject, Injectable, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ProductStoreUtility {
  private _fb: FormBuilder = inject(FormBuilder);

  fileUrlFinall = signal<string>('');

  createProductForm(): FormGroup<ProductFormModel> {
    return this._fb.group({
      id: null,
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      imageUrl: new FormControl('', [Validators.required]),
    });
  }

  handleFileInput(input: File | Event): void {
    let file: File | null | any = null;

    if (input instanceof File) {
      file = input;
    } else if (input instanceof Event) {
      const target = input.target as HTMLInputElement;
      if (target.files && target.files?.length > 0) {
        file = target.files[0];
      }
    }

    if (!file) {
      this.fileUrlFinall.set('No File Found!');
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      this.fileUrlFinall.set(result);
    };
    reader.onerror = () => this.fileUrlFinall.set('Error Loading File');

    reader.readAsDataURL(file);
  }
}
