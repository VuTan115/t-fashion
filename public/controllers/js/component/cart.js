
const checkoutBtn = document.getElementsByClassName("checkout-cta")[0];
const dotsLoading = document.getElementsByClassName("dots-loading")[0];
const overlayer = document.getElementsByClassName("overlayer")[0];
const completePayment = document.getElementById("pay-btn");
// const productDatabse = firebase.database().ref("newDb").child("products");
completePayment.onclick = () => {

}
function addUserOrderToDatabase(order) {

}
const userOrdersDb = firebase.database().ref("bills").child("user").child("oders");

// userOrdersDb.once("value", (snapshot) => {
//     console.log(snapshot);
// })

window.onloadeddata = fetchCartData();


let items = [];
function fetchCartData(user) {

    cartDatabase.once("value", (snapshot) => {
        checkUser();
        items = [];
        if (snapshot.exists() && auth.currentUser) {
            snapshot.forEach((element) => {
                if (element) {
                    let name = element.val().name;
                    let desciption = element.val().desciption;
                    let image = element.val().image;
                    let price = element.val().price;
                    items.push(element.val());
                    createCartView(name, image, desciption, price);
                    dotsLoading.style.display = "none";
                }
            })
        }
        console.log(items);
    });
}




let cartHtml = document.querySelectorAll(".basket")[0];
function createCartView(name, image, desciption, price,) {

    let itemsHtml = '';


    itemsHtml = `<div class="basket-product">
                <div class="item">
                    <div class="product-image">
                        <img src="${image}" alt="Placholder Image 2" class="product-frame">
                    </div>
                    <div class="product-details">
                        <h1>
                            <strong>
                                <span class="item-quantity">1 x </span> ${name}
                            </strong> 
                        </h1>
                        

                        <p> <span>Mô tả sản phẩm:</span> <br> - ${desciption}</p>
                    </div>
                </div>
                <div class="price">${price}</div>
                <div class="quantity">
                    <input type="number" value="1" min="1" class="quantity-field">
                </div>
                <div class="subtotal">${price}</div>
                <div class="remove">
                    <button>Remove</button>
                </div>
            </div>`;
    if (cartHtml) {

        cartHtml.innerHTML += itemsHtml;
    }
    recalculateCart();
    /* Set values + misc */
    var promoCode;
    var promoPrice;
    var fadeTime = 300;

    let promoCodeList = new Set();
    promoCodeList.add("SALE10");
    promoCodeList.add("SALE20");
    promoCodeList.add("SALE30");
    promoCodeList.add("SALE40");
    promoCodeList.add("SALE50");
    /* Assign actions */
    $('.quantity input').change(function () {
        updateQuantity(this);
    });

    $('.remove button').click(function () {
        console.log(this.parentElement.parentElement.firstElementChild.lastElementChild.firstElementChild.firstElementChild.textContent);
        console.log(document.getElementsByClassName("product-details")[0].firstElementChild);


        const modal = document.getElementById("myModal");
        const closeBtn = document.getElementsByClassName("close")[0];
        const cancel = document.getElementById("cancel-btn");
        const confirm = document.getElementById("confirm-btn");
        modal.style.display = "block";
        closeBtn.onclick = () => {
            modal.style.display = "none";
        }
        confirm.onclick = () => {

            removeItem(this);
            modal.style.display = "none";
        }
        cancel.onclick = () => {
            modal.style.display = "none";
        }
        window.onclick = (event) => {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    });

    $(document).ready(function () {
        updateSumItems();
    });


    $('.promo-code-cta').click(function () {

        promoCode = $('#promo-code').val();

        if (promoCodeList.has(promoCode.toUpperCase())) {
            promoPrice = promoCode.replace(/[^0-9]/g, "");
            // console.log(typeof promoPrice);

            promoPrice = promoPrice * 1;
            // console.log(typeof promoPrice);
        } else if (promoCode != '') {
            alert("Invalid Promo Code");
            promoPrice = 0;
        }
        //If there is a promoPrice that has been set (it means there is a valid promoCode input) show promo
        if (promoPrice) {

            $('.summary-promo').removeClass('hide');
            $('.promo-value').text(promoPrice.toFixed(2));
            recalculateCart(true);
        }
    });

    /* Recalculate cart */
    function recalculateCart(onlyTotal) {
        var subtotal = 0;

        /* Sum up row totals */
        // $('.basket-product').each(function () {
        //     console.log("run here");
        //     console.log(this.children[3]);

        //     subtotal += parseFloat($(this).children('.subtotal').text());
        //     console.log(subtotal);

        // });
        let subTotalElemnt = document.getElementsByClassName("basket-product");
        for (let i = 0; i < subTotalElemnt.length; i++) {
            let sub = subTotalElemnt[i].children[3];
            if (sub) {
                // console.log(sub.textContent);
                subtotal += sub.textContent * 1;
            }
            // console.log(.);

        }


        /* Calculate totals */
        var total = subtotal;

        //If there is a valid promoCode, and subtotal < 10 subtract from total
        var promoPrice = parseFloat($('.promo-value').text());

        if (promoPrice) {
            if (subtotal >= promoPrice) {
                console.log(typeof promoPrice);
                console.log(total);
                total -= promoPrice;
                console.log(total);
            } else {
                alert('Order must be more than £10 for Promo code to apply.');
                $('.summary-promo').addClass('hide');
            }
        }

        /*If switch for update only total, update only total display*/
        if (onlyTotal) {
            /* Update total display */
            $('.total-value').fadeOut(fadeTime, function () {

                $('#basket-total').html(total.toFixed(2));
                $('.total-value').fadeIn(fadeTime);
            });
        } else {
            /* Update summary display. */
            $('.final-value').fadeOut(fadeTime, function () {
                $('#basket-subtotal').html(subtotal.toFixed(2));
                $('#basket-total').html(total.toFixed(2));
                if (total == 0) {
                    $('.checkout-cta').fadeOut(fadeTime);
                } else {
                    $('.checkout-cta').fadeIn(fadeTime);
                }
                $('.final-value').fadeIn(fadeTime);
            });
        }
    }

    /* Update quantity */
    function updateQuantity(quantityInput) {
        /* Calculate line price */
        var productRow = $(quantityInput).parent().parent();
        var price = parseFloat(productRow.children('.price').text());
        var quantity = $(quantityInput).val();
        var linePrice = price * quantity;

        /* Update line price display and recalc cart totals */
        productRow.children('.subtotal').each(function () {
            $(this).fadeOut(fadeTime, function () {

                $(this).text(linePrice.toFixed(2));
                recalculateCart();
                $(this).fadeIn(fadeTime);
            });
        });

        productRow.find('.item-quantity').text(quantity + " x ");
        updateSumItems();
    }

    function updateSumItems() {
        var sumItems = 0;
        $('.quantity input').each(function () {
            // console.log(this);
            sumItems += parseInt($(this).val());
        });
        $('.total-items').text(sumItems);
    }

    /* Remove item from cart */
    function removeItem(removeButton) {

        var product = {
            name: null,
            image: null,
            desciption: null,
            price: null,
        };
        let productRow = $(removeButton).parent().parent();
        // Get a key for a new Post.
        // var newPostKey = firebase.database().ref().child("carts").child('products').push().key;
        let productName = productRow.children(".item").children(".product-details").children("h1").text().replace(/[0-9,x]/g, '').trim();
        console.log(productName + " has been removed ");
        var updates = {};
        updates['/carts/products/' + productName] = product;

        productRow.slideUp(fadeTime, function () {
            productRow.remove();
            firebase.database().ref().update(updates);
            recalculateCart();
            updateSumItems();

        });
    }
    addFuncToBill(items);



}
function buildBillView(items) {
    const itemViewInBillHtml = document.querySelectorAll(".bill-items .row")[0];
    //get quantity
    const quantityEachProduct = document.getElementsByClassName("quantity-field");
    //get total price
    const totalPrice = document.getElementById("basket-total");
    //get origin price
    const originalPrice = document.getElementById("basket-subtotal");
    //get discount
    const promote = document.getElementById("basket-promo");
    // get total view on bill
    const totalOnBill = document.getElementById("total-price-view-number");
    //get discount view on bill
    const originOnBill = document.getElementById("origin-price-number");
    // get origin view on bill
    const promoteOnBill = document.getElementById("coupon-discounts-number:");
    totalOnBill.innerHTML = "$" + Number.parseInt(totalPrice.textContent * 1.0).toFixed(2);
    promoteOnBill.innerHTML = "-$" + Number.parseInt(promote.textContent * 1.0).toFixed(2);
    originOnBill.innerHTML = "$" + Number.parseInt(originalPrice.textContent * 1.0).toFixed(2);

    let html = '';
    for (let i = 0; i < items.length; i++) {
        html +=
            `<li class="product-item">
                <div class ="row">
                    <div class="product-image">
                            <img src="${items[i].image}   " class="product-frame" alt="Placholder Image 2"    >
                    </div>

                    <div class="product-info">
                        <h1>${items[i].name}</h1>
                        <p>Mô tả:${items[i].desciption}</p>
                        <p> Số lượng: <strong>${quantityEachProduct[i].value}</strong></p>
                        <p> Đơn giá: <strong>${items[i].price}$</strong></p>
                    </div>
                </div>
            </li>
            `
    }
    itemViewInBillHtml.innerHTML = html;
}
function addFuncToBill(items) {
    const overlayer = document.getElementById("overlayerid");
    const closeBill = document.getElementById("span-click");
    if (checkoutBtn) {
        checkoutBtn.onclick = () => {
            if (items.length != 0) {
                overlayer.style.display = ("block");
                buildBillView(items);
                getBill(items);

            }

        };
    }


    closeBill.onclick = () => {
        overlayer.style.display = ("none");
    }
    window.onclick = (event) => {

        if (event.target == overlayer) {
            overlayer.style.display = ("none");
        }
    }

}


function checkUser() {
    return auth.currentUser ? null : window.location.href = "authenticate.html";
}

function getBill(items) {

    if (items) {



        const total = document.querySelectorAll(".summary-total")[0].lastElementChild.textContent;
        console.log(total * 1.0);
        console.log("getting");
    }

}
function pushBill() {

}

function buidlCartViewByLocalArray(items) {
    let itemsHtml = '';

    for (let i = 0; i < items.length; i++) {
        itemsHtml += `<div class="basket-product">
                <div class="item">
                    <div class="product-image">
                        <img src="${items[i].image}" alt="Placholder Image 2" class="product-frame">
                    </div>
                    <div class="product-details">
                        <h1>
                            <strong>
                                <span class="item-quantity">1 x </span> ${items[i].name}
                            </strong> 
                        </h1>
                        

                        <p> <span>Mô tả sản phẩm:</span> <br> - ${items[i].desciption}</p>
                    </div>
                </div>
                <div class="price">${items[i].price}</div>
                <div class="quantity">
                    <input type="number" value="1" min="1" class="quantity-field">
                </div>
                <div class="subtotal">${items[i].price}</div>
                <div class="remove">
                    <button>Remove</button>
                </div>
            </div>`;
    }
    if (cartHtml) {

        cartHtml.innerHTML += itemsHtml;
    }
}