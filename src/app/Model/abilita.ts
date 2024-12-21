import {Giocatore} from './giocatore';

export interface Abilita {
  giocatore: Giocatore;
  dritto: number;
  rovescio: number;
  servizio: number;
  slice: number;
  palla_corta: number;
  resistenza: number;

}
