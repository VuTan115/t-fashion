
// login

const loginWithGg = document.getElementById('login-gg');
const loginWithFb = document.getElementById('login-fb');
const loginWithSms = document.getElementById('login-sms');
const loginForm = document.getElementById("login-form");
// sign up

const signupWithGg = document.getElementById('signup-gg');
const signupWithFb = document.getElementById('signup-fb');
const signupWithSms = document.getElementById('signup-sms');
const signupForm = document.getElementById("signup-form");


function validateEmail(email) {

    const regMail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return regMail.test(String(email));
}
function validatePass(password) {

    const regPass = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
    return regPass.test(String(password));
}
//provider
const GoogleProvider = new firebase.auth.GoogleAuthProvider();
const FacebookProvider = new firebase.auth.FacebookAuthProvider();

// amination
const logInButton = document.getElementById('logIn-ani');
const signUpButton = document.getElementById('signUp-ani');
const container = document.getElementById('container');
if (signUpButton && logInButton) {
    signUpButton.addEventListener('click', () => {
        container.classList.add("right-panel-active");
    });
    logInButton.addEventListener('click', () => {
        container.classList.remove("right-panel-active");
    });
}

if (loginForm != null) {
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const email = loginForm['login-email'].value;
        const password = loginForm['login-password'].value;
        if (validateEmail(email) && validatePass(password)) {
            auth.signInWithEmailAndPassword(email, password)
                .then(() => {

                    window.location.href = "./index.html";
                }).
                catch(err => {
                    alert(err.message)
                    console.log(err);
                }
                )
        }
        else {
            alert("Mật khẩu cần có ít nhất 8 ký tự bao gồm cả ký tự đặc biệt");
            console.log(email, password);

        }

    });
}
if (signupForm) {
    signupForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const nameField = signupForm['userName'].value
        const email = signupForm['signup-email'].value;
        const password = signupForm['signup-password'].value;
        const confirmPassword = signupForm['confirm-password'].value;
        // confirm password
        if (password != confirmPassword) {
            alert("Password not match!");
            signupForm['confirm-password'].value = '';
            return;
        }
        //validate
        if (validateEmail(email) && validatePass(password)) {

            auth.createUserWithEmailAndPassword(email, password)
                .then(() => {
                    auth.currentUser.updateProfile({
                        displayName: nameField,
                    }).then(function () {
                        alert("creat user sucessful ");
                    }).catch(function (error) {
                    });
                    window.location.href = "./index.html"
                }).
                catch(err => {
                    alert(err.message)
                    console.log(err);
                }
                )
        }
        else {
            alert("Mật khẩu cần có ít nhất 8 ký tự bao gồm cả ký tự đặc biệt");
            console.log(email, password);

        }

    });
}





///======= user state ======================///
let authState = firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        console.log("Hello " + (firebaseUser.displayName));
        // create Element to replace
        var userName = document.createElement("div");
        var userAvt = document.createElement("li");

        // create Element to replace
        if (firebaseUser.displayName) {
            userName.innerHTML = '<h2>' + firebaseUser.displayName.trim().replace(/[0-9]/g, '') + '</h2>'
        } else {

            userName.innerHTML = '<h2>' + firebaseUser.email.replace("@gmail.com", ""); + '</h2>'
        }
        if (firebaseUser.photoURL) {
            userAvt.innerHTML = '<img src="' + firebaseUser.photoURL + '"/>'
        }
        // replace element
        const circleAvt = document.querySelector("#menuItems li:last-child");
        if (firebaseUser.photoURL && circleAvt) {
            circleAvt.parentNode.replaceChild(userAvt, circleAvt);
        }
        if (signUpBtn) {
            signUpBtn.parentNode.replaceChild(userName, signUpBtn);
        }
        if (signOutBtn) signOutBtn.classList.remove("hidden");
    }
    else {
        console.log("Not login yet !");
    }
})


// onclick function

function ggAuthen() {
    auth.signInWithPopup(GoogleProvider)
        .then(() => {
            console.log("relaod?");
            window.location.href = "./index.html"
        }).
        catch(err => {
            console.log(err);
        }
        )
}
function fbAuthen() {
    auth.signInWithPopup(FacebookProvider)
        .then(() => {
            window.location.href = "./index.html"
        }).
        catch(err => {
            console.log(err);
        }
        )
}
if (loginWithGg && loginWithFb) {
    loginWithGg.onclick = ggAuthen;
    loginWithFb.onclick = fbAuthen;
    signupWithGg.onclick = ggAuthen
    signupWithFb.onclick = fbAuthen;

}
if (signOutBtn) {
    signOutBtn.onclick = () => {
        auth.signOut();
        window.location.href = "./index.html"

    };
}