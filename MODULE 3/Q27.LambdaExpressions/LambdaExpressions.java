import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class LambdaExpressions {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("John", "Jane", "Adam", "Eve");
        Collections.sort(names, (a, b) -> a.compareTo(b));
        System.out.println("Sorted list: " + names);
    }
}
