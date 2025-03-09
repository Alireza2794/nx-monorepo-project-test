export interface OrdersModel {
  totalCount: number;
  totalAmount: number;
  Items: OrderItems[];
}

export interface OrderItems {
  id: number;
  title: string;
}

export interface ProductModel {
  id: number;
  title: string;
  description: string;
  price: string;
  imageUrl: string;
}
