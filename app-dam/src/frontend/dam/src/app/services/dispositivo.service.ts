import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Dispositivo } from '../interfaces/dispositivo';

@Injectable({
  providedIn: 'root'
})
export class DispositivoService {

  constructor(private _http: HttpClient) { }

  // Obtener todos los dispositivos
/*
  getDispositivos(): Promise<{ dispositivoId: number; nombre: string; ubicacion: string; estadoValvula: number | null }[]> {
    return firstValueFrom(
      this._http.get<{ dispositivoId: number; nombre: string; ubicacion: string; estadoValvula: number | null }[]>(
        'http://localhost:8000/dispositivo'
      )
    );
}
*/
  getDispositivos(): Promise<Dispositivo[]> {
    return firstValueFrom(
      this._http.get<Dispositivo[]>('http://localhost:8000/dispositivo')
    );
}

// Obtener dispositivo por ID
/*
  getDispositivoById(id: number): Promise<{ dispositivoId: number; nombre: string; ubicacion: string; estadoValvula: number | null }> {
    return firstValueFrom(
      this._http.get<{ dispositivoId: number; nombre: string; ubicacion: string; estadoValvula: number | null }>(
      `http://localhost:8000/dispositivo/${id}`
    )
  );
}  
*/
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
  
  // Obtener mediciones
  getMediciones(id: number): Promise<{ medicionId: number; fecha: string; valor: string }[]> {
    return firstValueFrom(
      this._http.get<{ medicionId: number; fecha: string; valor: string }[]>(
        `http://localhost:8000/dispositivo/${id}/mediciones`
      )
    );
  }  
  
  // Obtener la ultima medicion
  getUltimaMedicion(dispositivoId: number): Promise<{ valor: number, fecha: string } | null> {
    return firstValueFrom(
      this._http.get<{ valor: number, fecha: string } | null>(
        `http://localhost:8000/dispositivo/${dispositivoId}/ultimaMedicion`
      )
    );
  }

  
}
