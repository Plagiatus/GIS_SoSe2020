async function communicate(_url: RequestInfo): Promise<void> {
  let response: Response = await fetch(_url);
  let text: string = await response.text();
  console.log("Response", text);
}

async function beispiel(): Promise<void> {
  console.log("Vorher");
  await communicate("https://hs-furtwangen.github.io/GIS-SoSe-2020/L07/test.txt");
  console.log("Nachher");
  // generatePage();
}
beispiel();

let div: HTMLDivElement = document.createElement("div");
div.setAttribute("apfel", "birne");
console.log(div.getAttribute("apfel"));
document.body.appendChild(div);