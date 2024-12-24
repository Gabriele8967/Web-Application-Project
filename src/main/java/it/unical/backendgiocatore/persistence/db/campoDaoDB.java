package it.unical.backendgiocatore.persistence.db;
import it.unical.backendgiocatore.model.Campo;
import it.unical.backendgiocatore.persistence.dao.campoDao;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class campoDaoDB implements campoDao {
    private final Connection conn;
    public campoDaoDB(Connection c) {this.conn = c;}

    @Override
    public List<Campo> findAll() {
        List<Campo> campi = new ArrayList<>();
        String query = "SELECT * FROM campo";
        try {
            Statement st = conn.createStatement();
            ResultSet rs = st.executeQuery(query);
            while (rs.next()){
                Campo campo = new Campo();
                campo.setId(rs.getInt("id"));
                campo.setImmagine(rs.getString("immagine"));
                campo.setSuperficie(rs.getString("superficie"));
                campo.setTipo(rs.getString("tipo"));
                campi.add(campo);
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return campi;
    }

    @Override
    public Campo findById(int id) {
        Campo campo = null;
        String query = "SELECT * FROM campo WHERE id = ?";
        try {
            PreparedStatement ps = conn.prepareStatement(query);
            ps.setInt(1, id);
            ResultSet rs = ps.executeQuery();
            if (rs.next()){
                campo = new Campo();
                campo.setId(rs.getInt("id"));
                campo.setImmagine(rs.getString("immagine"));
                campo.setSuperficie(rs.getString("superficie"));
                campo.setTipo(rs.getString("tipo"));
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return campo;
    }

    @Override
    public Campo findBytipo(String tipo) {
        Campo campo = null;
        String query = "SELECT * FROM campo WHERE tipo = ?";
        try {
            PreparedStatement ps = conn.prepareStatement(query);
            ps.setString(1, tipo);
            ResultSet rs = ps.executeQuery();
            if (rs.next()){
                campo.setId(rs.getInt("id"));
                campo.setImmagine(rs.getString("immagine"));
                campo.setSuperficie(rs.getString("superficie"));
                campo.setTipo(rs.getString("tipo"));
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return campo;
    }

    @Override
    public Campo findBySuperficie(String superficie) {
        Campo campo = null;
        String query = "SELECT * FROM campo WHERE superficie = ?";
        try {
            PreparedStatement ps = conn.prepareStatement(query);
            ps.setString(1, superficie);
            ResultSet rs = ps.executeQuery();
            if (rs.next()){
                campo.setId(rs.getInt("id"));
                campo.setImmagine(rs.getString("immagine"));
                campo.setSuperficie(rs.getString("superficie"));
                campo.setTipo(rs.getString("tipo"));
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return campo;
    }


}
