import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController, ToastController } from '@ionic/angular';
import { HeaderComponent } from 'src/app/compartido/componente/header/header.component';
import { FooterComponent } from 'src/app/compartido/componente/footer/footer.component';
import { CarritoService } from 'src/app/servicios/carrito';
import { AuthService } from 'src/app/servicios/auth';
import { Observable } from 'rxjs';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HeaderComponent, FooterComponent]
})
export class CarritoPage implements OnInit {

  carrito$!: Observable<any[]>;
  total = 0;

  constructor(
    private carritoService: CarritoService,
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    // Suscripción al observable del carrito
    this.carrito$ = this.carritoService.getCarrito();
    this.carrito$.subscribe(productos => {
      // Cada vez que cambia el carrito, recalculamos el total
      this.total = this.calcularTotal(productos);
    });
  }

  // Calcula el total de la compra sumando (precio * cantidad) de cada producto
  calcularTotal(productos: any[]): number {
    return productos.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
  }

  // Elimina un producto del carrito
  eliminarProducto(producto: any) {
    this.carritoService.eliminarProducto(producto);
    this.presentToast("Carrito vaciado"); // Muestra un mensaje de confirmación
  }

  // Vacía el carrito por completo
  vaciarCarrito() {
    this.carritoService.limpiarCarrito();
  }

  // Finaliza la compra y la registra en Firestore
  async finalizarCompra() {
    const user = this.authService.currentUser; // Usuario autenticado
    const productos = await firstValueFrom(this.carritoService.getCarrito()); // Obtiene los productos actuales del carrito

    // Solo procede si hay usuario logueado y productos en el carrito
    if (user && productos && productos.length > 0) {
      for (const producto of productos) {
        // Registra cada compra en Firestore
        await this.authService.registrarCompra(user.uid, producto.id);
      }
      this.presentCompraExitosaAlert(); // Muestra alerta de éxito
      this.carritoService.limpiarCarrito(); // Limpia el carrito después de la compra
      this.router.navigateByUrl('/inicio'); // Redirige al inicio
    } else {
      console.error("No se pudo completar la compra. Carrito vacío o usuario no autenticado.");
    }
  }

  // Muestra un popup de compra exitosa
  async presentCompraExitosaAlert() {
    const alert = await this.alertController.create({
      header: '¡Compra Exitosa!',
      message: 'Tu pedido ha sido procesado correctamente.',
      buttons: ['OK']
    });
    await alert.present();
  }

  // Muestra un toast (mensaje corto en la parte inferior)
  async presentToast(message: string, color: string = 'success') {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
      position: 'bottom',
      buttons: [{ text: 'Cerrar', role: 'cancel' }]
    });
    await toast.present();
  }

}

