package it.unical.backendgiocatore.services;

import it.unical.backendgiocatore.model.prenotazioniCampo;
import it.unical.backendgiocatore.persistence.DBManager;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;


import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class matchmakingService {

    @Scheduled(fixedRate = 600000)
    public void check_match_scaduti(){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm");
        LocalTime now = LocalTime.now();
        List<prenotazioniCampo> prenotazioni = DBManager.getInstance().getPrenotazioniCampoDao().findbystato(1);
        for(prenotazioniCampo p : prenotazioni){
            LocalTime t = LocalTime.parse(p.getOrario_prenotazione(),formatter);
            if(p.getStato()==1 && t.plusMinutes(10).isBefore(now)){
                DBManager.getInstance().getPrenotazioniCampoDao().delete(p.getId());
            }
        }
    }
}
