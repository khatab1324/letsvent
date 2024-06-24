export interface CategroyField {
  id: string;
  name: string;
  description: String | undefined;
  Product: ProductField;
}
export interface ProductField {
  id: string;
  title: string;
  InventoryId: string;
  description?: string;
  status: boolean;
  quantity?: number;
  costOnYou: number;
  priceForCustomer: number;
  providerId: string;
  create_at: Date;
  categoryId: string;
  Order: OrderField;
  customerId: string;
}

export interface OrderField {
  id: string;
  productId: string;
  customerId: string;
  address: string;
  email: string;
  inventoryId: string;
  orderDetail: string;
}
