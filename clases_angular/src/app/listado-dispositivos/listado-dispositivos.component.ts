import { Component } from '@angular/core';
import { LoggerService } from '../services/logger.service';
import { DispositivosService } from '../services/dispositivos.service';
import { Dispositivo } from '../interfaces/dispositivo';
import { CommonModule, UpperCasePipe } from '@angular/common';
import { ElevarPipe } from '../pipes/elevar.pipe';
import { ColorearDirective } from '../directives/colorear.directive';
import { DispositivoComponent } from '../dispositivo/dispositivo.component';

@Component({
  selector: 'app-listado-dispositivos',
  standalone: true,
  imports: [UpperCasePipe, ElevarPipe, ColorearDirective, CommonModule,
    DispositivoComponent
  ],
  templateUrl: './listado-dispositivos.component.html',
  styleUrl: './listado-dispositivos.component.css'
})
export class ListadoDispositivosComponent {

  dispositivos: Dispositivo[] = []
  numero: number = 2
  mostrar: boolean = true

  constructor (public serviceLogger: LoggerService, private _serviceDispositivos: DispositivosService) {

  }

  manejador (eventData: any) {
    this.serviceLogger.logInfo(eventData)
  }

  toogle () {
    this.mostrar = !this.mostrar
  }

  getDispositivos () {
    this.dispositivos = this._serviceDispositivos.getDispositivos()
  }
}
