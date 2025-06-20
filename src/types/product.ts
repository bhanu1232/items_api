export interface Product {
  id: string | number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  reviews?: {
    rating: number;
    comment: string;
    reviewerName: string;
    date: string;
  }[];
  meta?: {
    createdAt: string;
    updatedAt: string;
    title?: string;
    description?: string;
    keywords?: string;
  };
  availabilityStatus?: string;
  dimensions?: string;
  weight?: number;
  sku?: string;
  warrantyInformation?: string;
  returnPolicy?: string;
  shippingInformation?: string;
  minimumOrderQuantity?: number;
} 