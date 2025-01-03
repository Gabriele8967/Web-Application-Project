package it.unical.backendgiocatore.RESTcontroller;

import it.unical.backendgiocatore.model.Giocatore;
import it.unical.backendgiocatore.persistence.DBManager;
import it.unical.backendgiocatore.services.emailService; // Cambia il nome della classe in maiuscolo, seguendo la convenzione Java
import it.unical.backendgiocatore.services.emailUpdateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import it.unical.backendgiocatore.util.PasswordCrypt;
import org.springframework.web.bind.annotation.*;

import java.security.SecureRandom;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/api")
public class giocatoreRESTController {

  private final PasswordCrypt p = new PasswordCrypt();

  @Autowired
  private emailService EmailService;  // Utilizza @Autowired per l'iniezione delle dipendenze

  @GetMapping("/giocatori")
  public List<Giocatore> getGiocatori() {
    return DBManager.getInstance().getGiocatoreDao().findAll();
  }

  @GetMapping("/giocatori/{id}")
  public Giocatore getDatiGiocatore(@PathVariable int id) {
    return DBManager.getInstance().getGiocatoreDao().findByPrimaryKey(id);
  }

  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody Giocatore loginRequest) {
    String email = loginRequest.getEmail();
    String password = loginRequest.getPassword();

    System.out.println("Login Request - Email: " + email + " Password: " + password);

    Giocatore giocatore = DBManager.getInstance().getGiocatoreDao().findByEmail(email);

    if (giocatore != null && p.matches(password, giocatore.getPassword())) {
      //EmailService.sendEmail(
      //      giocatore.getEmail(),
      //    "Conferma Accesso",
      //  "Benvenuto! Il tuo Login è avvenuto con successo."
      //);
      System.out.println("Login riuscito per: " + email);
      return ResponseEntity.ok(giocatore);
    } else {
      System.out.println(password);
      System.out.println(giocatore.getPassword());
      System.out.println("Login fallito per: " + email);
      return ResponseEntity.status(401).body("Email o password errati");
    }
  }

  @PostMapping("/id")
  public ResponseEntity<?> getIdByEmail(@RequestBody Giocatore nameRequest) {
    String email = nameRequest.getEmail();

    System.out.println("Request ricevuta per ottenere l'Id - Email: " + email);

    // Recupera il giocatore dal database
    Integer id = DBManager.getInstance().getGiocatoreDao().findIdByEmail(email);

    if (id != null) {
      return ResponseEntity.ok(id);
    } else {
      System.out.println("Giocatore non trovato per l'email: " + email);
      return ResponseEntity.status(404).body("Giocatore non trovato");
    }
  }

  @PostMapping("/registrazione")
  public ResponseEntity<?> registrazione(@RequestBody Giocatore nuovoGiocatore) {
    System.out.println("Registrazione richiesta per: " + nuovoGiocatore.getEmail());

    Giocatore giocatoreEsistente = DBManager.getInstance().getGiocatoreDao().findByEmail(nuovoGiocatore.getEmail());

    if (giocatoreEsistente != null) {
      System.out.println("Registrazione fallita: email già in uso.");
      return ResponseEntity.status(409).body("Email già registrata");
    }

    boolean inserito = DBManager.getInstance().getGiocatoreDao().inserisciGiocatore(nuovoGiocatore);

    if (inserito) {
      System.out.println("Registrazione riuscita per: " + nuovoGiocatore.getEmail());
      return ResponseEntity.status(201).body("Giocatore registrato con successo");
    } else {
      System.out.println("Errore durante la registrazione del giocatore.");
      return ResponseEntity.status(500).body("Errore durante la registrazione del giocatore");
    }
  }

  @PostMapping("/sendOtp")
  public ResponseEntity<?> sendOtp(@RequestBody String email) {
    System.out.println("Funzione chiamata con email: " + email);

    // Verifica che l'email non sia null o vuota
    if (email == null || email.isEmpty()) {
      System.out.println("Email empty");
      return ResponseEntity.badRequest().body("Email non può essere vuota.");
    }

    Giocatore giocatore = DBManager.getInstance().getGiocatoreDao().findByEmail(email);

    if (giocatore == null) {
      System.out.println("Giocatore non trovato");
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Giocatore non trovato con l'email fornita");
    }

    String caratteriPossibili = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    SecureRandom random = new SecureRandom(); // Usa SecureRandom per una migliore casualità

    StringBuilder sb = new StringBuilder(10);

    // Costruisci la stringa casuale
    for (int i = 0; i < 10; i++) {
      int indice = random.nextInt(caratteriPossibili.length());
      sb.append(caratteriPossibili.charAt(indice));
    }

    boolean otpAggiornata = DBManager.getInstance().getGiocatoreDao().riceviOTP(email, sb.toString());


    if (otpAggiornata) {
      System.out.println("OTP aggiornata");
      EmailService.sendEmail(
              giocatore.getEmail(),
              "OTP Aggiornata",
              "L'OTP è stata ricevuta con successo." +
                      "Nuova OTP: " + sb.toString()
      );
      return ResponseEntity.ok("OTP aggiornata con successo.");
    } else {
      System.out.println("OTP non aggiornata");
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Errore nell'aggiornamento della OTP");
    }
  }


  @PostMapping("/verifyOtp")
  public ResponseEntity<?> verifyOtp(@RequestBody Giocatore otpRequest) {
    String email = otpRequest.getEmail();
    String otp = otpRequest.getOtp();

    System.out.println("OTP Request - Email: " + email + " OTP: " + otp);

    // Verifica l'OTP nel DAO
    boolean otpValido = DBManager.getInstance().getGiocatoreDao().verificaOtp(email, otp);

    if (otpValido) {
      System.out.println("OTP corretta per: " + email);
      // Se l'OTP è valido, ritorna una risposta positiva
      return ResponseEntity.ok("OTP verificata con successo");
    } else {
      // Se l'OTP non è corretto, ritorna un errore
      System.out.println("OTP errata per: " + email);
      return ResponseEntity.status(401).body("Email o OTP errati");
    }
  }
  @PostMapping("/updatePassword")
  public ResponseEntity<?> updatePassword(@RequestBody Giocatore passwordUpdate) {
    String email = passwordUpdate.getEmail();
    String password = passwordUpdate.getPassword();

    System.out.println("Aggiornamento password richiesto per: " + email);

    Giocatore giocatoreEsistente = DBManager.getInstance().getGiocatoreDao().findByEmail(email);

    if (giocatoreEsistente == null) {
      System.out.println("Registrazione fallita: il giocatore richiesto non esiste.");
      return ResponseEntity.status(409).body("Giocatore non esistente");
    }

    boolean aggiornata = DBManager.getInstance().getGiocatoreDao().aggiornaPassword(email,password);

    if (aggiornata) {
      System.out.println("Password aggiornata per: " + email);
      return ResponseEntity.status(201).body("Password aggiornata con successo");
    } else {
      System.out.println("Errore durante l'aggiornamento della Password.");
      return ResponseEntity.status(500).body("Errore durante l'aggiornamento della Password");
    }
  }


  @PostMapping("/updateEmail")
  public ResponseEntity<?> updateEmail(@RequestBody emailUpdateService emailUp) {

    emailUp.getOldEmail();
    emailUp.getOldEmail();
    System.out.println("Aggiornamento email richiesto per: " + emailUp.getOldEmail());

    Giocatore giocatoreEsistente = DBManager.getInstance().getGiocatoreDao().findByEmail(emailUp.getOldEmail());

    if (giocatoreEsistente == null) {
      System.out.println("Registrazione fallita: il giocatore richiesto non esiste.");
      return ResponseEntity.status(409).body("Giocatore non esistente");
    }

    boolean aggiornata = DBManager.getInstance().getGiocatoreDao().aggiornaEmail(emailUp.getOldEmail(),emailUp.getNewEmail());

    if (aggiornata) {
      System.out.println("Email aggiornata per: " + emailUp.getOldEmail()+" Nuova Email"+emailUp.getNewEmail());
      return ResponseEntity.status(201).body("Email aggiornata con successo");
    } else {
      System.out.println("Errore durante l'aggiornamento della Email.");
      return ResponseEntity.status(500).body("Errore durante l'aggiornamento della Email");
    }
  }


  @PostMapping("/updateUsername")
  public ResponseEntity<?> updateUsername(@RequestBody Giocatore userUpdate) {

    userUpdate.getEmail();
    userUpdate.getUsername();
    System.out.println("Aggiornamento username richiesto per: " +  userUpdate.getEmail());

    Giocatore giocatoreEsistente = DBManager.getInstance().getGiocatoreDao().findByEmail( userUpdate.getEmail());

    if (giocatoreEsistente == null) {
      System.out.println("Registrazione fallita: il giocatore richiesto non esiste.");
      return ResponseEntity.status(409).body("Giocatore non esistente");
    }

    boolean aggiornata = DBManager.getInstance().getGiocatoreDao().aggiornaUsername( userUpdate.getEmail(),  userUpdate.getUsername());

    if (aggiornata) {
      System.out.println("Username aggiornata per: " +userUpdate.getEmail()+" Nuovo Username"+ userUpdate.getUsername());
      return ResponseEntity.status(201).body("Username aggiornato con successo");
    } else {
      System.out.println("Errore durante l'aggiornamento dello Username.");
      return ResponseEntity.status(500).body("Errore durante l'aggiornamento dello Username");
    }
  }
  @PostMapping("/updateNumber")
  public ResponseEntity<?> updateNumber(@RequestBody List<String> payload) {
    if (payload == null || payload.size() < 2) {
      return ResponseEntity.status(400).body("Payload non valido. Deve contenere email e numero.");
    }

    String email = payload.get(0);
    String number = payload.get(1);

    System.out.println("Aggiornamento numero di telefono richiesto per: " + email);

    Giocatore giocatoreEsistente = DBManager.getInstance().getGiocatoreDao().findByEmail(email);

    if (giocatoreEsistente == null ) {
      System.out.println("Registrazione fallita: il giocatore richiesto non esiste.");
      return ResponseEntity.status(409).body("Giocatore non esistente");
    }

    boolean aggiornata = DBManager.getInstance().getGiocatoreDao().aggiornaTelefono(email, number);

    if (aggiornata) {
      System.out.println("Numero di telefono aggiornato per: " + email + " Nuovo numero di telefono: " + number);
      return ResponseEntity.status(201).body("Numero di telefono aggiornato con successo");
    } else {
      System.out.println("Errore durante l'aggiornamento del numero di telefono.");
      return ResponseEntity.status(500).body("Errore durante l'aggiornamento del numero di telefono");
    }
  }



}