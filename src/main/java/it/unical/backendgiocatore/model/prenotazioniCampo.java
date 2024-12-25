package it.unical.backendgiocatore.model;

public class prenotazioniCampo {
    private int id;
    private int campo;
    private String data;
    private String orario;
    private int giocatore1;
    private int giocatore2;
    private String data_prenotazione;
    private String orario_prenotazione;
    private int stato;
    public prenotazioniCampo() {}

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getCampo() {
        return campo;
    }

    public void setCampo(int campo) {
        this.campo = campo;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public String getOrario() {
        return orario;
    }

    public void setOrario(String orario) {
        this.orario = orario;
    }

    public int getGiocatore1() {
        return giocatore1;
    }

    public void setGiocatore1(int giocatore1) {
        this.giocatore1 = giocatore1;
    }

    public int getGiocatore2() {
        return giocatore2;
    }

    public void setGiocatore2(int giocatore2) {
        this.giocatore2 = giocatore2;
    }

    public String getData_prenotazione() {
        return data_prenotazione;
    }

    public void setData_prenotazione(String data_prenotazione) {
        this.data_prenotazione = data_prenotazione;
    }

    public int getStato() {
        return stato;
    }

    public void setStato(int stato) {
        this.stato = stato;
    }

    public String getOrario_prenotazione() {
        return orario_prenotazione;
    }

    public void setOrario_prenotazione(String orario_prenotazione) {
        this.orario_prenotazione = orario_prenotazione;
    }
}
