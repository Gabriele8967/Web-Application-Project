package it.unical.backendgiocatore.persistence;

import it.unical.backendgiocatore.persistence.dao.abilitaDao;
import it.unical.backendgiocatore.persistence.dao.giocatoreDao;
import it.unical.backendgiocatore.persistence.db.abilitaDaoDB;
import it.unical.backendgiocatore.persistence.db.giocatoreDaoDB;

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
        conn = DriverManager.getConnection("jdbc:postgresql://localhost:5432/easymatchdb", "postgres", "mimmopost");
        System.out.println("Connessione al database stabilita con successo.");
      } catch (SQLException e) {
        e.printStackTrace();
        System.out.println("Errore durante la connessione al database.");
      }
    }
    return conn;
  }

  public giocatoreDao getGiocatoreDao(){return new giocatoreDaoDB(getConnection());}
  public abilitaDao getAbilitaDao(){return new abilitaDaoDB(getConnection());}

}
