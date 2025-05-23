import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class BasicJDBCConnection {
    public static void main(String[] args) {
        try (Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/Events", "root", "mathan@2004");
             Statement statement = connection.createStatement();
             ResultSet resultSet = statement.executeQuery("SELECT * FROM events")) {
            while (resultSet.next()) {
                System.out.println("ID: " + resultSet.getInt("event_id") + ", Name: " + resultSet.getString("title"));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
//"C:\Program Files\Java\jdk-21.0.6\bin\java.exe" -cp ".;C:\Users\Mathan\Downloads\mysql-connector-j-9.3.0\mysql-connector-j-9.3.0\mysql-connector-j-9.3.0.jar" BasicJDBCConnection
//C:\Users\Mathan\Downloads\mysql-connector-j-9.3.0\mysql-connector-j-9.3.0