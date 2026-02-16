export interface Product {
  id: number;
  title: string;
  description: number;
  category: string;
  brand: string;
  sku: string;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  returnPolicy: string;
  price: number;
  thumbnail: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
