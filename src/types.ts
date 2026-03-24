export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  stock: number;
  minStock: number;
  price: number;
  lastUpdate: string;
}

export interface Movement {
  id: string;
  productId: string;
  productName: string;
  type: 'IN' | 'OUT';
  quantity: number;
  date: string;
  user: string;
  reason: string;
}

export interface Asset {
  id: string;
  name: string;
  code: string;
  status: 'OPERATIVO' | 'MANTENIMIENTO' | 'DEBAJA';
  location: string;
  purchaseDate: string;
  value: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'OPERADOR';
  avatar?: string;
}
