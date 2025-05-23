import java.util.HashMap;
import java.util.Scanner;

public class HashMapExample {
    public static void main(String[] args) {
        HashMap<Integer, String> studentMap = new HashMap<>();
        Scanner scanner = new Scanner(System.in);
        System.out.println("Enter student ID and name (type 'done' to finish):");
        while (true) {
            System.out.print("Enter student ID: ");
            String input = scanner.nextLine();
            if (input.equals("done")) {
                break;
            }
            int id = Integer.parseInt(input);
            System.out.print("Enter student name: ");
            String name = scanner.nextLine();
            studentMap.put(id, name);
        }
        System.out.print("Enter student ID to retrieve name: ");
        int id = scanner.nextInt();
        String name = studentMap.get(id);
        if (name != null) {
            System.out.println("Student name: " + name);
        } else {
            System.out.println("Student not found.");
        }
    }
}
