export interface Field {

  //concettualmente va cambiato nome, non è Campo, ma è prenotazione
  id: number;
  date: string;
  time: number;
  idGiocatore1?: number;
  idGiocatore2?: number; //Potrebbe anche essere undefined
  idMaestro?: number;  // Potrebbe essere undefined
  tipoPrenotazione?: number; //potrebbe anche essere undefined
  tipoSport: string;
  tipoSuperficie: string;
  image: string;
  name: string;
  isOccupied: boolean;
  DayTime: number;
}