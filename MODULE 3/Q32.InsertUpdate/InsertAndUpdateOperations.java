import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class InsertAndUpdateOperations {
    public static void main(String[] args) {
        // Database connection details
        String url = "jdbc:mysql://localhost:3306/students";
        String username = "root";
        String password = "mathan@2004";

        try (Connection connection = DriverManager.getConnection(url, username, password)) {
            // Insert operation
            String insertQuery = "INSERT INTO students (name) VALUES (?)";
            try (PreparedStatement insertStatement = connection.prepareStatement(insertQuery)) {
                insertStatement.setString(1, "John Doe");
                int rowsInserted = insertStatement.executeUpdate();
                System.out.println(rowsInserted + " row(s) inserted.");
            }

            // Update operation
            String updateQuery = "UPDATE students SET name = ? WHERE id = ?";
            try (PreparedStatement updateStatement = connection.prepareStatement(updateQuery)) {
                updateStatement.setString(1, "Jane Doe");
                updateStatement.setInt(2, 1); // Assuming there is a student with id = 1
                int rowsUpdated = updateStatement.executeUpdate();
                System.out.println(rowsUpdated + " row(s) updated.");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
