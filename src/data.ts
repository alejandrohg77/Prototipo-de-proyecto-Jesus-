import { Product, Movement, Asset } from './types';

export const MOCK_PRODUCTS: Product[] = [
  { id: '1', name: 'Aceite de Oliva 1L', sku: 'AL-001', category: 'Abarrotes', stock: 45, minStock: 10, price: 12.50, lastUpdate: '2024-03-20' },
  { id: '2', name: 'Arroz Integral 5kg', sku: 'AL-002', category: 'Granos', stock: 12, minStock: 15, price: 8.20, lastUpdate: '2024-03-21' },
  { id: '3', name: 'Detergente Líquido 3L', sku: 'LM-001', category: 'Limpieza', stock: 28, minStock: 5, price: 15.75, lastUpdate: '2024-03-19' },
  { id: '4', name: 'Leche Entera 1L', sku: 'LA-001', category: 'Lácteos', stock: 60, minStock: 20, price: 2.10, lastUpdate: '2024-03-22' },
  { id: '5', name: 'Pasta Dental 100g', sku: 'HP-001', category: 'Higiene', stock: 8, minStock: 10, price: 3.50, lastUpdate: '2024-03-18' },
];

export const MOCK_MOVEMENTS: Movement[] = [
  { id: 'm1', productId: '1', productName: 'Aceite de Oliva 1L', type: 'IN', quantity: 20, date: '2024-03-22 10:30', user: 'Admin', reason: 'Compra a proveedor' },
  { id: 'm2', productId: '2', productName: 'Arroz Integral 5kg', type: 'OUT', quantity: 5, date: '2024-03-22 14:15', user: 'Juan Pérez', reason: 'Venta directa' },
  { id: 'm3', productId: '5', productName: 'Pasta Dental 100g', type: 'OUT', quantity: 2, date: '2024-03-23 09:00', user: 'Admin', reason: 'Venta directa' },
];

export const MOCK_ASSETS: Asset[] = [
  { id: 'a1', name: 'Montacargas Manual', code: 'ACT-001', status: 'OPERATIVO', location: 'Pasillo A', purchaseDate: '2023-01-15', value: 450.00 },
  { id: 'a2', name: 'Computadora Oficina', code: 'ACT-002', status: 'OPERATIVO', location: 'Administración', purchaseDate: '2023-05-10', value: 850.00 },
  { id: 'a3', name: 'Estantería Metálica', code: 'ACT-003', status: 'MANTENIMIENTO', location: 'Pasillo C', purchaseDate: '2022-11-20', value: 200.00 },
];
