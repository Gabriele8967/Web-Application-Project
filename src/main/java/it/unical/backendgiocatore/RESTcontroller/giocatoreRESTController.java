package it.unical.backendgiocatore.RESTcontroller;
import it.unical.backendgiocatore.model.Giocatore;
import it.unical.backendgiocatore.persistence.DBManager;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/api")

public class giocatoreRESTController {

  @GetMapping("/giocatori")
  public List<Giocatore> getGiocatori(){
    List<Giocatore> giocatori;
    giocatori = DBManager.getInstance().getGiocatoreDao().findAll();
    return giocatori;
  }

  @GetMapping("/giocatori/{id}")
  public Giocatore getDatiGiocatore(@PathVariable int id){
    Giocatore giocatore;
    giocatore = DBManager.getInstance().getGiocatoreDao().findByPrimaryKey(id);
    return giocatore;
  }

  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody Giocatore loginRequest) {
    String email = loginRequest.getEmail();
    String password = loginRequest.getPassword();

    System.out.println("Login Request - Email: " + email + " Password: " + password);

    Giocatore giocatore = DBManager.getInstance().getGiocatoreDao().findByEmail(email);

    if (giocatore != null && giocatore.getPassword().equals(password)) {
      System.out.println("Login riuscito per: " + email);
      return ResponseEntity.ok(giocatore);

    } else {
      System.out.println("Login fallito per: " + email);
      return ResponseEntity.status(401).body("Email o password errati");
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


}
