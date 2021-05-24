class Product {
    constructor(name, image, desciption, price, size) {
        this.image = image;
        this.name = name;
        this.desciption = desciption;
        this.price = price;
        this.size = size;
    };
    // getter
    get price() { return this.price };
    get image() { return this.image };
    get desciption() { return this.desciption };
    get name() { return this.name };
    get size() { return this.size };
    // setter
    set image(image) { this.image = image; };
    set name(name) { this.name = name; };
    set desciption(desciption) { this.desciption = desciption; };
    set price(price) { this.price = price; };
    set size(size) { this.size = size; };


    mapJsonToProduct(JsonString) {
        return Product(
            JsonString["name"],
            JsonString["image"],
            JsonString["desciption"],
            JsonString["price"],
            JsonString["size"]
        )
    };
}