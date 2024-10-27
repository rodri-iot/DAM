import { Injectable } from '@angular/core';
import { Dispositivo } from '../interfaces/dispositivo';

@Injectable({
  providedIn: 'root'
})
export class DispositivosService {

  getDispositivos (): Dispositivo[] {
    return [
      {
        id: 1,
        area: 'Patio',
        description: 'Sensor 1 del patio'
      },
      {
        id: 2,
        area: 'Patio',
        description: 'Sensor 2 del patio'
      }
    ]
  }

  constructor() { }
}
