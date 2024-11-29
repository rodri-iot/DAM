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
    CommonModule,
  ],
})
export class DispositivoPage implements OnInit {
  dispositivo!: Dispositivo;
  dispositivoId!: number;
  ultimaMedicion: { valor: number } | null = null;


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
      this.dispositivo = await this.dispositivoService.getDispositivoById(
        this.dispositivoId
      );

      // Obtener la última medición del dispositivo
      const medicion = await this.dispositivoService.getUltimaMedicion(this.dispositivoId);
      this.ultimaMedicion = medicion ? { valor: medicion.valor } : null;

    } catch (error) {
      console.error('Error al cargar el dispositivo:', error);
    }
  }


  async cambiarEstadoValvula(apertura: boolean) {
    try {
      await this.dispositivoService.cambiarEstadoValvula(
        this.dispositivoId,
        apertura
      );
      alert(`Válvula ${apertura ? 'abierta' : 'cerrada'} correctamente`);
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
      this.ultimaMedicion = await this.dispositivoService.getUltimaMedicion(this.dispositivoId);
      console.log('Última medición cargada:', this.ultimaMedicion);
    } catch (error) {
      console.error('Error al cargar la última medición:', error);
    }
  }
  
    
}
