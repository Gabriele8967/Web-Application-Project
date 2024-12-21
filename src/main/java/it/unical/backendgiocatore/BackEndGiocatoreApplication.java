package it.unical.backendgiocatore;

import it.unical.backendgiocatore.model.Giocatore;
import it.unical.backendgiocatore.persistence.DBManager;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.List;

@SpringBootApplication
public class BackEndGiocatoreApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackEndGiocatoreApplication.class, args);
		List<Giocatore> l = DBManager.getInstance().getGiocatoreDao().findAll();
		System.out.println(l.get(0).getImmagine_profilo());
	}

}
