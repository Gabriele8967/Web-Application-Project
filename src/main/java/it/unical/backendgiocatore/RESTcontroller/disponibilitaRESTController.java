package it.unical.backendgiocatore.RESTcontroller;
import it.unical.backendgiocatore.model.OrariDisponibili;
import it.unical.backendgiocatore.persistence.DBManager;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/api")
public class disponibilitaRESTController {

    @GetMapping("/disponibilita")
    public List<OrariDisponibili> getDisponibilita(){
        List<OrariDisponibili> disponibilita = new ArrayList<>();
        LocalDate date = LocalDate.now();
        String dataCorrente = date.toString();
        List<Integer> orariTotali = Arrays.asList(14, 15, 16, 17, 18, 19);
        for(int i=1; i<11; i++){
            List<Integer> orariPrenotati = DBManager.getInstance().getDisponibilitaDao().orariPrenotati(dataCorrente,i);
            List<Integer> orariLiberi = orariTotali.stream().filter(orario -> !orariPrenotati.contains(orario)).collect(Collectors.toList());
            OrariDisponibili orariDisponibili = new OrariDisponibili();
            orariDisponibili.setOrari(orariLiberi);
            orariDisponibili.setIdCampo(i);
            disponibilita.add(orariDisponibili);
        }
        return disponibilita;
    }




}
