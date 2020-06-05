let elements = {};

async function checkTags() {
  elements = {};
  let output = document.getElementById("output");
  let hidden = document.getElementById("hidden");
  let link = document.getElementById("link").value;
  if (link == "") return;
  let text = await fetchHtmlAsText(link);
  // console.log(text);
  hidden.innerHTML = text;
  traverse(hidden);
  output.innerText = JSON.stringify(elements, null, 2) + "\n";
  output.innerText += "total: " + count(elements);
}

async function fetchHtmlAsText(url) {
  const response = await fetch(url);
  return await response.text();
}

function traverse(element) {
  for (let child of element.children) {
    if (!elements[child.tagName])
      elements[child.tagName] = 1;
    else
      elements[child.tagName]++;
    traverse(child);
  }
}

function count(elements) {
  let total = 0;
  let countedH = false;
  for (el in elements) {
    if (el == "META" || el == "TITLE" || el == "LINK" || el == "STYLE" || el == "SCRIPT") continue;
    if (el.length = 2 && el.search(/h\d/gi) == 0) {
      if(countedH){
        continue
      }
      countedH++;
    }
    total++;
  }
  return total;
}