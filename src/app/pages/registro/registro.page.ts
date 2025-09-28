import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

// Importación de tu servicio de autenticación
import { AuthService } from 'src/app/servicios/auth';

// Importación de íconos de Ionicons
import { addIcons } from 'ionicons';
import { personOutline, callOutline, mailOutline, keyOutline } from 'ionicons/icons';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true, 
  imports: [IonicModule, CommonModule, FormsModule]
})
export class RegistroPage implements OnInit {

  // Objeto para almacenar los datos del formulario
  credenciales = {
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
    password: ''
  };

  constructor(
    private authService: AuthService, 
    private router: Router          
  ) {
    // Registrar íconos personalizados para usarlos en el HTML
    addIcons({ personOutline, callOutline, mailOutline, keyOutline });
  }

  ngOnInit() { }

  // Método para registrar al usuario
  async registrar() {
    // Verifica que al menos email y password no estén vacíos
    if (this.credenciales.email && this.credenciales.password) {
      
      // Llama al método registrar() en el servicio de autenticación
      const user = await this.authService.registrar(this.credenciales);

      // Si se crea el usuario correctamente, navega a la página de inicio
      if (user) {
        this.router.navigateByUrl('/inicio');
      } else {
        console.error('Error al registrar usuario.');
      }

    } else {
      console.error('El email y la contraseña son obligatorios.');
    }
  }
}

