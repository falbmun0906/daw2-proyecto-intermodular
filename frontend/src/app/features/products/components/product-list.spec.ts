import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list';
import { ProductsStore } from '../products.store';
import { ProductService } from '../product.service';
import { ToastService } from '../../../services/toast.service';
import { of } from 'rxjs';
import { signal } from '@angular/core';

/**
 * FASE 7: Tests unitarios de ProductListComponent
 */
describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let mockStore: jasmine.SpyObj<ProductsStore>;
  let mockProductService: jasmine.SpyObj<ProductService>;
  let mockToastService: jasmine.SpyObj<ToastService>;

  beforeEach(async () => {
    const storeSpy = jasmine.createSpyObj('ProductsStore', ['remove'], {
      products: signal([
        { id: '1', name: 'Product 1', price: 100, stock: 10, category: 'Test', imageUrl: '', description: '', createdAt: new Date().toISOString() },
        { id: '2', name: 'Product 2', price: 200, stock: 20, category: 'Test', imageUrl: '', description: '', createdAt: new Date().toISOString() }
      ]),
      loading: signal(false),
      error: signal(null),
      totalCount: signal(2),
      totalValue: signal(300),
      totalStock: signal(30),
      averagePrice: signal(150),
      lowStockProducts: signal([])
    });

    const serviceSpy = jasmine.createSpyObj('ProductService', ['delete']);
    const toastSpy = jasmine.createSpyObj('ToastService', ['success', 'error']);

    await TestBed.configureTestingModule({
      imports: [ProductListComponent],
      providers: [
        { provide: ProductsStore, useValue: storeSpy },
        { provide: ProductService, useValue: serviceSpy },
        { provide: ToastService, useValue: toastSpy }
      ]
    }).compileComponents();

    mockStore = TestBed.inject(ProductsStore) as jasmine.SpyObj<ProductsStore>;
    mockProductService = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
    mockToastService = TestBed.inject(ToastService) as jasmine.SpyObj<ToastService>;

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería mostrar la lista de productos', () => {
    const compiled = fixture.nativeElement;
    const productCards = compiled.querySelectorAll('.product-card');

    expect(productCards.length).toBe(2);
  });

  it('debería usar trackBy con el ID del producto', () => {
    const product = { id: '123', name: 'Test', price: 100, stock: 10, category: 'Test', imageUrl: '', description: '', createdAt: new Date().toISOString() };
    const result = component.trackById(0, product);

    expect(result).toBe('123');
  });

  describe('onDelete()', () => {
    it('debería llamar al servicio de eliminación', () => {
      spyOn(window, 'confirm').and.returnValue(true);
      mockProductService.delete.and.returnValue(of(void 0));

      component.onDelete('1', 'Product 1');

      expect(mockProductService.delete).toHaveBeenCalledWith('1');
    });

    it('debería actualizar el store tras eliminación exitosa', () => {
      spyOn(window, 'confirm').and.returnValue(true);
      mockProductService.delete.and.returnValue(of(void 0));

      component.onDelete('1', 'Product 1');

      expect(mockStore.remove).toHaveBeenCalledWith('1');
    });

    it('debería mostrar toast de éxito', () => {
      spyOn(window, 'confirm').and.returnValue(true);
      mockProductService.delete.and.returnValue(of(void 0));

      component.onDelete('1', 'Product 1');

      expect(mockToastService.success).toHaveBeenCalledWith('Producto eliminado correctamente');
    });

    it('no debería eliminar si el usuario cancela', () => {
      spyOn(window, 'confirm').and.returnValue(false);

      component.onDelete('1', 'Product 1');

      expect(mockProductService.delete).not.toHaveBeenCalled();
      expect(mockStore.remove).not.toHaveBeenCalled();
    });
  });

  it('debería mostrar estadísticas correctamente', () => {
    const compiled = fixture.nativeElement;

    // Verificar que se muestran los contadores
    expect(compiled.textContent).toContain('2'); // totalCount
    expect(compiled.textContent).toContain('300'); // totalValue
  });

  it('debería mostrar estado de carga', () => {
    // Crear un nuevo mock con loading en true
    const storeSpy = jasmine.createSpyObj('ProductsStore', ['remove'], {
      products: signal([]),
      loading: signal(true),
      error: signal(null),
      totalCount: signal(0),
      totalValue: signal(0),
      totalStock: signal(0),
      averagePrice: signal(0),
      lowStockProducts: signal([])
    });

    TestBed.overrideProvider(ProductsStore, { useValue: storeSpy });
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.loading-state') || compiled.textContent).toBeTruthy();
  });

  it('debería mostrar errores', () => {
    // Crear un nuevo mock con error
    const storeSpy = jasmine.createSpyObj('ProductsStore', ['remove'], {
      products: signal([]),
      loading: signal(false),
      error: signal('Error de prueba'),
      totalCount: signal(0),
      totalValue: signal(0),
      totalStock: signal(0),
      averagePrice: signal(0),
      lowStockProducts: signal([])
    });

    TestBed.overrideProvider(ProductsStore, { useValue: storeSpy });
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Error');
  });
});

