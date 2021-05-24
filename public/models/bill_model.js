class Bill {
    constructor(id, billingAddress, cartId, billPaymethod) {
        this.id = id;
        this.billingAddress = billingAddress;
        this.cartId = cartId;
        this.billPaymethod = billPaymethod;
    }
    takePayment();
    checkPromoCode();
    getBill();
    cancelBill();
    canReturn();

}