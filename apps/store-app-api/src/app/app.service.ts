import { Injectable } from '@nestjs/common';

export interface ProductModel {
  id: number;
  imageUrl: string;
  title: string;
  price: string;
  description: string;
}

@Injectable()
export class AppService {
  data = [
    {
      id: 1,
      imageUrl: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
      title: 'Product test',
      price: '100',
      description:
        ' The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.',
    },
    {
      id: 2,
      imageUrl: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
      title: 'Product Dog',
      price: '120',
      description:
        ' The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.',
    },
  ];

  getProductData(query: string): { data: ProductModel[] } {
    // اگر query ارسال نشده، تمام داده‌ها را برگردانید
    if (!query) {
      return { data: this.data };
    }
    // فیلتر کردن داده‌ها بر اساس query
    const filteredData = this.data.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
    return { data: filteredData };
  }

  insertProduct(product: ProductModel) {
    product.id = this.data.length + 1;
    this.data.push(product);
    return product;
  }

  updateProduct(id: number, updatedData: ProductModel) {
    const index = this.data.findIndex((p) => p.id === id);
    if (index === -1) return null;

    this.data[index] = { ...this.data[index], ...updatedData };
    return this.data[index];
  }

  deleteProduct(id: number) {
    const index = this.data.findIndex((p) => p.id === id);
    if (index === -1) return false;

    this.data.splice(index, 1);
    return true;
  }
}
