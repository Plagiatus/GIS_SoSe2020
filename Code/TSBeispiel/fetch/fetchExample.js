"use strict";
async function communicate(_url) {
    let response = await fetch(_url);
    let text = await response.text();
    console.log("Response", text);
}
async function beispiel() {
    console.log("Vorher");
    await communicate("https://hs-furtwangen.github.io/GIS-SoSe-2020/L07/test.txt");
    console.log("Nachher");
    // generatePage();
}
beispiel();
let div = document.createElement("div");
div.setAttribute("apfel", "birne");
console.log(div.getAttribute("apfel"));
document.body.appendChild(div);
//# sourceMappingURL=fetchExample.js.map