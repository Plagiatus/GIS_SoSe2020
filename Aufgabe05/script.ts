namespace A05 {
  for (let i: number = 0; i < data.length; i++) {
    let productDiv: HTMLDivElement = document.createElement("div");
    productDiv.classList.add("product");

    //Name
    let productName: HTMLSpanElement = document.createElement("span");
    productName.innerText = data[i].name;
    productName.classList.add("product-name");
    productDiv.appendChild(productName);

    //Image
    let productImg: HTMLImageElement = document.createElement("img");
    productImg.src = data[i].img;
    productImg.alt = data[i].name;
    productImg.classList.add("product-img");
    productDiv.appendChild(productImg);

    //Description
    let productDesc: HTMLSpanElement = document.createElement("span");
    productDesc.innerText = data[i].description;
    productDesc.classList.add("product-desc");
    productDiv.appendChild(productDesc);

    //Price
    let productPrice: HTMLSpanElement = document.createElement("span");
    productPrice.innerText = data[i].price.toLocaleString("de-DE", { currency: "EUR", style: "currency" });
    productPrice.classList.add("product-price");
    productDiv.appendChild(productPrice);
    
    //Button
    let productBtn: HTMLButtonElement = document.createElement("button");
    productBtn.innerText = "Buy";
    productBtn.classList.add("product-btn");
    productDiv.appendChild(productBtn);


    document.getElementById(data[i].category + "-content")?.appendChild(productDiv);
  }
}