// import repo from './repository/application_repository.js'
//firebase config
// var firebaseConfig = {
//     apiKey: "AIzaSyCJLLNutq24xi3kj-r8yrzi9n8kg8zQd9U",
//     authDomain: "cnpm-jteam1.firebaseapp.com",
//     projectId: "cnpm-jteam1",
//     storageBucket: "cnpm-jteam1.appspot.com",
//     messagingSenderId: "464745268883",
//     appId: "1:464745268883:web:2830502a6c719b539fef66",
//     databaseURL: "https://cnpm-jteam1-default-rtdb.firebaseio.com/",
//     measurementId: "G-83N4Z0630W"
// };
var firebaseConfig = {
    apiKey: "AIzaSyDhZN8zmKWXCnpEhzuUV5xGfSVTbbD39Lo",
    authDomain: "t-fashion.firebaseapp.com",
    databaseURL: "https://t-fashion-default-rtdb.firebaseio.com",
    projectId: "t-fashion",
    storageBucket: "t-fashion.appspot.com",
    messagingSenderId: "492829294301",
    appId: "1:492829294301:web:feecb5ecd4f472e0462534"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

///======= constance variable ===============///
const auth = firebase.auth();

const cartBtn = document.querySelector("#cart img");
const signUpBtn = document.getElementById("btn-click");
const signOutBtn = document.querySelector(".signOut-btn");
const addToCartBtn = document.getElementsByClassName("add-to-cart");
const closeBtn = document.getElementsByClassName("close")[0];
const modal = document.getElementById("myModal");
const btnSearch = document.getElementById("btn-search");
const searchBar = document.querySelector("#input-field-bar input");
const productItem = document.getElementsByClassName("row product")[0];
const goTocCartBtn = document.getElementById("btn-gotocart");
const menuBtn = document.getElementById("menuBtn");

const cartDatabase = firebase.database().ref().child("carts").child("products");
const actionButton = document.querySelectorAll(".action")[0];
const inputBox = document.getElementById("input-field-bar");
const suggestBar = document.querySelectorAll(".autocom-box ul")[0];
const submitBtn = document.getElementById("submit-btn");
const resetBtn = document.getElementById("reset-btn");
const productDatabse = firebase.database().ref().child("products");
let products = [];
let suggestions = [];
productDatabse.on("value", (snapshot) => {
    if (snapshot.exists()) {
        // console.log(document.getElementsByClassName("title")[0].innerHTML = snapshot.val()[0].name);
        // console.log(snapshot.val());
        products = [];
        suggestions = [];

        snapshot.forEach((element) => {
            // const name = element.val().name;
            // const desciption = element.val().desciption;
            // const image = element.val().image;
            // const price = element.val().price;
            // buildProductView(name, image, desciption, price);

            products.push(element.val());
            suggestions.push(element.val().name.toString());

        })
    } else {
        console.log("No data available");
    }
    buildProductViewByLocalArray(products);
    addFuncToCartBtn(products);
    onLoaded();
    console.log("loaded");
})


if (inputBox) {
    inputBox.onkeyup = ((element) => {
        let userData = element.target.value;
        let showThisData = [];

        // console.log(element.target.value);
        if (userData) {
            showThisData = suggestions.filter((suggestion) => {
                return suggestion.toLocaleLowerCase().includes(userData.toLocaleLowerCase());
            })
            showThisData = showThisData.map((suggestion) => {

                return suggestion = "<li>" + suggestion + "</li>";
            })

            suggestBar.classList.add("active");
        }
        else {
            hideSuggestions();
        }

        // suggestBar.innerHTML = showThisData;

        showSuggestions(showThisData);


    })
}

function addFuncToSuggetionList() {
    const suggestionList = document.querySelectorAll(".autocom-box ul li")
    if (suggestionList) {
        // console.log(suggestionList);
        for (let i = 0; i < suggestionList.length; i++) {
            suggestionList[i].onclick = () => {
                console.log(suggestionList[i].innerHTML);
                inputBox.firstElementChild.value = suggestionList[i].innerHTML;

                Search(suggestionList[i].innerHTML);
                hideSuggestions();
            }
        }
    }
}
function showSuggestions(list) {
    let listData;
    userValue = inputBox.value;
    listData = "<li>" + userValue + "</li>";
    listData = list.join("");
    if (listData.length == 0) {
        Search("");
        hideSuggestions();
    }
    suggestBar.innerHTML = listData;

    addFuncToSuggetionList();

}
function hideSuggestions() {
    suggestBar.classList.remove("active");
}


if (btnSearch) {

    btnSearch.onclick = () => {
        const inputVal = document.getElementById("choices-text-preset-values").value;
        hideSuggestions();
        Search(inputVal);
    };
}
function Search(inputVal) {
    console.log("clicked Search button");
    const formatedInput = inputVal.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D").trim();
    productItem.innerHTML = "";
    for (i = 0; i < products.length; ++i) {
        var str = products[i].name.toUpperCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/đ/g, "d").replace(/Đ/g, "D");
        if (str.includes(formatedInput)) {
            buildProductView(products[i].name, products[i].image, products[i].desciption, products[i].price);
            addFuncToCartBtn(products);
        }
    }
}

function onLoaded() {
    document.getElementsByClassName("dots-loading")[0].style.display = "none";
}


function buildProductView(name, image, desciption, price) {
    // console.log(name);

    let html = `
    <div class="col-4">
        <div class="slide-img">
                	<img src=${image} alt="" srcset="">
                	<div class="overlayer">
                		<button class="add-to-cart"> Add To Cart </button>
                	</div>
                </div>
                <div class="detail-box">
                	<div class="type">
                		<a href="" target="_blank" rel="noopener noreferrer">${name}</a>
                		<span>
                			${desciption}
                		</span>

                	</div>
                	<a class="price" href="#" target="_blank" rel="noopener noreferrer">${price}$</a>
                </div>
    </div>`;
    if (productItem) {

        productItem.innerHTML += html;


    }

}

function buildProductViewByLocalArray(products) {

    let html = '';
    if (productItem) {
        productItem.innerHTML = "";
    }
    // console.log(name);
    for (let i = 0; i < products.length; i++) {
        html += `
    <div class="col-4">
        <div class="slide-img">
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
                </div>
    </div>`;
    }
    if (productItem) {

        productItem.innerHTML = html;


    }

}

function addFuncToCartBtn(products) {
    if (addToCartBtn) {
        for (let i = 0; i < addToCartBtn.length; i++) {
            addToCartBtn[i].onclick = function showDialog() {
                if (auth.currentUser) {


                    //name
                    let namesp = this.parentNode.parentNode.parentNode.lastElementChild.firstElementChild.firstElementChild.innerHTML;
                    //image
                    let imagesp = this.parentNode.parentNode.parentNode.firstElementChild.firstElementChild.getAttribute("src");
                    //description
                    let descriptionssp = this.parentNode.parentNode.parentNode.lastElementChild.firstElementChild.lastElementChild.innerHTML;
                    //price
                    let pricesp = this.parentNode.parentNode.parentNode.lastElementChild.lastElementChild.innerHTML.replace("$", "");
                    console.log("this product is " + namesp);
                    addProductToDatabase(namesp, imagesp, descriptionssp, pricesp);
                    const dialogInfo = document.getElementsByClassName("product-detail")[0]

                    dialogInfo.firstElementChild.innerHTML = namesp;
                    dialogInfo.lastElementChild.innerHTML = descriptionssp;
                    modal.style.display = "block";

                } else {
                    window.location.href = "authenticate.html"
                }
            };;

        }

    }
}


function addProductToDatabase(name, image, desciption, price, key) {
    var product = {
        name: name,
        image: image,
        desciption: desciption,
        price: price,
    };
    // Get a key for a new Post.
    // var newPostKey = firebase.database().ref().child("carts").child('products').push().key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/carts/products/' + name] = product;

    return firebase.database().ref().update(updates);
}


if (signUpBtn != null) {
    signUpBtn.onclick = () => {
        var url = "authenticate.html";
        location.href = url;
    };
    document.getElementById("circle-avt").onclick = () => {
        var url = "authenticate.html";
        location.href = url;
    };
}

if (cartBtn) {

    cartBtn.onclick = () => {
        if (auth.currentUser) {
            window.location.href = "cart.html"
        }
        if (!auth.currentUser) {
            window.location.href = "authenticate.html"
        }

    };
}


// When the user clicks on <span> (x), close the modal
if (closeBtn) {
    closeBtn.onclick = function () {
        modal.style.display = "none";
    }
}
//go to cart 
if (goTocCartBtn) {
    goTocCartBtn.onclick = () => {
        console.log("gotocart");
        window.location.href = "./cart.html";
    }
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
function onDev() {

    alert("On Development");
}

/// database 
//=====firestore initialize=====///
const db = firebase.firestore();

if (auth.currentUser) {

    var productsCollection = db.collection("products").doc("T-Shirt").get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });;
}

//readfile 
function readText(that) {

    if (that.files && that.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var output = e.target.result;

            //process text to show only lines with "@":				
            output = output.split("\n").filter(/./.test, /\@/).join("\n");

            document.getElementById('main').innerHTML = output;
        };//end onload()
        reader.readAsText(that.files[0]);
    }//end if html5 filelist support
}


// send feedback
if (submitBtn) {
    submitBtn.onclick = () => {
        console.log("sent feedback");
        document.getElementById("gift").style.display = "block";
        const nameFeedback = document.getElementById("name-field").value;
        const emailFeedback = document.getElementById("email-field").value;
        const messageFeedback = document.getElementById("message-field").value;
        console.log(nameFeedback, emailFeedback, messageFeedback);
        postFeedback(nameFeedback, emailFeedback, messageFeedback);


        resetBtn.click();
    }
}
function postFeedback(nameFeedback, emailFeedback, messageFeedback) {
    var newFeedback = {
        name: nameFeedback,
        email: emailFeedback,
        message: messageFeedback
    };

    var updates = {};
    updates['/feedbacks/' + nameFeedback] = newFeedback;

    return firebase.database().ref().update(updates);
}