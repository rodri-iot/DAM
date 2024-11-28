import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Dispositivo } from '../interfaces/dispositivo';

@Injectable({
  providedIn: 'root'
})
export class DispositivoService {

  constructor(private _http: HttpClient) { }

  // Especifica que el método devuelve un Promise<Dispositivo[]>
  getDispositivos(): Promise<Dispositivo[]> {
    return firstValueFrom(
      this._http.get<Dispositivo[]>('http://localhost:8000/dispositivo')
    );
  }

  getDispositivoById(id: number): Promise<Dispositivo> {
    return firstValueFrom(
      this._http.get<Dispositivo>(`http://localhost:8000/dispositivo/${id}`)
    );
  }
  

  // Cambiar el estado de la valvula  
  cambiarEstadoValvula(id: number, apertura: boolean): Promise<void> {
    return firstValueFrom(
      this._http.post<void>(
        `http://localhost:8000/dispositivo/${id}/valvula`,
        { apertura: apertura ? 1 : 0 }
      )
    );
  }
  
  getMediciones(id: number): Promise<{ medicionId: number; fecha: string; valor: string }[]> {
    return firstValueFrom(
      this._http.get<{ medicionId: number; fecha: string; valor: string }[]>(
        `http://localhost:8000/dispositivo/${id}/mediciones`
      )
    );
  }  
  
}
