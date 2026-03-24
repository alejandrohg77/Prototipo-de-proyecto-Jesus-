/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  ArrowLeftRight, 
  Box, 
  BarChart3, 
  User, 
  HelpCircle, 
  LogOut, 
  Menu, 
  X, 
  Search, 
  Plus, 
  Bell,
  FileText,
  Database,
  Layers,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  LineChart,
  Line
} from 'recharts';
import { cn } from './lib/utils';
import { MOCK_PRODUCTS, MOCK_MOVEMENTS, MOCK_ASSETS } from './data';
import { Product, Movement, Asset } from './types';

// --- Components ---

const SidebarItem = ({ icon: Icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) => (
  <button
    onClick={onClick}
    className={cn(
      "flex items-center w-full gap-3 px-4 py-3 text-sm font-medium transition-colors rounded-lg",
      active 
        ? "bg-blue-50 text-blue-600" 
        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
    )}
  >
    <Icon size={20} />
    <span>{label}</span>
  </button>
);

const Card = ({ children, title, className }: { children: React.ReactNode, title?: string, className?: string }) => (
  <div className={cn("bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden", className)}>
    {title && (
      <div className="px-6 py-4 border-bottom border-slate-100 bg-slate-50/50">
        <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wider">{title}</h3>
      </div>
    )}
    <div className="p-6">{children}</div>
  </div>
);

const StatCard = ({ label, value, icon: Icon, trend, color }: { label: string, value: string | number, icon: any, trend?: string, color: string }) => (
  <Card className="flex items-center gap-4">
    <div className={cn("p-3 rounded-lg", color)}>
      <Icon size={24} className="text-white" />
    </div>
    <div>
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <h4 className="text-2xl font-bold text-slate-900">{value}</h4>
      {trend && <p className="text-xs font-medium text-emerald-600 mt-1">{trend}</p>}
    </div>
  </Card>
);

// --- Views ---

const DashboardView = () => {
  const data = [
    { name: 'Lun', entradas: 12, salidas: 8 },
    { name: 'Mar', entradas: 19, salidas: 14 },
    { name: 'Mie', entradas: 15, salidas: 22 },
    { name: 'Jue', entradas: 22, salidas: 18 },
    { name: 'Vie', entradas: 30, salidas: 25 },
    { name: 'Sab', entradas: 10, salidas: 5 },
  ];

  const pieData = [
    { name: 'Abarrotes', value: 400 },
    { name: 'Limpieza', value: 300 },
    { name: 'Lácteos', value: 300 },
    { name: 'Higiene', value: 200 },
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Productos" value={MOCK_PRODUCTS.length} icon={Package} color="bg-blue-500" trend="+2 esta semana" />
        <StatCard label="Stock Bajo" value={MOCK_PRODUCTS.filter(p => p.stock <= p.minStock).length} icon={Bell} color="bg-amber-500" />
        <StatCard label="Movimientos Hoy" value={8} icon={ArrowLeftRight} color="bg-emerald-500" trend="+12% vs ayer" />
        <StatCard label="Valor Inventario" value="$12,450" icon={Box} color="bg-indigo-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Movimientos Semanales">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="entradas" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="salidas" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Distribución por Categoría">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

const ProductsView = () => {
  return (
    <Card className="p-0">
      <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Buscar producto por nombre o SKU..." 
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>
        <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          <Plus size={20} />
          Nuevo Producto
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider font-semibold">
              <th className="px-6 py-4">Producto</th>
              <th className="px-6 py-4">SKU</th>
              <th className="px-6 py-4">Categoría</th>
              <th className="px-6 py-4">Stock</th>
              <th className="px-6 py-4">Precio</th>
              <th className="px-6 py-4">Estado</th>
              <th className="px-6 py-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {MOCK_PRODUCTS.map((product) => (
              <tr key={product.id} className="hover:bg-slate-50 transition-colors group">
                <td className="px-6 py-4 font-medium text-slate-900">{product.name}</td>
                <td className="px-6 py-4 text-slate-500 font-mono text-xs">{product.sku}</td>
                <td className="px-6 py-4 text-slate-600">{product.category}</td>
                <td className="px-6 py-4">
                  <span className={cn(
                    "font-semibold",
                    product.stock <= product.minStock ? "text-red-600" : "text-slate-700"
                  )}>
                    {product.stock}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-600">${product.price.toFixed(2)}</td>
                <td className="px-6 py-4">
                  {product.stock <= product.minStock ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      Stock Bajo
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                      Normal
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

const TechnicalDocsView = () => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Layers className="text-blue-600" />
          Estructura de Carpetas (PHP)
        </h2>
        <Card className="bg-slate-900 text-slate-300 font-mono text-sm p-6">
          <pre>{`stockcontrol/
├── config/
│   └── database.php      # Conexión PDO a MySQL
├── controllers/
│   ├── AuthController.php
│   ├── ProductController.php
│   └── MovementController.php
├── models/
│   ├── User.php
│   ├── Product.php
│   └── Movement.php
├── views/
│   ├── layout/
│   │   ├── header.php
│   │   └── sidebar.php
│   ├── dashboard.php
│   ├── products/
│   │   ├── index.php
│   │   └── edit.php
│   └── login.php
├── public/
│   ├── css/
│   ├── js/
│   └── index.php         # Front Controller (Router)
└── .htaccess             # Reescritura de URLs`}</pre>
        </Card>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Database className="text-blue-600" />
          Diseño de Base de Datos (MySQL)
        </h2>
        <Card className="bg-slate-900 text-slate-300 font-mono text-sm p-6">
          <pre>{`-- Tabla de Usuarios
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    rol ENUM('ADMIN', 'OPERADOR') DEFAULT 'OPERADOR',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Productos
CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    sku VARCHAR(50) UNIQUE NOT NULL,
    categoria VARCHAR(100),
    stock INT DEFAULT 0,
    stock_minimo INT DEFAULT 5,
    precio DECIMAL(10,2),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de Movimientos
CREATE TABLE movimientos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    producto_id INT,
    tipo ENUM('ENTRADA', 'SALIDA') NOT NULL,
    cantidad INT NOT NULL,
    motivo VARCHAR(255),
    usuario_id INT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (producto_id) REFERENCES productos(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);`}</pre>
        </Card>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
          <CheckCircle2 className="text-blue-600" />
          Cronograma e Hitos
        </h2>
        <div className="space-y-4">
          {[
            { phase: 'Fase 1: Análisis y Diseño', tasks: 'Definición de requerimientos, diseño de DB, prototipado UI.', status: 'Completado' },
            { phase: 'Fase 2: Desarrollo Backend', tasks: 'Configuración de servidor PHP, modelos de datos, API básica.', status: 'En Progreso' },
            { phase: 'Fase 3: Desarrollo Frontend', tasks: 'Implementación de vistas, formularios, dashboards dinámicos.', status: 'Pendiente' },
            { phase: 'Fase 4: Pruebas y Despliegue', tasks: 'QA, corrección de errores, puesta en marcha en servidor local.', status: 'Pendiente' },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-4 p-4 bg-white border border-slate-200 rounded-lg">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-white font-bold shrink-0",
                item.status === 'Completado' ? "bg-emerald-500" : item.status === 'En Progreso' ? "bg-blue-500" : "bg-slate-300"
              )}>
                {i + 1}
              </div>
              <div>
                <h4 className="font-bold text-slate-900">{item.phase}</h4>
                <p className="text-sm text-slate-600">{item.tasks}</p>
                <span className="text-xs font-medium uppercase tracking-wider mt-2 inline-block text-slate-400">{item.status}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Simple login simulation
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl text-white mb-4 shadow-lg shadow-blue-200">
              <Package size={32} />
            </div>
            <h1 className="text-3xl font-bold text-slate-900">StockControl</h1>
            <p className="text-slate-500 mt-2">Gestión inteligente de inventario</p>
          </div>

          <Card className="p-8">
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setIsLoggedIn(true); }}>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Correo Electrónico</label>
                <input 
                  type="email" 
                  defaultValue="admin@stockcontrol.com"
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  placeholder="ejemplo@correo.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Contraseña</label>
                <input 
                  type="password" 
                  defaultValue="password"
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  placeholder="••••••••"
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-lg shadow-blue-200 transition-all active:scale-[0.98]"
              >
                Iniciar Sesión
              </button>
              <div className="text-center">
                <a href="#" className="text-sm text-blue-600 hover:underline">¿Olvidaste tu contraseña?</a>
              </div>
            </form>
          </Card>
          
          <p className="text-center mt-8 text-sm text-slate-500">
            ¿No tienes cuenta? <a href="#" className="text-blue-600 font-semibold hover:underline">Regístrate aquí</a>
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transition-transform lg:relative lg:translate-x-0",
          !isSidebarOpen && "-translate-x-full"
        )}
      >
        <div className="h-full flex flex-col">
          <div className="p-6 flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
              <Package size={18} />
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">StockControl</span>
          </div>

          <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
            <SidebarItem icon={LayoutDashboard} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
            <SidebarItem icon={Package} label="Productos" active={activeTab === 'products'} onClick={() => setActiveTab('products')} />
            <SidebarItem icon={ArrowLeftRight} label="Movimientos" active={activeTab === 'movements'} onClick={() => setActiveTab('movements')} />
            <SidebarItem icon={Box} label="Activos" active={activeTab === 'assets'} onClick={() => setActiveTab('assets')} />
            <SidebarItem icon={BarChart3} label="Reportes" active={activeTab === 'reports'} onClick={() => setActiveTab('reports')} />
            <div className="pt-4 pb-2">
              <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sistema</p>
            </div>
            <SidebarItem icon={FileText} label="Documentación Técnica" active={activeTab === 'docs'} onClick={() => setActiveTab('docs')} />
            <SidebarItem icon={User} label="Perfil" active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
            <SidebarItem icon={HelpCircle} label="Ayuda" active={activeTab === 'help'} onClick={() => setActiveTab('help')} />
          </nav>

          <div className="p-4 border-t border-slate-100">
            <button 
              onClick={() => setIsLoggedIn(false)}
              className="flex items-center w-full gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut size={20} />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8 shrink-0">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg lg:hidden"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <div className="hidden lg:block">
            <h2 className="text-lg font-semibold text-slate-800 capitalize">
              {activeTab === 'docs' ? 'Documentación Técnica' : activeTab}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full relative">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-slate-200"></div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-900 leading-none">Admin Usuario</p>
                <p className="text-xs text-slate-500 mt-1">Administrador</p>
              </div>
              <div className="w-10 h-10 bg-slate-100 rounded-full border-2 border-white shadow-sm flex items-center justify-center text-slate-600 font-bold">
                AD
              </div>
            </div>
          </div>
        </header>

        {/* View Content */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'dashboard' && <DashboardView />}
              {activeTab === 'products' && <ProductsView />}
              {activeTab === 'docs' && <TechnicalDocsView />}
              {['movements', 'assets', 'reports', 'profile', 'help'].includes(activeTab) && (
                <div className="flex flex-col items-center justify-center h-[60vh] text-center">
                  <div className="p-6 bg-slate-100 rounded-full text-slate-400 mb-4">
                    <Layers size={48} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Módulo en Desarrollo</h3>
                  <p className="text-slate-500 max-w-md mt-2">
                    Este módulo está contemplado en el prototipo funcional. Puedes ver la estructura técnica en la pestaña de "Documentación Técnica".
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
