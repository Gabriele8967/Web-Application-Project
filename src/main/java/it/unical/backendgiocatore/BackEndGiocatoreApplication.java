package it.unical.backendgiocatore;

import it.unical.backendgiocatore.model.OrariDisponibili;
import it.unical.backendgiocatore.persistence.DBManager;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@SpringBootApplication
public class BackEndGiocatoreApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackEndGiocatoreApplication.class, args);

	}

}
