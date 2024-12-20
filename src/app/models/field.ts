export interface Field {
  image: string;
  name: string;
  id: number;
  isOccupied: boolean;
  date: number;
  time: number;
  idGiocatore1: number;
  idGiocatore2: number;
  idMaestro?: number;  // Potrebbe essere undefined
  DayTime: number;
}
