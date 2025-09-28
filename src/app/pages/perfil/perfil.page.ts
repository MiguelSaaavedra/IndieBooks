import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from 'src/app/compartido/componente/header/header.component';
import { FooterComponent } from 'src/app/compartido/componente/footer/footer.component';
import { getDoc, doc } from '@angular/fire/firestore';
import { AuthService } from 'src/app/servicios/auth';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { personOutline, callOutline, mailOutline, keyOutline } from 'ionicons/icons';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true, 
  imports: [IonicModule, CommonModule, FormsModule, HeaderComponent, FooterComponent]
})
export class PerfilPage implements OnInit {

  // Objeto que almacena los datos del usuario
  datosUsuario = {
    nombre: '',
    apellido: '',
    telefono: '',
    email: ''
  };

  constructor(
    private authService: AuthService, // Servicio de autenticación
    private router: Router            // Servicio de navegación
  ) {
    // Registro de iconos usados en la página
    addIcons({ personOutline, callOutline, mailOutline, keyOutline });
  }

  // Método que se ejecuta al inicializar la página
  ngOnInit() {
    this.cargarDatosUsuario(); // Carga los datos del usuario al abrir el perfil
  }

  // Carga los datos del usuario autenticado desde Firestore
  async cargarDatosUsuario() {
    const user = this.authService.currentUser; // Obtiene usuario actual

    if (user) {
      // Referencia al documento del usuario en la colección "usuarios"
      const userRef = doc(this.authService.firestoreInstance, 'usuarios', user.uid);

      // Obtiene los datos desde Firestore
      const userDoc = await getDoc(userRef);

      // Si existen datos, los asigna al modelo "datosUsuario"
      if (userDoc.exists()) {
        const data = userDoc.data();
        this.datosUsuario.nombre = data['nombre'];
        this.datosUsuario.apellido = data['apellido'];
        this.datosUsuario.telefono = data['telefono'];
        this.datosUsuario.email = user.email || ''; // El email viene del auth
      }
    }
  }

  // Guarda los cambios en el perfil del usuario
  async guardarCambios() {
    const user = this.authService.currentUser;

    if (user) {
      // Llama al servicio de auth para actualizar los datos
      const exito = await this.authService.actualizarPerfil(user.uid, this.datosUsuario);

      if (exito) {
        console.log('Perfil actualizado con éxito');
      } else {
        console.error('No se pudo actualizar el perfil');
      }
    }
  }

  // Cierra la sesión y redirige al login
  async cerrarSesion() {
    await this.authService.logout();
    this.router.navigateByUrl('/login');
  }

}
