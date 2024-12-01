export interface Dispositivo {
    dispositivoId: number;
    nombre: string;
    ubicacion: string;
    electrovalvulaId: number;
    estadoValvula: number | null; // Agrega este campo si no está
  }
  