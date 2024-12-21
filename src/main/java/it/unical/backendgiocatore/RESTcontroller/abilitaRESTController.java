package it.unical.backendgiocatore.RESTcontroller;
import it.unical.backendgiocatore.model.Abilita;
import it.unical.backendgiocatore.persistence.DBManager;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/api")

public class abilitaRESTController {
    @GetMapping("/abilita")
    public Abilita getAbilita(@RequestParam int id){
        Abilita abilita;
        abilita = DBManager.getInstance().getAbilitaDao().findByGiocatore(id);
        return abilita;
    }
}
