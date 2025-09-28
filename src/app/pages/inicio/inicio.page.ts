import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from 'src/app/compartido/componente/header/header.component';
import { FooterComponent } from 'src/app/compartido/componente/footer/footer.component';
import { ProductosService } from 'src/app/servicios/productos';
import { Observable } from 'rxjs';
import { CarritoService } from 'src/app/servicios/carrito';
import { addIcons } from 'ionicons';
import { cartOutline } from 'ionicons/icons';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HeaderComponent,
    FooterComponent
  ]
})
export class InicioPage implements OnInit {

  // Observable que contendrá la lista de productos
  productos$!: Observable<any[]>;

  constructor(
    private productosService: ProductosService,
    private carritoService: CarritoService
  ) {
    // Agrega el ícono del carrito a la librería de ionicons para poder usarlo en HTML
    addIcons({ cartOutline });
  }

  ngOnInit() {
    // Se ejecuta al inicializar la página
    // Obtiene los productos desde el servicio y los asigna al observable
    this.productos$ = this.productosService.getProductos();
  }

  // Método que agrega un producto al carrito
  agregarAlCarrito(producto: any) {
    this.carritoService.agregarProducto(producto); // Se pasa el producto al servicio del carrito
    console.log('Producto agregado al carrito:', producto.nombre); // Log de depuración
  }
}
