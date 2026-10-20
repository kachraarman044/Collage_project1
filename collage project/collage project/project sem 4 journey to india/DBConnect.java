import java.sql.*;

public class DBConnect {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/mydatabase";
        String user = "root";
        String password = "yourpassword";

        try {
            Connection con = DriverManager.getConnection(url, user, password);
            System.out.println("Connected to database!");

            Statement stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM users");

            while (rs.next()) {
                System.out.println(rs.getString("name")); 
            }

            con.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}