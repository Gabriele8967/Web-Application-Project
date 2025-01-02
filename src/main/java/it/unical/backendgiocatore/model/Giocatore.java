package it.unical.backendgiocatore.model;

public class Giocatore {
  private int id;
  private String otp;
  private String nome;
  private String cognome;
  private String email;
  private String telefono;
  private String password;
  private String username;
  private String immagine_profilo;
  private int livello;

  public Giocatore() {}

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public String getNome() {
    return nome;
  }

  public void setNome(String nome) {
    this.nome = nome;
  }

  public String getCognome() {
    return cognome;
  }

  public void setCognome(String cognome) {
    this.cognome = cognome;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }


  public String getTelefono() {
    return telefono;
  }

  public void setTelefono(String telefono) {
    this.telefono = telefono;
  }


  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }


  public String getOtp() {return otp;}

  public void setOtp(String otp) {
    this.otp = otp;
  }


  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getImmagine_profilo() {
    return immagine_profilo;
  }

  public void setImmagine_profilo(String immagine_profilo) {
    this.immagine_profilo = immagine_profilo;
  }

  public int getLivello() {
    return livello;
  }

  public void setLivello(int livello) {
    this.livello = livello;
  }
}
