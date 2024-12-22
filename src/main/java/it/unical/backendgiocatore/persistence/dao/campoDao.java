package it.unical.backendgiocatore.persistence.dao;

import it.unical.backendgiocatore.model.Campo;

import java.util.List;

public interface campoDao {
    public List<Campo> findAll();
    public Campo findById(int id);
    public Campo findBytipo(String id);
    public Campo findBySuperficie(String id);

}
