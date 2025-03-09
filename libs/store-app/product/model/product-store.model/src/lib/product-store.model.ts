export interface ProductModel {
  id: number;
  title: string;
  description: string;
  price: string;
  imageUrl: string;
}

export type ProductFormModel = {
  [k in keyof ProductModel]: any;
};

export interface OrdersModel {
  totalCount: number;
  totalAmount: number;
  Items: ProductModel[];
}
