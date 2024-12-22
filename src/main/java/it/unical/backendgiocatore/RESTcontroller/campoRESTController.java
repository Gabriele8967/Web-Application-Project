package it.unical.backendgiocatore.RESTcontroller;
import it.unical.backendgiocatore.model.Campo;
import it.unical.backendgiocatore.persistence.DBManager;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
