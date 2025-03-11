export interface ProductModel {
  id: number;
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  countSelected?: number;
}

export type ProductFormModel = {
  [k in keyof ProductModel]: any;
};

export interface OrdersModel {
  totalCount: number;
  totalAmount: number;
  Items: ProductModel[];
}
export interface ApiResponce {
  data: ProductModel[];
}
export interface ApiResponceCart {
  data: OrdersModel;
}
