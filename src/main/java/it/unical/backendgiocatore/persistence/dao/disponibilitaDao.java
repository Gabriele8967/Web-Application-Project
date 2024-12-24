package it.unical.backendgiocatore.persistence.dao;

import it.unical.backendgiocatore.model.Disponibilita;

import java.util.List;

public interface disponibilitaDao {
    public List<Disponibilita> findAll();
    public int checkinAttesa(String orario, String data, int idCampo);
    public List<Integer> orariPrenotati(String data, int idCampo);
    public void save(Disponibilita disponibilita);
    public void delete(Disponibilita disponibilita);
}
