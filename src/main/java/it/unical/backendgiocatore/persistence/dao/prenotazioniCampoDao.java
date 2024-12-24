package it.unical.backendgiocatore.persistence.dao;

import it.unical.backendgiocatore.model.prenotazioniCampo;

import java.util.List;

public interface prenotazioniCampoDao {
    public List<prenotazioniCampo> findall();
    public List<prenotazioniCampo> findbystato(int stato);
    public boolean update(int stato,int gioc2,int id);
    public void delete(int id);
}
