import type { Meta, StoryObj } from '@storybook/angular';
import { UiNewProductStoreComponent } from './ui-new-product-store.component';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { signal } from '@angular/core';

// تعریف اینترفیس داده‌های دیالوگ (DialogData) همانند کدی که در کامپوننت استفاده شده
interface DialogData {
  Form: FormGroup;
  handleFile: (input: File | Event) => void;
  fileUrlFinall: any; // در اینجا از any استفاده می‌کنیم، اما می‌توان Signal<string> را هم تایپ کرد
  oldData?: any;
  isEdit?: boolean;
}

// ساخت یک فرم نمونه برای دیالوگ
const fb = new FormBuilder();
const sampleForm: FormGroup = fb.group({
  id: [''],
  title: [''],
  description: [''],
  price: [''],
  imageUrl: ['']
});

// نمونه داده اولیه برای MAT_DIALOG_DATA
const dialogData: DialogData = {
  Form: sampleForm,
  handleFile: (event: File | Event) => {
    console.log('File event:', event);
  },
  fileUrlFinall: signal('https://material.angular.io/assets/img/examples/shiba2.jpg'),
  isEdit: false,
  oldData: null,
};

const meta: Meta<UiNewProductStoreComponent> = {
  component: UiNewProductStoreComponent,
  title: 'UiNewProductStoreComponent',
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: dialogData },
      ],
    }),
  ],
};
export default meta;
type Story = StoryObj<UiNewProductStoreComponent>;

// استوری اصلی (حالت افزودن محصول)
export const Primary: Story = {
  args: {},
};

// استوری حالت ویرایش (Edit Mode)
export const EditMode: Story = {
  args: {},
  decorators: [
    moduleMetadata({
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            ...dialogData,
            isEdit: true,
            oldData: {
              id: 1,
              title: 'Edited Product',
              description: 'This is an edited product description',
              price: '200',
              imageUrl: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
            },
          },
        },
      ],
    }),
  ],
};
