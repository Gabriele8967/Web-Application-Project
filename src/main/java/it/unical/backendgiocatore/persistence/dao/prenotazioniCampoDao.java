package it.unical.backendgiocatore.persistence.dao;

import it.unical.backendgiocatore.model.prenotazioniCampo;

import java.util.List;

public interface prenotazioniCampoDao {
    public List<prenotazioniCampo> findall();
    public List<prenotazioniCampo> findbystato(int stato);
    public List<prenotazioniCampo> findbyGiocatore(int idGiocatore);
    public boolean update(int pren,int gioc2);
    public boolean delete(int id);
}
