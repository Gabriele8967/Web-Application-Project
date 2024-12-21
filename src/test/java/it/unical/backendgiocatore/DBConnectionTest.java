package it.unical.backendgiocatore;

import it.unical.backendgiocatore.persistence.DBManager;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;


public class DBConnectionTest {
  static DBManager dbManager = null;
  @BeforeAll
  public static void setUp() {
    dbManager = DBManager.getInstance();
  }
  @Test
  public void testConnection() {
    System.out.println(dbManager.getConnection());
  }

}
