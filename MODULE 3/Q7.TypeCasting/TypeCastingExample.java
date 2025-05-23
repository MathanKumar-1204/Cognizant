public class TypeCastingExample {
    public static void main(String[] args) {
        double doubleValue = 10.5;
        int intValue = (int) doubleValue;
        System.out.println("Double to int: " + intValue);
        int anotherIntValue = 20;
        double anotherDoubleValue = (double) anotherIntValue;
        System.out.println("Int to double: " + anotherDoubleValue);
    }
}
