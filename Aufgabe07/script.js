"use strict";
var A07;
(function (A07) {
    /*
    ACHTUNG!
    Bitte bedenken Sie, dass diese Lösung nur eine von vielen möglichen ist!
  
    Programmieren ist ein kreativer Prozess mit mehr als einer Lösung.
    Wir versuchen selbstverständlich Ihnen die beste Balance aus Verständlichkeit, Machbarkeit, Umsetzung etc. zu präsentieren, aber das gelingt nicht immer.
    Und auch wir sind nur Menschen und machen Gelegentlich mal Fehler. Wenn Sie Fragen zu diesem Beispiel haben, wenden Sie sich gerne an uns.
    */
    let data = [];
    generatePage();
    async function loadJSON() {
        let response = await fetch("data.json");
        let json = await response.json();
        console.log(json);
        return json;
    }
    async function generatePage() {
        updateCartCounter(localStorage.length);
        data = await loadJSON();
        //setup Eventlisteners
        document.getElementById("sort-things")?.addEventListener("click", sort);
        document.getElementById("sort-places")?.addEventListener("click", sort);
        document.getElementById("sort-all")?.addEventListener("click", sort);
        document.getElementById("sort-text")?.addEventListener("input", sortWithText);
        //load products
        for (let i = 0; i < data.length; i++) {
            let productDiv = document.createElement("div");
            productDiv.setAttribute("productIndex", i.toString());
            productDiv.classList.add("product");
            //Name
            let productName = document.createElement("span");
            productName.innerText = data[i].name;
            productName.classList.add("product-name");
            productDiv.appendChild(productName);
            //Image
            let productImg = document.createElement("img");
            productImg.src = data[i].img;
            productImg.alt = data[i].name;
            productImg.classList.add("product-img");
            productDiv.appendChild(productImg);
            //Description
            let productDesc = document.createElement("span");
            productDesc.innerText = data[i].description;
            productDesc.classList.add("product-desc");
            productDiv.appendChild(productDesc);
            //Price
            let productPrice = document.createElement("span");
            productPrice.innerText = data[i].price.toLocaleString("de-DE", { currency: "EUR", style: "currency" });
            productPrice.classList.add("product-price");
            productDiv.appendChild(productPrice);
            //Button
            let productBtn = document.createElement("button");
            productBtn.innerText = "Buy";
            productBtn.classList.add("product-btn");
            productBtn.addEventListener("click", putInCart);
            productDiv.appendChild(productBtn);
            document.getElementById(data[i].category + "-content")?.appendChild(productDiv);
        }
    }
    let totalPrice = 0;
    function putInCart(_event) {
        let target = _event.target.parentElement;
        let index = parseInt(target.getAttribute("productIndex"));
        let price = data[index].price;
        totalPrice += price;
        console.log(totalPrice.toFixed(2));
        addToCart(index);
        updateCartCounter(localStorage.length);
    }
    function updateCartCounter(_amount) {
        let cartDiv = document.getElementById("cart");
        let cartCounter = cartDiv.querySelector("#cart-counter");
        if (cartCounter)
            cartCounter.remove();
        cartCounter = document.createElement("span");
        cartCounter.id = "cart-counter";
        cartCounter.innerText = _amount.toString();
        cartDiv.appendChild(cartCounter);
    }
    // sorting
    function sort(_event) {
        let categoryToSort = _event.target.id;
        categoryToSort = categoryToSort.split("-")[1];
        for (let i = 0; i < data.length; i++) {
            if (data[i].category == categoryToSort || categoryToSort == "all") {
                document.querySelector(`[productIndex="${i}"]`).style.display = "block";
            }
            else {
                document.querySelector(`[productIndex="${i}"]`).style.display = "none";
            }
        }
    }
    function sortWithText(_event) {
        let textToLookFor = _event.target.value.toLowerCase();
        for (let i = 0; i < data.length; i++) {
            if (data[i].name.toLowerCase().includes(textToLookFor) || data[i].description.toLowerCase().includes(textToLookFor)) {
                document.querySelector(`[productIndex="${i}"]`).style.display = "block";
            }
            else {
                document.querySelector(`[productIndex="${i}"]`).style.display = "none";
            }
        }
    }
    //speichere den index im Array als Key und die Menge als Wert im Localstorage
    function addToCart(_index) {
        let item = parseInt(localStorage.getItem(_index.toString()));
        if (item) {
            item++;
            localStorage.setItem(_index.toString(), item.toString());
        }
        else {
            localStorage.setItem(_index.toString(), "1");
        }
    }
    // Alternative: speichere die Artikel selbst in ein langes Array über JSON strings
    // das braucht natürlich im Cart dann eine andere Verarbeitung, geht aber auch.
    // let articlesInCart: Product[] = [];
    // function addToCartAlternative(_index: number): void {
    //   articlesInCart.push(data[_index]);
    //   localStorage.setItem("cart", JSON.stringify(articlesInCart));
    // }
})(A07 || (A07 = {}));
//# sourceMappingURL=script.js.map