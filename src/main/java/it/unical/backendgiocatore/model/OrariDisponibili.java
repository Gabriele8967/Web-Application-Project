package it.unical.backendgiocatore.model;

import java.util.List;

public class OrariDisponibili {
    private int idCampo;
    private List<Integer> orari;

    public OrariDisponibili(){}

    public int getIdCampo() {
        return idCampo;
    }

    public void setIdCampo(int idCampo) {
        this.idCampo = idCampo;
    }

    public List<Integer> getOrari() {
        return orari;
    }

    public void setOrari(List<Integer> orari) {
        this.orari = orari;
    }
}
