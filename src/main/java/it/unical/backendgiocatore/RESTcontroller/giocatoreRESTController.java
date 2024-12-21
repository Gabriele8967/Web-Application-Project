package it.unical.backendgiocatore.RESTcontroller;
import it.unical.backendgiocatore.model.Giocatore;
import it.unical.backendgiocatore.persistence.DBManager;
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

}
