import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

// Servicio de autenticación que maneja login y registro
import { AuthService } from 'src/app/servicios/auth';

// Funciones e íconos de Ionicons (para los iconos de email y contraseña)
import { addIcons } from 'ionicons';
import { keyOutline, mailOutline } from 'ionicons/icons';

// Router para manejar la navegación entre páginas
import { Router } from '@angular/router';

// Decorador @Component define la configuración del componente
@Component({
  selector: 'app-login',                     
  templateUrl: './login.page.html',    
  styleUrls: ['./login.page.scss'],     
  standalone: true,                          
  imports: [IonicModule, CommonModule, FormsModule] 
})
export class LoginPage implements OnInit {
  // Objeto para guardar las credenciales que ingrese el usuario
  credenciales = {
    email: '',
    password: ''
  };

  // Inyectamos los servicios necesarios en el constructor
  constructor(
    private authService: AuthService,  
    private router: Router             
  ) {
    // Registramos los iconos que se van a usar en el HTML
    addIcons({ keyOutline, mailOutline });
  }

  ngOnInit() { }

  // Método que redirige a la página de registro
  goToRegistro() {
    this.router.navigateByUrl('/registro');
  }

  // Método asincrónico que se ejecuta al hacer clic en "Iniciar Sesión"
  async iniciarSesion() {
    // Verifica que el usuario haya ingresado email y contraseña
    if (this.credenciales.email && this.credenciales.password) {
      // Llama al servicio de autenticación y espera la respuesta
      const user = await this.authService.login(this.credenciales);

      // Si el login es exitoso, navega a la página de inicio
      if (user) {
        this.router.navigateByUrl('/inicio');
      } else {
        // Si las credenciales son incorrectas, muestra un error en consola
        console.error('Error al iniciar sesión. Verifica tus credenciales.');
      }
    } else {
      // Si los campos están vacíos, muestra un error en consola
      console.error('El email y la contraseña son obligatorios.');
    }
  }
}

