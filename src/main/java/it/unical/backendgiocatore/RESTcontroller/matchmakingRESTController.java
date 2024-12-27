package it.unical.backendgiocatore.RESTcontroller;
import it.unical.backendgiocatore.model.MatchRequest;
import it.unical.backendgiocatore.model.prenotazioniCampo;
import it.unical.backendgiocatore.persistence.DBManager;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/api")

public class matchmakingRESTController {
    @GetMapping("/prenotazioni")
    public List<prenotazioniCampo> getPrenotazioni() {
        List<prenotazioniCampo> prenotazioni;
        prenotazioni = DBManager.getInstance().getPrenotazioniCampoDao().findall();
        return prenotazioni;
    }
    @GetMapping("/inAttesa")
    public List<prenotazioniCampo> getInAttesa() {
        List<prenotazioniCampo> inAttesa;
        inAttesa = DBManager.getInstance().getPrenotazioniCampoDao().findbystato(2);
        return inAttesa;
    }

    @PostMapping("/completaMatch")
    public boolean completaMatch(@RequestBody MatchRequest matchRequest) {
        System.out.println(matchRequest.getIdGiocatore());
        return DBManager.getInstance().getPrenotazioniCampoDao().update(matchRequest.getIdPrenotazione(), matchRequest.getIdGiocatore());
    }

    @GetMapping("/prenotazioni/{idGiocatore}")
    public List<prenotazioniCampo> prenotazioniGiocatore(@PathVariable int idGiocatore) {
        List<prenotazioniCampo> p;
        p = DBManager.getInstance().getPrenotazioniCampoDao().findbyGiocatore(idGiocatore);
        return p;
    }

    @PostMapping("/annullaPrenotazione/{idPrenotazione}")
    public boolean completaMatch(@PathVariable int idPrenotazione) {
        return DBManager.getInstance().getPrenotazioniCampoDao().delete(idPrenotazione);
    }
}
