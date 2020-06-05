"use strict";
var A05;
(function (A05) {
    /*
    ACHTUNG!
    Bitte bedenken Sie, dass diese Lösung nur eine von vielen möglichen ist!
  
    Programmieren ist ein kreativer Prozess mit mehr als einer Lösung.
    Wir versuchen selbstverständlich Ihnen die beste Balance aus Verständlichkeit, Machbarkeit, Umsetzung etc. zu präsentieren, aber das gelingt nicht immer.
    Und auch wir sind nur Menschen und machen Gelegentlich mal Fehler. Wenn Sie Fragen zu diesem Beispiel haben, wenden Sie sich gerne an uns.
    */
    for (let i = 0; i < A05.data.length; i++) {
        let productDiv = document.createElement("div");
        productDiv.classList.add("product");
        //Name
        let productName = document.createElement("span");
        productName.innerText = A05.data[i].name;
        productName.classList.add("product-name");
        productDiv.appendChild(productName);
        //Image
        let productImg = document.createElement("img");
        productImg.src = A05.data[i].img;
        productImg.alt = A05.data[i].name;
        productImg.classList.add("product-img");
        productDiv.appendChild(productImg);
        //Description
        let productDesc = document.createElement("span");
        productDesc.innerText = A05.data[i].description;
        productDesc.classList.add("product-desc");
        productDiv.appendChild(productDesc);
        //Price
        let productPrice = document.createElement("span");
        productPrice.innerText = A05.data[i].price.toLocaleString("de-DE", { currency: "EUR", style: "currency" });
        productPrice.classList.add("product-price");
        productDiv.appendChild(productPrice);
        //Button
        let productBtn = document.createElement("button");
        productBtn.innerText = "Buy";
        productBtn.classList.add("product-btn");
        productDiv.appendChild(productBtn);
        document.getElementById(A05.data[i].category + "-content")?.appendChild(productDiv);
    }
})(A05 || (A05 = {}));
//# sourceMappingURL=script.js.map