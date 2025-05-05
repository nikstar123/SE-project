export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: Category;
  condition: Condition;
  images: string[];
  sellerId: number;
  sellerName: string;
  sellerAvatar?: string;
  location: string;
  createdAt: string;
  expiresAt: string;
  isFeatured?: boolean;
  isSold?: boolean;
  viewCount?: number;
  bidCount?: number;
  currentBid?: number;
}

export type Category = 
  | 'electronics' 
  | 'books' 
  | 'sports' 
  | 'furniture' 
  | 'clothing' 
  | 'vehicles' 
  | 'services' 
  | 'other';

export type Condition = 
  | 'new' 
  | 'like-new' 
  | 'excellent' 
  | 'good' 
  | 'fair' 
  | 'poor';