namespace A07 {

  //Dieses Interface und diese Funktion gibt es zweimal, da wäre es am besten, diese nur einmal in einer extra Datei zu haben und diese zusätzlich einzubinden. Hier für eure Übersicht nochmal.
  interface Product {
    name: string;
    description: string;
    img: string;
    price: number;
    category: string;
  }


  async function loadJSON(): Promise<Product[]> {
    let response: Response = await fetch("data.json");
    let json: Product[] = await response.json();
    console.log(json);
    return json;
  }


  let data: Product[] = [];

  generatePage();

  async function generatePage(): Promise<void> {
    data = await loadJSON();
    document.getElementById("clear-cart")?.addEventListener("click", clearAllItems);
    generateCart();
  }

  // generate Shoppingcart
  function generateCart(): void {
    let cartDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("cart-list");

    if (localStorage.length <= 0) {
      cartDiv.innerHTML = "There are no items in your cart.";
      return;
    }
    cartDiv.innerHTML = "";

    let cartTable: HTMLTableElement = document.createElement("table");
    cartTable.id = "cart-table";
    cartDiv.appendChild(cartTable);

    let total: number = 0;

    for (let i: number = 0; i < localStorage.length; i++) {
      //values
      let key: string = localStorage.key(i)!;
      let index: number = parseInt(key);
      let amount: number = parseInt(localStorage.getItem(key)!);

      //table cells
      let tableRow: HTMLTableRowElement = document.createElement("tr");
      cartTable.appendChild(tableRow);

      let nameElement: HTMLTableDataCellElement = document.createElement("td");
      nameElement.innerText = data[index].name;
      tableRow.appendChild(nameElement);

      let amountElement: HTMLTableDataCellElement = document.createElement("td");
      amountElement.innerText = amount.toString();
      tableRow.appendChild(amountElement);

      let priceElement: HTMLTableDataCellElement = document.createElement("td");
      priceElement.innerHTML = data[index].price.toLocaleString("de-DE", { currency: "EUR", style: "currency" });
      tableRow.appendChild(priceElement);

      let itemTotal: number = amount * data[index].price;
      total += itemTotal;

      let totalElement: HTMLTableDataCellElement = document.createElement("td");
      totalElement.innerHTML = itemTotal.toLocaleString("de-DE", { currency: "EUR", style: "currency" });
      tableRow.appendChild(totalElement);

      let removeBtn: HTMLButtonElement = document.createElement("button");
      removeBtn.innerHTML = "Remove";
      tableRow.appendChild(removeBtn);
      removeBtn.addEventListener("click", removeItem);
      removeBtn.setAttribute("productIndex", index.toString());
    }

    //total row
    let tableRow: HTMLTableRowElement = document.createElement("tr");
    cartTable.appendChild(tableRow);
    //3 empty cells
    for (let i: number = 0; i < 3; i++) {
      let fillerElement: HTMLTableDataCellElement = document.createElement("td");
      tableRow.appendChild(fillerElement);
    }
    let totalElement: HTMLTableDataCellElement = document.createElement("th");
    totalElement.innerText = total.toLocaleString("de-DE", { currency: "EUR", style: "currency" });
    tableRow.appendChild(totalElement);
  }

  function removeItem(_event: Event): void {
    let index: number = parseInt((<HTMLElement>_event.target).getAttribute("productIndex")!);
    let item: number = parseInt(localStorage.getItem(index.toString())!);
    item--;
    if (item == 0) {
      localStorage.removeItem(index.toString());
    } else {
      localStorage.setItem(index.toString(), item.toString());
    }
    generateCart();
  }

  function clearAllItems(_event: Event): void {
    localStorage.clear();
    generateCart();
  }

}
