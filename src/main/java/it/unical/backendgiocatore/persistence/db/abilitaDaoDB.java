package it.unical.backendgiocatore.persistence.db;

import it.unical.backendgiocatore.model.Abilita;
import it.unical.backendgiocatore.model.Giocatore;
import it.unical.backendgiocatore.persistence.dao.abilitaDao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class abilitaDaoDB implements abilitaDao {
    Connection connection;
    public abilitaDaoDB(Connection con) {this.connection = con;}

    @Override
    public Abilita findByGiocatore(int idGiocatore) {
        Abilita abilita = null;
        String query = "SELECT * FROM abilita WHERE giocatore = ?";

        try (PreparedStatement ps = connection.prepareStatement(query)) {
            ps.setInt(1, idGiocatore);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    abilita = new Abilita();
                    Giocatore giocatore = new Giocatore();
                    giocatore.setId(rs.getInt("giocatore"));
                    abilita.setGiocatore(giocatore);
                    abilita.setDritto(rs.getInt("dritto"));
                    abilita.setRovescio(rs.getInt("rovescio"));
                    abilita.setServizio(rs.getInt("servizio"));
                    abilita.setSlice(rs.getInt("slice"));
                    abilita.setPalla_corta(rs.getInt("palla_corta"));
                    abilita.setResistenza(rs.getInt("resistenza"));
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException("Errore durante il recupero delle abilità", e);
        }
        return abilita;
    }


    @Override
    public boolean save(Abilita abilita, int idGiocatore) {
        boolean success = false;
        String query = "UPDATE abilita SET dritto = ?, rovescio = ?, servizio = ?, slice = ?, pallacorta = ?, resistenza = ? WHERE giocatore = ?";
        try {
            PreparedStatement ps = connection.prepareStatement(query);
            ps.setInt(7,idGiocatore);
            ps.setInt(1,abilita.getDritto());
            ps.setInt(2,abilita.getRovescio());
            ps.setInt(3,abilita.getServizio());
            ps.setInt(4,abilita.getSlice());
            ps.setInt(5,abilita.getPalla_corta());
            ps.setInt(6,abilita.getResistenza());
            ps.executeUpdate();
            success = true;
        } catch (SQLException e){
            throw new RuntimeException("Errore durante l'aggiornamento delle abilita", e);

        }
        return success;
    }
}
