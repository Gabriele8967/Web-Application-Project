package it.unical.backendgiocatore.persistence.db;
import it.unical.backendgiocatore.model.Disponibilita;
import it.unical.backendgiocatore.persistence.dao.disponibilitaDao;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class disponibilitaDaoDB implements disponibilitaDao {
    private final Connection conn;
    public disponibilitaDaoDB(Connection c) {this.conn = c;}

    @Override
    public List<Disponibilita> findAll() {
        List<Disponibilita> disponibilita = new ArrayList<>();
        String query = "SELECT * FROM disponibilita";
        try {
            Statement st = conn.createStatement();
            ResultSet rs = st.executeQuery(query);
            while (rs.next()){
                Disponibilita d = new Disponibilita();
                d.setCampo(rs.getInt("campo"));
                d.setData(rs.getString("data"));
                d.setOrario(rs.getString("orario"));
                d.setStato(rs.getInt("stato"));
                disponibilita.add(d);
            }
        } catch (SQLException e) {
            throw new RuntimeException("Errore durante il recupero delle disponibilità",e);
        }
        return disponibilita;
    }

    @Override
    public int checkDisponibilita(String orario, String data, int idCampo) {
        int stato = 10;
        String query = "SELECT stato FROM disponibilita WHERE orario = ? AND data = ? AND campo = ?";
        try {
            PreparedStatement ps = conn.prepareStatement(query);
            ps.setString(1, orario);
            ps.setString(2, data);
            ps.setInt(3, idCampo);
            ResultSet rs = ps.executeQuery();
            if (rs.next()){
                stato = rs.getInt("stato");
            }
        } catch (SQLException e) {
            throw new RuntimeException("Errore durante la verifica della disponibilità",e);
        }
        return stato;
    }

    @Override
    public List<Integer> orariPrenotati(String data, int idCampo) {
        List<Integer> orari = new ArrayList<>();
        String query = "SELECT orario FROM disponibilita WHERE data = ? AND campo = ?";
        try {
            PreparedStatement ps = conn.prepareStatement(query);
            ps.setString(1,data);
            ps.setInt(2,idCampo);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                orari.add(rs.getInt("orario"));
            }
        } catch (SQLException e){
            throw new RuntimeException("Errore durante la ricerca degli orari disponibili");
        }
        return orari;
    }


    @Override
    public void save(Disponibilita disponibilita) {
        String query = "INSERT INTO disponibilita (campo, data, orario, stato) VALUES (?, ?, ?, ?)";
        try {
            PreparedStatement ps = conn.prepareStatement(query);
            ps.setInt(1, disponibilita.getCampo());
            ps.setString(2, disponibilita.getData());
            ps.setString(3, disponibilita.getOrario());
            ps.setInt(4, disponibilita.getStato());
            ps.executeUpdate();
        } catch (SQLException e){
            throw new RuntimeException("Errore durante l'aggiunta della disponibilità",e);
        }

    }

    @Override
    public void delete(Disponibilita disponibilita) {
        String query = "DELETE FROM disponibilita WHERE campo = ? AND data = ? AND orario = ? AND stato = ?";
        try (PreparedStatement ps = conn.prepareStatement(query)) {
            ps.setInt(1, disponibilita.getCampo());
            ps.setString(2, disponibilita.getData());
            ps.setString(3, disponibilita.getOrario());
            ps.setInt(4, disponibilita.getStato());
            ps.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException("Errore durante l'eliminazione della disponibilità", e);
        }
    }
}
