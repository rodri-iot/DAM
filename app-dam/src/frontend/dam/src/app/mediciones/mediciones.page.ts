import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DispositivoService } from '../services/dispositivo.service';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonList,
  IonItem,
  IonLabel,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mediciones',
  templateUrl: './mediciones.page.html',
  styleUrls: ['./mediciones.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonList,
    IonItem,
    IonLabel,
    CommonModule,
  ],
})
export class MedicionesPage implements OnInit {
  dispositivoId!: number;
  mediciones: { medicionId: number; fecha: string; valor: string }[] = [];

  constructor(
    private route: ActivatedRoute,
    private dispositivoService: DispositivoService
  ) {}

  async ngOnInit() {
    this.dispositivoId = Number(this.route.snapshot.paramMap.get('id'));
    await this.cargarMediciones();
  }

  async cargarMediciones() {
    try {
      this.mediciones = await this.dispositivoService.getMediciones(
        this.dispositivoId
      );
    } catch (error) {
      console.error('Error al cargar las mediciones:', error);
    }
  }
}


