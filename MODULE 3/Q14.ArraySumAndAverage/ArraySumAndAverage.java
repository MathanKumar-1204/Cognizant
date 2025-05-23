import java.util.Scanner;

public class ArraySumAndAverage {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter the number of elements: ");
        int n = scanner.nextInt();

        // Validate input
        if (n <= 0) {
            System.out.println("Number of elements must be greater than 0.");
            return;
        }

        int[] array = new int[n];
        System.out.println("Enter the elements:");
        for (int i = 0; i < n; i++) {
            System.out.print("Element " + (i + 1) + ": ");
            array[i] = scanner.nextInt();
        }

        int sum = 0;
        for (int num : array) {
            sum += num;
        }

        double average = (double) sum / n;

        System.out.println("Sum: " + sum);
        System.out.printf("Average: %.2f\n", average); // Formatting average to 2 decimal places

        scanner.close(); // Good practice to close the scanner
    }
}
