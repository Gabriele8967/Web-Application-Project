package it.unical.backendgiocatore;

import it.unical.backendgiocatore.persistence.DBManager;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.time.LocalDate;

@SpringBootApplication
public class BackEndGiocatoreApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackEndGiocatoreApplication.class, args);
		LocalDate date = LocalDate.now();
		String dataCorrente = date.toString();
		System.out.println(DBManager.getInstance().getDisponibilitaDao().orariPrenotati(dataCorrente,1).toString());
	}

}
