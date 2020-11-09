let elements = {};

async function checkTags() {
  elements = {};
  let output = document.getElementById("output");
  let hidden = document.getElementById("hidden");
  let link = document.getElementById("link").value;
  if (link == "") return;
  output.innerHTML = "";
  let text = await fetchHtmlAsText(link);
  // console.log(text);
  hidden.innerHTML = text;
  traverse(hidden);
  let ul = document.createElement("ul");
  for (let e in elements) {
    let li = document.createElement("li");
    li.classList.add(category(e));
    let span = document.createElement("span");
    span.classList.add("code");
    span.innerText = elements[e];
    li.appendChild(span);
    li.appendChild(new Text(`<${e.toLowerCase()}>`));
    ul.appendChild(li);
  }
  // output.innerText = JSON.stringify(elements, null, 2) + "\n";#
  let counts = count(elements);
  let result = document.createElement("p");
  result.classList.add("totalresult");
  result.innerHTML = `<span class="primary">total: <span class="code">${counts[0]}</span></span> <span class="ok">ok: <span class="code">${counts[1]}</span></span> <span class="maybe">maybe: <span class="code">${counts[2]}</span></span><br><span class="once">(of ok counted as one: <span class="code">${counts[3]}</span>)</span>`;
  output.appendChild(result);
  output.appendChild(ul);
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
  let ok = 0;
  let maybe = 0;
  let total = 0;
  let once = 0;
  let countedH = false;
  for (el in elements) {
    total++;
    if (category(el) == "no") continue;
    if (category(el) == "maybe"){
      maybe++;
      continue;
    }
    if (category(el) == "once"){
      once++;
      continue;
    }
    if (el.length = 2 && el.search(/h\d/gi) == 0) {
      if (countedH) {
        continue
      }
      countedH = true;
    }
    ok++;
  }
  return [total, ok, maybe, once];
}

function category(tag) {
  let no = ["META", "TITLE", "LINK", "STYLE", "SCRIPT", "BODY", "HEADER"];
  let maybe = ["BR", "HEAD", "MAIN", "FOOTER"];
  let once = ["H1", "H2", "H3", "H4", "H5", "H6", "H7"];

  if (no.includes(tag)) return "no";
  if (maybe.includes(tag)) return "maybe";
  if (once.includes(tag)) return "once";
  return "ok";
}

async function checkW3() {
  let w3hiddendiv = document.getElementById("w3hidden");
  let w3div = document.getElementById("w3");
  let link = document.getElementById("link").value;
  w3div.innerHTML = "";
  w3hiddendiv.innerHTML = "";
  let query = new URLSearchParams({ doc: link });
  let newlink = "https://validator.w3.org/nu/?" + query.toString();
  let w3Text = await fetchHtmlAsText(newlink);
  w3hiddendiv.innerHTML = w3Text;
  w3div.appendChild(w3hiddendiv.querySelector("#results"));
}