import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private carrito: any[] = [];
  private carritoSubject = new BehaviorSubject<any[]>([]);

  constructor() { }

  getCarrito(): Observable<any[]> {
    return this.carritoSubject.asObservable();
  }

  agregarProducto(producto: any) {
    const productoExistente = this.carrito.find(p => p.id === producto.id);
    if (productoExistente) {
      productoExistente.cantidad++;
    } else {
      this.carrito.push({ ...producto, cantidad: 1 });
    }
    this.carritoSubject.next(this.carrito);
  }

  eliminarProducto(producto: any) {
    this.carrito = this.carrito.filter(p => p.id !== producto.id);
    this.carritoSubject.next(this.carrito);
  }

  limpiarCarrito() {
    this.carrito = [];
    this.carritoSubject.next(this.carrito);
  }
}
