"use strict";
document.getElementsByTagName("button")[0].addEventListener("click", sendRequest);
async function sendRequest() {
    let url = "https://gis-example.herokuapp.com/";
    let formData = new FormData(document.forms[0]);
    let query = new URLSearchParams(formData);
    url = url + "?" + query.toString();
    let response = await fetch(url);
    let text = await response.text();
    console.log(text);
}
//# sourceMappingURL=script.js.map