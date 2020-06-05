namespace A05 {
  /*
  ACHTUNG!
  Bitte bedenken Sie, dass diese Lösung nur eine von vielen möglichen ist!

  Programmieren ist ein kreativer Prozess mit mehr als einer Lösung.
  Wir versuchen selbstverständlich Ihnen die beste Balance aus Verständlichkeit, Machbarkeit, Umsetzung etc. zu präsentieren, aber das gelingt nicht immer.
  Und auch wir sind nur Menschen und machen Gelegentlich mal Fehler. Wenn Sie Fragen zu diesem Beispiel haben, wenden Sie sich gerne an uns.
  */

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