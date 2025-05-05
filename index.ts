export interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  sellerId: number;
}
