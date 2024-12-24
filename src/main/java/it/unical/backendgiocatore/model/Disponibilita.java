package it.unical.backendgiocatore.model;

public class Disponibilita {
    private String data;
    private String orario;
    private int campo;


    public Disponibilita(){}

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

    public int getCampo() {
        return campo;
    }

    public void setCampo(int campo) {
        this.campo = campo;
    }

}
