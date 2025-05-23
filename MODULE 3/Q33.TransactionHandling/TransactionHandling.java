import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class TransactionHandling {
    public static void main(String[] args) {
        // Database connection details
        String url = "jdbc:mysql://localhost:3306/students";
        String username = "root";
        String password = "mathan@2004";

        try (Connection connection = DriverManager.getConnection(url, username, password)) {
            connection.setAutoCommit(false); // Start transaction

            try {
                // Check balance before debit
                String checkBalanceQuery = "SELECT balance FROM accounts WHERE id = ?";
                try (PreparedStatement checkBalanceStatement = connection.prepareStatement(checkBalanceQuery)) {
                    checkBalanceStatement.setInt(1, 1); // Check balance of account with id = 1
                    ResultSet resultSet = checkBalanceStatement.executeQuery();
                    if (resultSet.next()) {
                        double currentBalance = resultSet.getDouble("balance");
                        if (currentBalance < 100.0) {
                            throw new SQLException("Insufficient balance for debit operation.");
                        }
                    }
                }

                // Debit operation
                String debitQuery = "UPDATE accounts SET balance = balance - ? WHERE id = ?";
                try (PreparedStatement debitStatement = connection.prepareStatement(debitQuery)) {
                    debitStatement.setDouble(1, 100.0);
                    debitStatement.setInt(2, 1); // Debit from account with id = 1
                    int rowsDebited = debitStatement.executeUpdate();
                    System.out.println(rowsDebited + " row(s) debited.");
                }

                // Credit operation
                String creditQuery = "UPDATE accounts SET balance = balance + ? WHERE id = ?";
                try (PreparedStatement creditStatement = connection.prepareStatement(creditQuery)) {
                    creditStatement.setDouble(1, 100.0);
                    creditStatement.setInt(2, 2); // Credit to account with id = 2
                    int rowsCredited = creditStatement.executeUpdate();
                    System.out.println(rowsCredited + " row(s) credited.");
                }

                connection.commit(); // Commit transaction
                System.out.println("Transaction completed successfully.");
            } catch (SQLException e) {
                connection.rollback(); // Rollback transaction on error
                System.out.println("Transaction failed. Rolled back.");
                e.printStackTrace();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
