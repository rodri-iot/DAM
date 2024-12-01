import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DispositivoService } from '../services/dispositivo.service';
import { Dispositivo } from '../interfaces/dispositivo';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonButtons,
  IonIcon,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-dispositivo',
  templateUrl: './dispositivo.page.html',
  styleUrls: ['./dispositivo.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonButtons,
    IonIcon,
    CommonModule,
  ],
})
export class DispositivoPage implements OnInit {
  dispositivo!: Dispositivo;
  dispositivoId!: number;
  ultimaMedicion: { valor: number, fecha: string } | null = null;


  constructor(
    private route: ActivatedRoute,
    private dispositivoService: DispositivoService,
    private router: Router
  ) {}


  async ngOnInit() {
    this.dispositivoId = Number(this.route.snapshot.paramMap.get('id'));
    await this.cargarDispositivo();
    await this.cargarUltimaMedicion(); // Llamada para cargar ultima medicion
  }


  async cargarDispositivo() {
    try {
        // Obtener los detalles del dispositivo, incluyendo el estado de la válvula
        this.dispositivo = await this.dispositivoService.getDispositivoById(this.dispositivoId);
    
        // Obtener la última medición del dispositivo
        const ultimaMedicionData = await this.dispositivoService.getUltimaMedicion(this.dispositivoId);
        this.ultimaMedicion = ultimaMedicionData
            ? {
                valor: ultimaMedicionData.valor,
                fecha: new Date(ultimaMedicionData.fecha).toLocaleString('es-ES'), // Formatea fecha y hora
            }
            : null;
    
    } catch (error) {
        console.error('Error al cargar el dispositivo o la última medición:', error);
        this.ultimaMedicion = null; // Resetea la última medición en caso de error
    }
}

  
  
  

  async cambiarEstadoValvula(apertura: boolean) {
    try {
      await this.dispositivoService.cambiarEstadoValvula(this.dispositivoId, apertura);
      alert(`Válvula ${apertura ? 'abierta' : 'cerrada'} correctamente`);
      await this.cargarDispositivo(); // Actualiza la información del dispositivo
    } catch (error) {
      console.error('Error al cambiar el estado de la válvula:', error);
      alert('No se pudo cambiar el estado de la válvula.');
    }
  }
  

  verMediciones() {
    this.router.navigate([`/dispositivo`, this.dispositivoId, 'mediciones']);
  }


  async cargarUltimaMedicion() {
    try {
      const medicion = await this.dispositivoService.getUltimaMedicion(this.dispositivoId);
      this.ultimaMedicion = medicion ? { valor: medicion.valor, fecha: medicion.fecha } : null;
    } catch (error) {
      console.error('Error al cargar la última medición:', error);
      this.ultimaMedicion = null;
    }
  }

  // Método para regresar al inicio
  volverAlInicio() {
    this.router.navigate(['/home']);
  }
    
}
