package it.unical.backendgiocatore.RESTcontroller;
import it.unical.backendgiocatore.model.Campo;
import it.unical.backendgiocatore.model.Giocatore;
import it.unical.backendgiocatore.persistence.DBManager;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/api")

public class campoRESTController {
    @GetMapping("/campi")
    public List<Campo> getCampi(){
        List<Campo> campi = new ArrayList<Campo>();
        campi = DBManager.getInstance().getCampoDao().findAll();
        return campi;
    }

    @GetMapping("/campi/{id}")
    public Campo getDatiGiocatore(@PathVariable int id){
        Campo campo;
        campo = DBManager.getInstance().getCampoDao().findById(id);
        return campo;
    }

}
