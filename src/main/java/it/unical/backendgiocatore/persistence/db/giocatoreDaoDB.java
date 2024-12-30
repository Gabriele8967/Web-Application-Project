package it.unical.backendgiocatore.persistence.db;
import it.unical.backendgiocatore.model.Giocatore;
import it.unical.backendgiocatore.persistence.dao.giocatoreDao;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class giocatoreDaoDB implements giocatoreDao {
  private final Connection conn;
  public giocatoreDaoDB(Connection connection) {
    this.conn = connection;
  }

  @Override
  public List<Giocatore> findAll() {
    List<Giocatore> giocatori = new ArrayList<>();
    String query = "SELECT * FROM giocatore";

    try {
      Statement st = conn.createStatement();
      ResultSet rs = st.executeQuery(query);

      while (rs.next()){
        Giocatore giocatore = new Giocatore();
        giocatore.setId(rs.getInt("id"));
        giocatore.setNome(rs.getString("nome"));
        giocatore.setCognome(rs.getString("cognome"));
        giocatore.setEmail(rs.getString("email"));
        giocatore.setUsername(rs.getString("username"));
        giocatore.setLivello(rs.getInt("livello"));
        giocatore.setTelefono(rs.getString("telefono"));
        giocatore.setImmagine_profilo(rs.getString("immagine_profilo"));
        giocatori.add(giocatore);
      }
    } catch (SQLException e) {
      throw new RuntimeException(e);
    }
    return giocatori;
  }

  @Override
  public Giocatore findByName(String username) {
    return null;
  }

  @Override
  public Giocatore findByPrimaryKey(int idGiocatore) {
    Giocatore giocatore = null;
    String query = "SELECT * FROM giocatore WHERE id = ?";
    try {
      PreparedStatement ps = conn.prepareStatement(query);
      ps.setInt(1, idGiocatore);
      ResultSet rs = ps.executeQuery();
      if (rs.next()) {
        giocatore = new Giocatore();
        giocatore.setId(rs.getInt("id"));
        giocatore.setNome(rs.getString("nome"));
        giocatore.setCognome(rs.getString("cognome"));
        giocatore.setEmail(rs.getString("email"));
        giocatore.setUsername(rs.getString("username"));
        giocatore.setLivello(rs.getInt("livello"));
        giocatore.setTelefono(rs.getString("telefono"));
        giocatore.setImmagine_profilo(rs.getString("immagine_profilo"));
      }

    } catch (SQLException e) {
      throw new RuntimeException("Errore durante il recupero delle abilità", e);
    }
    return giocatore;
  }

  @Override
  public List<Giocatore> findByLevel(int level) {

    return List.of();
  }

  @Override
  public boolean save(Giocatore giocatore) {

    return false;
  }

  @Override
  public boolean delete(Giocatore giocatore) {

    return false;
  }
  @Override
  public Giocatore findByEmail(String email) {
    Giocatore giocatore = null;
    String query = "SELECT * FROM giocatore WHERE email = ?";

    try (PreparedStatement ps = conn.prepareStatement(query)) {
      // Imposta il parametro email nella query
      ps.setString(1, email);

      // Esegui la query
      try (ResultSet rs = ps.executeQuery()) {
        if (rs.next()) {
          // Crea un nuovo oggetto Giocatore e popola i dati
          giocatore = new Giocatore();
          giocatore.setId(rs.getInt("id"));
          giocatore.setNome(rs.getString("nome"));
          giocatore.setCognome(rs.getString("cognome"));
          giocatore.setEmail(rs.getString("email"));
          giocatore.setPassword(rs.getString("password"));
          giocatore.setUsername(rs.getString("username"));
          giocatore.setLivello(rs.getInt("livello"));
          giocatore.setTelefono(rs.getString("telefono"));
          giocatore.setImmagine_profilo(rs.getString("immagine_profilo"));
        }
      }
    } catch (SQLException e) {
      System.err.println("Errore durante l'esecuzione della query: " + e.getMessage());
    }

    return giocatore;
  }

  @Override
  public boolean inserisciGiocatore(Giocatore giocatore) {
    String query = "INSERT INTO giocatore (nome, cognome, email, password, username, livello, telefono, immagine_profilo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    boolean risultato = false;

    try (PreparedStatement ps = conn.prepareStatement(query)) {
      // Imposta i parametri nella query
      ps.setString(1, giocatore.getNome());
      ps.setString(2, giocatore.getCognome());
      ps.setString(3, giocatore.getEmail());
      ps.setString(4, giocatore.getPassword());
      ps.setString(5, giocatore.getUsername());
      ps.setInt(6, giocatore.getLivello());
      ps.setString(7, giocatore.getTelefono());
      ps.setString(8, giocatore.getImmagine_profilo());

      // Esegui l'operazione di inserimento
      int rowsAffected = ps.executeUpdate();
      if (rowsAffected > 0) {
        risultato = true; // Inserimento riuscito
      }
    } catch (SQLException e) {
      System.err.println("Errore durante l'inserimento del giocatore: " + e.getMessage());
    }

    return risultato;
  }


}
