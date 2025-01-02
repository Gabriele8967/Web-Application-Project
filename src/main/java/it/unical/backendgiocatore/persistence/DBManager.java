package it.unical.backendgiocatore.persistence;
import it.unical.backendgiocatore.model.Giocatore;
import it.unical.backendgiocatore.persistence.dao.*;
import it.unical.backendgiocatore.persistence.db.*;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBManager {
  private static DBManager instance = null;

  public static DBManager getInstance() {
    if (instance == null) {
      instance = new DBManager();
    }
    return instance;
  }

  private DBManager() {
  }

  Connection conn = null;

  public Connection getConnection() {
    if (conn == null) {
      try {
        conn = DriverManager.getConnection("jdbc:postgresql://localhost:5432/easymatch", "postgres", "Lamela@10");
        System.out.println("Connessione al database stabilita con successo.");
        giocatoreDao giocatoreDao = new giocatoreDaoDB(conn);

        String testEmail = "dom@prova.it";
        Giocatore giocatore = giocatoreDao.findByEmail(testEmail);
        if (giocatore != null) {
          System.out.println("Giocatore trovato:");

        } else {
          System.out.println("Nessun giocatore trovato con l'email: " + testEmail);
        }
      } catch (SQLException e) {
        e.printStackTrace();
        System.out.println("Errore durante la connessione al database.");
      }
    }
    return conn;
  }

  public giocatoreDao getGiocatoreDao(){return new giocatoreDaoDB(getConnection());}
  public abilitaDao getAbilitaDao(){return new abilitaDaoDB(getConnection());}
  public campoDao getCampoDao(){return new campoDaoDB(getConnection());}
  public disponibilitaDao getDisponibilitaDao(){return new disponibilitaDaoDB(getConnection());}
  public prenotazioniCampoDao getPrenotazioniCampoDao(){return new prenotazioniCampoDaoDB(getConnection());}

}
