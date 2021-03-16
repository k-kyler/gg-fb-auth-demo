(function (d, s, id) {
    var js,
        fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "facebook-jssdk");

window.fbAsyncInit = function () {
    FB.init({
        appId: "533412331392124",
        cookie: true,
        xfbml: true,
        version: "v10.0",
    });

    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
};

function checkLoginState() {
    FB.getLoginStatus(function (response) {
        // console.log(response);
    });
}
function postDataToBackend() {
    FB.api("/me?fields=id,name,picture", function (response) {
        fetch("/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: response.id,
                name: response.name,
                profilePic: response.picture.url,
            }),
        })
            .then((response) => response.json())
            .then((result) => {
                if (result.code === 1) {
                    window.location.href = "/";
                }
            })
            .catch((error) => console.log(error));
    });
}

function statusChangeCallback(response) {
    if (response.status === "connected") {
        postDataToBackend();
    }
}
