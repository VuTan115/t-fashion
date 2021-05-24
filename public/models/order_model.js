class Order {
    constructor
        (name, email, phoneNumber, Cart, message) {
        this.name = name;
        this.email = email;
        this.Cart = Cart;
        this.phoneNumber = phoneNumber;
        this.message = message;

    }
    // getter
    get name() { return this.name; };
    get phoneNumber() { return this.phoneNumber; };
    get email() { return this.email; };
    get Cart() { return this.Cart; };
    get message() { return this.message; };
    //setter
    set name(name) { this.name = name; }
    set email(email) { this.email = email; }
    set phoneNumber(phoneNumber) { this.phoneNumber = phoneNumber; }
    set Cart(Cart) { this.Cart = Cart; }
    set message(message) { this.message = message; }

    updateOrderStatus();
    placeOrder();
    cancelOrder();

}