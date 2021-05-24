class User {
    constructor(uid, photoURL, displayName, email, phoneNumber) {
        this.uid = uid;
        this.phoneNumber = phoneNumber;
        this.displayName = displayName;
        this.email = email;
        this.photoURL = photoURL;
    }
    //getter 
    get uid() { return this.uid };
    get photoURL() { return this.photoURL };
    get displayName() { return this.displayName };
    get email() { return this.email };
    get phoneNumber() { return this.phoneNumber };
    //setter
    set email(email) { this.email = email; }
    set photoURL(photoURL) { this.photoURL = photoURL; }
    set phoneNumber(phoneNumber) { this.phoneNumber = phoneNumber; }
    set displayName(displayName) { this.displayName = displayName; }

    mapJsonToUser(JsonString) {
        return User(
            JsonString["name"],
            JsonString["photoURL"],
            JsonString["email"],
            JsonString["phoneNumber"],
            JsonString["uid"]
        )
    };
    toString() {
        return "UserName " + this.name + '/n' + "email " + this.email + '/n' + "phoneNumber " + this.phoneNumber;
    }
    signUpWithGoogle();
    signUpWithSMS();
    signUpWithFacebook();

    //login 
    loginWithGoogle();
    loginWithSMS();
    loginWithFacebook();
}