"use strict";
var A07;
(function (A07) {
    async function loadJSON() {
        let response = await fetch("data.json");
        let json = await response.json();
        console.log(json);
        return json;
    }
    let data = [];
    generatePage();
    async function generatePage() {
        data = await loadJSON();
        document.getElementById("clear-cart")?.addEventListener("click", clearAllItems);
        generateCart();
    }
    // generate Shoppingcart
    function generateCart() {
        let cartDiv = document.getElementById("cart-list");
        if (localStorage.length <= 0) {
            cartDiv.innerHTML = "There are no items in your cart.";
            return;
        }
        cartDiv.innerHTML = "";
        let cartTable = document.createElement("table");
        cartTable.id = "cart-table";
        cartDiv.appendChild(cartTable);
        let total = 0;
        for (let i = 0; i < localStorage.length; i++) {
            //values
            let key = localStorage.key(i);
            let index = parseInt(key);
            let amount = parseInt(localStorage.getItem(key));
            //table cells
            let tableRow = document.createElement("tr");
            cartTable.appendChild(tableRow);
            let nameElement = document.createElement("td");
            nameElement.innerText = data[index].name;
            tableRow.appendChild(nameElement);
            let amountElement = document.createElement("td");
            amountElement.innerText = amount.toString();
            tableRow.appendChild(amountElement);
            let priceElement = document.createElement("td");
            priceElement.innerHTML = data[index].price.toLocaleString("de-DE", { currency: "EUR", style: "currency" });
            tableRow.appendChild(priceElement);
            let itemTotal = amount * data[index].price;
            total += itemTotal;
            let totalElement = document.createElement("td");
            totalElement.innerHTML = itemTotal.toLocaleString("de-DE", { currency: "EUR", style: "currency" });
            tableRow.appendChild(totalElement);
            let removeBtn = document.createElement("button");
            removeBtn.innerHTML = "Remove";
            tableRow.appendChild(removeBtn);
            removeBtn.addEventListener("click", removeItem);
            removeBtn.setAttribute("productIndex", index.toString());
        }
        //total row
        let tableRow = document.createElement("tr");
        cartTable.appendChild(tableRow);
        //3 empty cells
        for (let i = 0; i < 3; i++) {
            let fillerElement = document.createElement("td");
            tableRow.appendChild(fillerElement);
        }
        let totalElement = document.createElement("th");
        totalElement.innerText = total.toLocaleString("de-DE", { currency: "EUR", style: "currency" });
        tableRow.appendChild(totalElement);
    }
    function removeItem(_event) {
        let index = parseInt(_event.target.getAttribute("productIndex"));
        let item = parseInt(localStorage.getItem(index.toString()));
        item--;
        if (item == 0) {
            localStorage.removeItem(index.toString());
        }
        else {
            localStorage.setItem(index.toString(), item.toString());
        }
        generateCart();
    }
    function clearAllItems(_event) {
        localStorage.clear();
        generateCart();
    }
})(A07 || (A07 = {}));
//# sourceMappingURL=cart.js.map