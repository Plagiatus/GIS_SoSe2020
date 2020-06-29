"use strict";
var Aufgabe09;
(function (Aufgabe09) {
    let baseUrl = "https://gis-example.herokuapp.com/";
    // let baseUrl: string = "http://localhost:8100/";
    document.getElementsByTagName("button")[0].addEventListener("click", sendHTMLRequest);
    document.getElementsByTagName("button")[1].addEventListener("click", sendJSONRequest);
    async function sendRequest(_url) {
        let formData = new FormData(document.forms[0]);
        // tslint:disable-next-line: no-any
        let query = new URLSearchParams(formData);
        _url = _url + "?" + query.toString();
        let response = await fetch(_url);
        return response;
    }
    async function sendHTMLRequest() {
        let response = await sendRequest(baseUrl + "html");
        let text = await response.text();
        document.getElementById("serverResponse").innerHTML = text;
    }
    async function sendJSONRequest() {
        let response = await sendRequest(baseUrl + "json");
        // tslint:disable-next-line: no-any
        let jsonObj = await response.json(); //an dieser Stelle wäre es natürlich schöner, ein interface zu definieren wenn man weiß, was für Daten hier zurück kommen.
        console.log(jsonObj);
    }
})(Aufgabe09 || (Aufgabe09 = {}));
//# sourceMappingURL=script.js.map