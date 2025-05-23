public class PatternMatchingSwitch {
    public static void main(String[] args) {
        Object obj = "Hello";
        String result = switch (obj) {
            case Integer i -> "It's an integer: " + i;
            case String s -> "It's a string: " + s;
            case Double d -> "It's a double: " + d;
            default -> "Unknown type";
        };
        System.out.println(result);
    }
}
