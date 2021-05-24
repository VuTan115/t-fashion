const dbRef = firebase.database().ref("products");
let json = '';
console.log(dbRef);
function fetchDatabase() {
    dbRef.get().then((snapshot) => {
        if (snapshot.exists()) {
            json = snapshot.val();
            console.log(snapshot.val());
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
};



async function fetchDatabase() {

    await dbRef.get().then((snapshot) => {
        if (snapshot.exists()) {
            let products = [];

            //div col-4
            let productItem = document.querySelectorAll(".col-4");

            // test productItem
            console.log(productItem[0]);

            //push data from firebase to products array
            json = snapshot.val();
            json.forEach(element => {
                products.push(element);
            });

            // test products Aarray
            console.log("product is " + products[0].image);


            let string = "";
            for (let i = 0; i < products.length; i++) {
                // console.log("product" + i + "is " + products[i].name);
                string = `<div class="slide-img">
                	<img src=${products[i].image} alt="" srcset="">
                	<div class="overlayer">
                		<button class="add-to-cart"> Add To Cart </button>
                	</div>
                </div>
                <div class="detail-box">
                	<div class="type">
                		<a href="" target="_blank" rel="noopener noreferrer">${products[i].name}</a>
                		<span>
                			${products[i].desciption}
                		</span>

                	</div>
                	<a class="price" href="#" target="_blank" rel="noopener noreferrer">${products[i].price}$</a>
                </div>`;
                productItem[i].innerHTML += string;
            }


        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });


}
// fetchDatabase();
let products = [];
function getData(json) {

    json.forEach(element => {
        products.push(element);
    });



    console.log(products);
    let productItem = document.querySelectorAll(".col-4");
    console.log("productItems" + productItem);
    let chunk = "";
    products.forEach(product => {
        chunk = `<div class="slide-img">
					<img src=${product.image} alt="" srcset="">
					<div class="overlayer">
						<button class="add-to-cart"> Add To Cart </button>
					</div>
				</div>
				<div class="detail-box">
					<div class="type">
						<a href="" target="_blank" rel="noopener noreferrer">${product.name}</a>
						<span>
							${product.description}
						</span>

					</div>
					<a class="price" href="#" target="_blank" rel="noopener noreferrer">${product.price}</a>
				</div>`;
        productItem.innerHTML += chunk;
    });
    return products;
};

window.onload = fetchDatabase();


export default repo;
