namespace A07 {
  /*
  ACHTUNG!
  Bitte bedenken Sie, dass diese Lösung nur eine von vielen möglichen ist!

  Programmieren ist ein kreativer Prozess mit mehr als einer Lösung.
  Wir versuchen selbstverständlich Ihnen die beste Balance aus Verständlichkeit, Machbarkeit, Umsetzung etc. zu präsentieren, aber das gelingt nicht immer.
  Und auch wir sind nur Menschen und machen Gelegentlich mal Fehler. Wenn Sie Fragen zu diesem Beispiel haben, wenden Sie sich gerne an uns.
  */

  export interface Product {
    name: string;
    description: string;
    img: string;
    price: number;
    category: string;
  }

  let data: Product[] = [];
  generatePage();

  async function loadJSON(): Promise<Product[]> {
    let response: Response = await fetch("data.json");
    let json: Product[] = await response.json();
    console.log(json);
    return json;
  }

  async function generatePage(): Promise<void> {
    updateCartCounter(localStorage.length);
    data = await loadJSON();

    //setup Eventlisteners
    document.getElementById("sort-things")?.addEventListener("click", sort);
    document.getElementById("sort-places")?.addEventListener("click", sort);
    document.getElementById("sort-all")?.addEventListener("click", sort);
    document.getElementById("sort-text")?.addEventListener("input", sortWithText);

    //load products
    for (let i: number = 0; i < data.length; i++) {
      let productDiv: HTMLDivElement = document.createElement("div");
      productDiv.setAttribute("productIndex", i.toString());
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
      productBtn.addEventListener("click", putInCart);
      productDiv.appendChild(productBtn);


      document.getElementById(data[i].category + "-content")?.appendChild(productDiv);
    }
  }

  let totalPrice: number = 0;

  function putInCart(_event: Event): void {
    let target: HTMLElement = (<HTMLElement>_event.target).parentElement!;
    let index: number = parseInt(<string>target.getAttribute("productIndex"));
    let price: number = data[index].price;
    totalPrice += price;
    console.log(totalPrice.toFixed(2));
    addToCart(index);
    updateCartCounter(localStorage.length);
  }

  function updateCartCounter(_amount: number): void {
    let cartDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("cart");
    let cartCounter: HTMLSpanElement = <HTMLSpanElement>cartDiv.querySelector("#cart-counter");
    if (cartCounter) cartCounter.remove();
    cartCounter = document.createElement("span");
    cartCounter.id = "cart-counter";
    cartCounter.innerText = _amount.toString();
    cartDiv.appendChild(cartCounter);
  }

  // sorting

  function sort(_event: Event): void {
    let categoryToSort: string = (<HTMLElement>_event.target).id;
    categoryToSort = categoryToSort.split("-")[1];
    for (let i: number = 0; i < data.length; i++) {
      if (data[i].category == categoryToSort || categoryToSort == "all") {
        (<HTMLElement>document.querySelector(`[productIndex="${i}"]`)).style.display = "block";
      } else {
        (<HTMLElement>document.querySelector(`[productIndex="${i}"]`)).style.display = "none";
      }
    }
  }

  function sortWithText(_event: Event): void {
    let textToLookFor: string = (<HTMLInputElement>_event.target).value.toLowerCase();
    for (let i: number = 0; i < data.length; i++) {
      if (data[i].name.toLowerCase().includes(textToLookFor) || data[i].description.toLowerCase().includes(textToLookFor)) {
        (<HTMLElement>document.querySelector(`[productIndex="${i}"]`)).style.display = "block";
      } else {
        (<HTMLElement>document.querySelector(`[productIndex="${i}"]`)).style.display = "none";
      }
    }
  }

  //speichere den index im Array als Key und die Menge als Wert im Localstorage
  function addToCart(_index: number): void {
    let item: number = parseInt(localStorage.getItem(_index.toString())!);
    if (item) {
      item++;
      localStorage.setItem(_index.toString(), item.toString());
    } else {
      localStorage.setItem(_index.toString(), "1");
    }
  }

  // Alternative: speichere die Artikel selbst in ein langes Array über JSON strings
  // das braucht natürlich im Cart dann eine andere Verarbeitung, geht aber auch.
  let articlesInCart: Product[] = [];
  function addToCartAlternative(_index: number): void {
    articlesInCart.push(data[_index]);
    localStorage.setItem("cart", JSON.stringify(articlesInCart));
  }
}