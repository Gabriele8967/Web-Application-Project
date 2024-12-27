package it.unical.backendgiocatore;
import it.unical.backendgiocatore.model.prenotazioniCampo;
import it.unical.backendgiocatore.persistence.DBManager;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.List;


@SpringBootApplication
public class BackEndGiocatoreApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackEndGiocatoreApplication.class, args);
		List<prenotazioniCampo> y = DBManager.getInstance().getPrenotazioniCampoDao().findbyGiocatore(1);
		for(prenotazioniCampo x:y){
			System.out.println(x.getStato());
		}
	}

}
