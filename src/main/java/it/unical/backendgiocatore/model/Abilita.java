package it.unical.backendgiocatore.model;

public class Abilita {
    private Giocatore giocatore;
    private int dritto;
    private int rovescio;
    private int servizio;
    private int slice;
    private int palla_corta;
    private int resistenza;

    public Abilita(){}

    public Giocatore getGiocatore() {
        return this.giocatore;
    }

    public void setGiocatore(Giocatore giocatore) {
        this.giocatore = giocatore;
    }

    public int getDritto() {return dritto;}

    public void setDritto(int dritto) {
        this.dritto = dritto;
    }

    public int getRovescio() {
        return rovescio;
    }

    public void setRovescio(int rovescio) {
        this.rovescio = rovescio;
    }

    public int getServizio() {
        return servizio;
    }

    public void setServizio(int servizio) {
        this.servizio = servizio;
    }

    public int getSlice() {
        return slice;
    }

    public void setSlice(int slice) {
        this.slice = slice;
    }

    public int getPalla_corta() {
        return palla_corta;
    }

    public void setPalla_corta(int palla_corta) {
        this.palla_corta = palla_corta;
    }

    public int getResistenza() {
        return resistenza;
    }

    public void setResistenza(int resistenza) {
        this.resistenza = resistenza;
    }
}
