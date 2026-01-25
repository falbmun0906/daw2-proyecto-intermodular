import { TestBed } from '@angular/core/testing';
import { ProductsStore } from './products.store';
import { ProductService } from './product.service';
import { of, throwError } from 'rxjs';
import { Product } from './models/product';

/**
 * FASE 7: Tests unitarios del ProductsStore
 * Coverage: Estado, métodos CRUD, computed signals
 */
describe('ProductsStore', () => {
  let store: ProductsStore;
  let productServiceSpy: jasmine.SpyObj<ProductService>;

  const mockProducts: Product[] = [
    { id: '1', name: 'Laptop HP', category: 'Electrónica', price: 800, stock: 5, imageUrl: '', description: '', createdAt: new Date().toISOString() },
    { id: '2', name: 'Laptop Dell', category: 'Electrónica', price: 1200, stock: 15, imageUrl: '', description: '', createdAt: new Date().toISOString() },
    { id: '3', name: 'Mouse', category: 'Accesorios', price: 25, stock: 100, imageUrl: '', description: '', createdAt: new Date().toISOString() }
  ];

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ProductService', ['getAll', 'create', 'update', 'delete']);

    TestBed.configureTestingModule({
      providers: [
        ProductsStore,
        { provide: ProductService, useValue: spy }
      ]
    });

    store = TestBed.inject(ProductsStore);
    productServiceSpy = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
  });

  describe('Inicialización', () => {
    it('debería crear el store', () => {
      expect(store).toBeTruthy();
    });

    it('debería inicializar con estado vacío', () => {
      expect(store.products()).toEqual([]);
      expect(store.loading()).toBe(false);
      expect(store.error()).toBeNull();
    });
  });

  describe('refresh()', () => {
    it('debería cargar productos correctamente', () => {
      productServiceSpy.getAll.and.returnValue(of(mockProducts));

      store.refresh();

      expect(store.loading()).toBe(false);
      expect(store.products().length).toBe(3);
      expect(store.error()).toBeNull();
    });

    it('debería manejar errores de carga', () => {
      const error = new Error('Network error');
      productServiceSpy.getAll.and.returnValue(throwError(() => error));

      store.refresh();

      expect(store.loading()).toBe(false);
      expect(store.error()).toContain('Error al cargar productos');
      expect(store.products().length).toBe(0);
    });

    it('debería actualizar lastUpdate al cargar', () => {
      productServiceSpy.getAll.and.returnValue(of(mockProducts));
      const before = new Date();

      store.refresh();

      const lastUpdate = store.lastUpdate();
      expect(lastUpdate).toBeTruthy();
      expect(lastUpdate!.getTime()).toBeGreaterThanOrEqual(before.getTime());
    });
  });

  describe('add()', () => {
    it('debería agregar producto al final de la lista', () => {
      const newProduct: Product = {
        id: '4',
        name: 'Teclado',
        category: 'Accesorios',
        price: 50,
        stock: 20,
        imageUrl: '',
        description: '',
        createdAt: new Date().toISOString()
      };

      store.add(newProduct);

      expect(store.products().length).toBe(1);
      expect(store.products()[0]).toEqual(newProduct);
    });

    it('debería mantener productos existentes al agregar', () => {
      productServiceSpy.getAll.and.returnValue(of(mockProducts));
      store.refresh();

      const newProduct: Product = { id: '4', name: 'Nuevo', category: 'Test', price: 100, stock: 10, imageUrl: '', description: '', createdAt: new Date().toISOString() };
      store.add(newProduct);

      expect(store.products().length).toBe(4);
      expect(store.products()).toContain(newProduct);
    });

    it('debería actualizar lastUpdate al agregar', () => {
      const before = new Date();
      const product: Product = { id: '1', name: 'Test', category: 'Test', price: 100, stock: 10, imageUrl: '', description: '', createdAt: new Date().toISOString() };

      store.add(product);

      expect(store.lastUpdate()!.getTime()).toBeGreaterThanOrEqual(before.getTime());
    });
  });

  describe('update()', () => {
    beforeEach(() => {
      productServiceSpy.getAll.and.returnValue(of(mockProducts));
      store.refresh();
    });

    it('debería actualizar producto existente', () => {
      const updatedProduct: Product = {
        id: '1',
        name: 'Laptop HP Actualizado',
        category: 'Electrónica',
        price: 900,
        stock: 10,
        imageUrl: '',
        description: '',
        createdAt: new Date().toISOString()
      };

      store.update(updatedProduct);

      const found = store.products().find(p => p.id === '1');
      expect(found?.name).toBe('Laptop HP Actualizado');
      expect(found?.price).toBe(900);
    });

    it('no debería modificar productos no afectados', () => {
      const updatedProduct: Product = { id: '1', name: 'Actualizado', category: 'Test', price: 999, stock: 5, imageUrl: '', description: '', createdAt: new Date().toISOString() };

      store.update(updatedProduct);

      const mouse = store.products().find(p => p.id === '3');
      expect(mouse?.name).toBe('Mouse');
      expect(mouse?.price).toBe(25);
    });

    it('debería ser inmutable (crear nuevo array)', () => {
      const arrayBefore = store.products();
      const updatedProduct: Product = { id: '1', name: 'Actualizado', category: 'Test', price: 999, stock: 5, imageUrl: '', description: '', createdAt: new Date().toISOString() };

      store.update(updatedProduct);

      const arrayAfter = store.products();
      expect(arrayAfter).not.toBe(arrayBefore);
    });
  });

  describe('remove()', () => {
    beforeEach(() => {
      productServiceSpy.getAll.and.returnValue(of(mockProducts));
      store.refresh();
    });

    it('debería eliminar producto por id', () => {
      store.remove('1');

      expect(store.products().length).toBe(2);
      expect(store.products().find(p => p.id === '1')).toBeUndefined();
    });

    it('no debería modificar otros productos', () => {
      store.remove('1');

      expect(store.products().find(p => p.id === '2')).toBeTruthy();
      expect(store.products().find(p => p.id === '3')).toBeTruthy();
    });

    it('no debería causar error si id no existe', () => {
      expect(() => store.remove('999')).not.toThrow();
      expect(store.products().length).toBe(3);
    });
  });

  describe('Computed Signals', () => {
    beforeEach(() => {
      productServiceSpy.getAll.and.returnValue(of(mockProducts));
      store.refresh();
    });

    it('totalCount debería contar productos correctamente', () => {
      expect(store.totalCount()).toBe(3);

      store.add({ id: '4', name: 'Nuevo', category: 'Test', price: 50, stock: 10, imageUrl: '', description: '', createdAt: new Date().toISOString() });
      expect(store.totalCount()).toBe(4);

      store.remove('1');
      expect(store.totalCount()).toBe(3);
    });

    it('totalValue debería sumar precios', () => {
      // 800 + 1200 + 25 = 2025
      expect(store.totalValue()).toBe(2025);
    });

    it('totalStock debería sumar stock', () => {
      // 5 + 15 + 100 = 120
      expect(store.totalStock()).toBe(120);
    });

    it('averagePrice debería calcular promedio', () => {
      // 2025 / 3 = 675
      expect(store.averagePrice()).toBe(675);
    });

    it('averagePrice debería retornar 0 si no hay productos', () => {
      store.remove('1');
      store.remove('2');
      store.remove('3');

      expect(store.averagePrice()).toBe(0);
    });

    it('lowStockProducts debería filtrar productos con stock < 10', () => {
      const lowStock = store.lowStockProducts();

      expect(lowStock.length).toBe(1);
      expect(lowStock[0].id).toBe('1');
      expect(lowStock[0].stock).toBe(5);
    });

    it('categoriesStats debería agrupar por categoría', () => {
      const stats = store.categoriesStats();

      expect(stats.length).toBe(2);

      const electronics = stats.find(s => s.category === 'Electrónica');
      expect(electronics?.count).toBe(2);
      expect(electronics?.totalValue).toBe(2000);
      expect(electronics?.averagePrice).toBe(1000);

      const accessories = stats.find(s => s.category === 'Accesorios');
      expect(accessories?.count).toBe(1);
      expect(accessories?.totalValue).toBe(25);
    });
  });

  describe('clearError()', () => {
    it('debería limpiar el error', () => {
      const error = new Error('Test error');
      productServiceSpy.getAll.and.returnValue(throwError(() => error));
      store.refresh();

      expect(store.error()).toBeTruthy();

      store.clearError();

      expect(store.error()).toBeNull();
    });
  });

  describe('search()', () => {
    beforeEach(() => {
      productServiceSpy.getAll.and.returnValue(of(mockProducts));
      store.refresh();
    });

    it('debería buscar por nombre', () => {
      const results = store.search('laptop');

      expect(results.length).toBe(2);
      expect(results.every(p => p.name.toLowerCase().includes('laptop'))).toBe(true);
    });

    it('debería ser case-insensitive', () => {
      const results = store.search('LAPTOP');

      expect(results.length).toBe(2);
    });

    it('debería retornar todos si término está vacío', () => {
      const results = store.search('');

      expect(results.length).toBe(3);
    });

    it('debería retornar array vacío si no hay coincidencias', () => {
      const results = store.search('xyz123');

      expect(results.length).toBe(0);
    });
  });
});

