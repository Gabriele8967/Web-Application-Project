package it.unical.backendgiocatore.services;

public class emailUpdateService {
    private String oldEmail;
    private String newEmail;

    // Costruttore vuoto (necessario per deserializzazione)
    public emailUpdateService() {}

    // Getter e setter
    public String getOldEmail() {
        return oldEmail;
    }

    public void setOldEmail(String oldEmail) {
        this.oldEmail = oldEmail;
    }

    public String getNewEmail() {
        return newEmail;
    }

    public void setNewEmail(String newEmail) {
        this.newEmail = newEmail;
    }
}
