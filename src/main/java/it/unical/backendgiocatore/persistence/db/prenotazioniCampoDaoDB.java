package it.unical.backendgiocatore.persistence.db;

import it.unical.backendgiocatore.model.prenotazioniCampo;
import it.unical.backendgiocatore.persistence.dao.prenotazioniCampoDao;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class prenotazioniCampoDaoDB implements prenotazioniCampoDao {
    private Connection conn;

    public prenotazioniCampoDaoDB(Connection c) {this.conn = c;}
    @Override
    public List<prenotazioniCampo> findall() {
        List<prenotazioniCampo> prenotazioni = new ArrayList<>();
        String query = "SELECT * FROM prenotazionicampo";
        try {
            Statement st = conn.createStatement();
            ResultSet rs = st.executeQuery(query);
            while (rs.next()){
                prenotazioniCampo prenotazione = new prenotazioniCampo();
                prenotazione.setId(rs.getInt("id"));
                prenotazione.setData(rs.getString("data"));
                prenotazione.setOrario(rs.getString("orario"));
                prenotazione.setCampo(rs.getInt("campo"));
                prenotazione.setGiocatore1(rs.getInt("giocatore1"));
                prenotazione.setGiocatore2(rs.getInt("giocatore2"));
                prenotazione.setData_prenotazione(rs.getString("data_prenotazione"));
                prenotazione.setOrario_prenotazione(rs.getString("orario_prenotazione"));
                prenotazione.setStato(rs.getInt("stato"));
                prenotazioni.add(prenotazione);
            }
        } catch (SQLException e) {
            throw new RuntimeException("Errore durante il recupero delle prenotazioni",e);
        }
        return prenotazioni;
    }

    @Override
    public List<prenotazioniCampo> findbystato(int stato) {
        List<prenotazioniCampo> prenotazioni = new ArrayList<>();
        String query = "SELECT * FROM prenotazionicampo WHERE stato = ?";
        try {
            PreparedStatement ps = conn.prepareStatement(query);
            ps.setInt(1, stato);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                prenotazioniCampo prenotazione = new prenotazioniCampo();
                prenotazione.setId(rs.getInt("id"));
                prenotazione.setData(rs.getString("data"));
                prenotazione.setOrario(rs.getString("orario"));
                prenotazione.setCampo(rs.getInt("campo"));
                prenotazione.setGiocatore1(rs.getInt("giocatore1"));
                prenotazione.setGiocatore2(rs.getInt("giocatore2"));
                prenotazione.setData_prenotazione(rs.getString("data_prenotazione"));
                prenotazione.setOrario_prenotazione(rs.getString("orario_prenotazione"));
                prenotazione.setStato(rs.getInt("stato"));
                prenotazioni.add(prenotazione);
            }

        } catch (SQLException e) {
            throw new RuntimeException("Errore durante il recupero delle prenotazioni per stato:" + stato, e);
        }
        return prenotazioni;
    }




    @Override
    public boolean update(int i,int gioc2) {
        String query = "UPDATE prenotazionicampo SET stato = ?, giocatore2 = ? WHERE id = ?";
        try {
            PreparedStatement ps = conn.prepareStatement(query);
            ps.setInt(1, 2);
            ps.setInt(2, gioc2);
            ps.setInt(3, i);
            int rowsUpdated = ps.executeUpdate();
            return rowsUpdated > 0;
        } catch (SQLException e) {
            throw new RuntimeException("Errore durante il completamento del match", e);
        }
    }


    @Override
    public void delete(int i) {
        String query = "DELETE FROM prenotazionicampo WHERE id = ?";
        try (PreparedStatement ps = conn.prepareStatement(query)) {
            ps.setInt(1, i);
            ps.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException("Errore durante l'eliminazione della prenotazione", e);
        }
    }
}
