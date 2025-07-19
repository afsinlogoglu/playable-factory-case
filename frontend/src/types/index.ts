export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  _id: string;
  name: string;
  description?: string;
  slug?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string | Category;
  image?: string;
  stock: number;
  rating?: number;
  sku?: string;
  reviews?: Review[];
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  _id: string;
  product: string;
  user: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  _id: string;
  user: string;
  customer?: {
    name: string;
    email: string;
  };
  products: Array<{
    product: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  total?: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'completed';
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
} 