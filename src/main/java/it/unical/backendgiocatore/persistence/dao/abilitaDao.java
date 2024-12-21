package it.unical.backendgiocatore.persistence.dao;

import it.unical.backendgiocatore.model.Abilita;

public interface abilitaDao {

    public Abilita findByGiocatore(int idGiocatore);
    public boolean save(Abilita abilita, int idGiocatore);
}

