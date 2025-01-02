package it.unical.backendgiocatore.persistence.db;
import it.unical.backendgiocatore.model.Giocatore;
import it.unical.backendgiocatore.persistence.DBManager;
import it.unical.backendgiocatore.persistence.dao.giocatoreDao;
import it.unical.backendgiocatore.util.PasswordCrypt;
import it.unical.backendgiocatore.services.emailService;

import java.security.SecureRandom;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class giocatoreDaoDB implements giocatoreDao {
  private final Connection conn;
  PasswordCrypt p = new PasswordCrypt();
  emailService EmailService = new emailService();

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

      while (rs.next()) {
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
          giocatore.setOtp(rs.getString("password"));
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
  public Integer findIdByEmail(String email) {
    Integer id = null;  // Inizializziamo l'ID a null
    String query = "SELECT id FROM giocatore WHERE email = ?";

    try (PreparedStatement ps = conn.prepareStatement(query)) {
      // Imposta il parametro email nella query
      ps.setString(1, email);

      // Esegui la query
      try (ResultSet rs = ps.executeQuery()) {
        if (rs.next()) {
          // Recupera l'ID del giocatore
          id = rs.getInt("id");
        }
      }
    } catch (SQLException e) {
      System.err.println("Errore durante l'esecuzione della query: " + e.getMessage());
    }

    return id;  // Restituisce solo l'ID
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
      ps.setString(4, p.encode(giocatore.getPassword()));
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

  @Override
  public boolean riceviOTP(String email,String newOtp) {
    boolean success = false;  // Variabile per determinare se l'operazione è riuscita
    String updateQuery = "UPDATE giocatore SET otp = ?, otp_expiry = NOW() + INTERVAL '10 minutes' WHERE email = ?";

    try {
      // Recupera il giocatore dal database usando l'email
      Giocatore giocatore = DBManager.getInstance().getGiocatoreDao().findByEmail(email);

      if (giocatore == null) {
        // Se il giocatore non esiste, ritorna false
        System.err.println("Giocatore non trovato per l'email: " + email);
        return false;
      }



      String nuovaOTP = newOtp;

      // Esegui l'aggiornamento della password nel database
      try (PreparedStatement ps = conn.prepareStatement(updateQuery)) {
        ps.setString(1, nuovaOTP);
        ps.setString(2, email);

        int rowsUpdated = ps.executeUpdate();  // Esegui la query di aggiornamento

        if (rowsUpdated > 0) {

          success = true;
          System.out.println("OTP aggiornata con successo per: " + email);
        } else {
          System.err.println("Errore nell'aggiornamento della OTP per: " + email);
        }
      }
    } catch (SQLException e) {
      System.err.println("Errore durante l'aggiornamento della OTP: " + e.getMessage());
    }

    return success;
  }

  @Override
  public boolean verificaOtp(String email, String otp) {
    boolean isOtpCorrect = false;
    String query = "SELECT otp FROM giocatore WHERE email = ?";

    try (PreparedStatement ps = conn.prepareStatement(query)) {
      ps.setString(1, email);  // Imposta l'email nella query

      try (ResultSet rs = ps.executeQuery()) {
        if (rs.next()) {
          String otpFromDb = rs.getString("otp");  // Recupera l'OTP memorizzato nel database

          // Confronta l'OTP ricevuto con quello memorizzato nel database
          if (otp.equals(otpFromDb)) {
            isOtpCorrect = true;  // L'OTP è corretto
          } else {
            System.err.println("OTP errata per l'email: " + email);
            System.err.println("OTP from DB: " + otpFromDb);
            System.err.println("OTP fornita: " + otp);
          }
        } else {
          System.err.println("Nessun giocatore trovato con l'email: " + email);
        }
      }
    } catch (SQLException e) {
      System.err.println("Errore durante la verifica dell'OTP: " + e.getMessage());
    }

    return isOtpCorrect;  }
  @Override
  public boolean aggiornaPassword(String email, String password) {
    String query = "UPDATE giocatore SET password = ? WHERE email = ?";
    boolean risultato = false;

    try (PreparedStatement ps = conn.prepareStatement(query)) {
      // Codifica la password prima di salvarla nel database
      String passwordCodificata = p.encode(password);

      // Imposta i parametri nella query
      ps.setString(1, passwordCodificata);
      ps.setString(2, email);

      // Esegui l'operazione di aggiornamento
      int rowsAffected = ps.executeUpdate();
      if (rowsAffected > 0) {
        risultato = true; // Aggiornamento riuscito
        System.out.println("Password aggiornata con successo per: " + email);
      } else {
        System.err.println("Nessun giocatore trovato con l'email: " + email);
      }
    } catch (SQLException e) {
      System.err.println("Errore durante l'aggiornamento della password: " + e.getMessage());
    }

    return risultato;
  }

  @Override
  public boolean aggiornaEmail(String oldEmail, String newEmail) {
    String query = "UPDATE giocatore SET email = ? WHERE email = ?";
    boolean risultato = false;
    System.out.println("Old email: " + oldEmail);
    System.out.println("New email: " + newEmail);

    try (PreparedStatement ps = conn.prepareStatement(query)) {
      // Codifica la password prima di salvarla nel database


      // Imposta i parametri nella query
      ps.setString(1, newEmail);
      ps.setString(2, oldEmail);

      // Esegui l'operazione di aggiornamento
      int rowsAffected = ps.executeUpdate();
      if (rowsAffected > 0) {
        risultato = true; // Aggiornamento riuscito
        System.out.println("Email aggiornata con successo per: " + oldEmail);
      } else {
        System.err.println("Nessun giocatore trovato con l'email: " + oldEmail);
      }
    } catch (SQLException e) {
      System.err.println("Errore durante l'aggiornamento della email: " + e.getMessage());
    }

    return risultato;
  }

  @Override
  public boolean aggiornaUsername(String email, String username) {
    String query = "UPDATE giocatore SET username = ? WHERE email = ?";
    boolean risultato = false;


    try (PreparedStatement ps = conn.prepareStatement(query)) {
      // Codifica la password prima di salvarla nel database


      // Imposta i parametri nella query
      ps.setString(1, username);
      ps.setString(2, email);

      // Esegui l'operazione di aggiornamento
      int rowsAffected = ps.executeUpdate();
      if (rowsAffected > 0) {
        risultato = true; // Aggiornamento riuscito
        System.out.println("Username aggiornato con successo per: " + email);
      } else {
        System.err.println("Nessun giocatore trovato con l'email: " + email);
      }
    } catch (SQLException e) {
      System.err.println("Errore durante l'aggiornamento della email: " + e.getMessage());
    }

    return risultato;
  }

  @Override
  public boolean aggiornaNumero(String email, String telefono) {
    String query = "UPDATE giocatore SET telefono = ? WHERE email = ?";
    boolean risultato = false;


    try (PreparedStatement ps = conn.prepareStatement(query)) {
      // Codifica la password prima di salvarla nel database


      // Imposta i parametri nella query
      ps.setString(1, telefono);
      ps.setString(2, email);


      // Esegui l'operazione di aggiornamento
      int rowsAffected = ps.executeUpdate();
      if (rowsAffected > 0) {
        risultato = true; // Aggiornamento riuscito
        System.out.println("Numero di telefono aggiornato con successo per: " + email);
      } else {
        System.err.println("Nessun giocatore trovato con l'email: " + email);
      }
    } catch (SQLException e) {
      System.err.println("Errore durante l'aggiornamento del numero di telefono: " + e.getMessage());
    }

    return risultato;
  }

}