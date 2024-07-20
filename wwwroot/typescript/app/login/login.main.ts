function signIn() {

    function loginResult(request: WebRequest) {
        if (request.response == "OK") {
            window.location.replace("/");
            return;
        }
        shakeDialog();
        get("#login .caption").innerHTML = "Invalid user or password";
    }

    function login() {
        let data = {
            name: getInput("#name").value,
            password: getInput("#password").value
        };
        postRequest("/?method=login", data, loginResult);
    }

    let dialog: Dialog = {
        id: "#login",
        onaccept: login
    }

    showDialog(dialog);
}

function main() {
    initTooltips();
}