package it.unical.backendgiocatore.RESTcontroller;
import it.unical.backendgiocatore.model.prenotazioniCampo;
import it.unical.backendgiocatore.persistence.DBManager;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
        inAttesa = DBManager.getInstance().getPrenotazioniCampoDao().findbystato(1);
        return inAttesa;
    }
}
