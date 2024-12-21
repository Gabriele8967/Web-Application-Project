package it.unical.backendgiocatore.persistence.dao;

import it.unical.backendgiocatore.model.Giocatore;

import java.util.List;

public interface giocatoreDao {

  public List<Giocatore> findAll();
  public Giocatore findByName(String username);
  public Giocatore findByPrimaryKey(int idGiocatore);
  public List<Giocatore> findByLevel(int level);
  public boolean save(Giocatore giocatore);
  public boolean delete(Giocatore giocatore);
}
