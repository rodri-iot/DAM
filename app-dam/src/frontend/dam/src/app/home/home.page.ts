import { Component, OnInit } from '@angular/core';
import { DispositivoService } from '../services/dispositivo.service';
import { Dispositivo } from '../interfaces/dispositivo';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonList,
  IonToolbar,
  IonHeader,
  IonTitle,
  IonSpinner,
  IonContent,
  IonItem,
  IonLabel,
  IonButton,
  IonIcon, // Agregado
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonList,
    IonSpinner,
    IonItem,
    IonLabel,
    IonButton,
    IonIcon,
    CommonModule,
  ],
})
export class HomePage implements OnInit {
  dispositivos: Dispositivo[] = []; // Propiedad almacenar dispositivos


  constructor(
    private dispositivoService: DispositivoService, // Servicio para cargar dispositivos
    private router: Router // Router para navegar a los detalles
  ) {}


  // Método que se ejecuta al inicializar el componente
  isLoading: boolean = true;
  
  async ngOnInit() {
    try {
      this.dispositivos = await this.dispositivoService.getDispositivos(); // Llama al servicio y almacena los dispositivos
    } catch (error) {
      console.error('Error al cargar dispositivos:', error);
    } finally {
      this.isLoading = false;
    }
  }

  // Método para navegar a la página de detalles de un dispositivo
  verDetalle(dispositivoId: number) {
    this.router.navigate([`/dispositivo`, dispositivoId]); // Navega a /dispositivo/:id
  }

}