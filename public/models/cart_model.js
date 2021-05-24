class Cart {
    constructor(id, totalprice, subtotalprice, productId) {
        this.id = id;
        this.totalprice = totalprice;
        this.subtotalprice = subtotalprice;
        this.productId = productId
    }
    //getter
    get id() { return this.id };
    get totalprice() { return this.totalprice };
    get subtotalprice() { return this.subtotalprice };
    get productId() { return this.productId };

    //setter
    set totalprice(totalPrice) { this.totalprice = totalPrice };
    set subtotalprice(subtotalprice) { this.subtotalprice = subtotalprice };
    set productId(productId) { this.productId = productId };

    //add product 
    addProductToCart()
    // remove product
    removeProductFromCart()
    //checkout
    checkOut()
}