import { Component, EventEmitter, Input, Output, output } from '@angular/core';
import { Dispositivo } from '../interfaces/dispositivo';

@Component({
  selector: 'app-dispositivo',
  standalone: true,
  imports: [],
  templateUrl: './dispositivo.component.html',
  styleUrl: './dispositivo.component.css'
})
export class DispositivoComponent {

  @Input()
  dispositivo: any

  onChange = output<any>()

  cambiarArea () {
    this.dispositivo.area = 'Área nueva'
    this.onChange.emit(this.dispositivo)
  }
}
