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
  Giocatore findByEmail(String email);
  Integer findIdByEmail(String email);

  boolean inserisciGiocatore(Giocatore giocatore);
  boolean riceviOTP(String email,String otp);
  boolean verificaOtp(String email, String otp);
  boolean aggiornaPassword(String email,String password);
  boolean aggiornaEmail(String oldEmail, String newEmail);
  boolean aggiornaUsername(String email, String username);
  boolean aggiornaNumero(String email, String telefono);
}
