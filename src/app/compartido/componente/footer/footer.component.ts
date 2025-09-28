import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { cartOutline, homeOutline, personOutline } from 'ionicons/icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class FooterComponent implements OnInit {

  constructor(private router: Router) {
    addIcons({ cartOutline, homeOutline, personOutline });
  }

  ngOnInit() { }

  navegarA(ruta: string) {
    this.router.navigateByUrl(ruta)
  }
}
