document.getElementsByTagName("button")[0].addEventListener("click", sendRequest);

async function sendRequest() {
  let url: string = "https://gis-example.herokuapp.com/";
  let formData: FormData = new FormData(document.forms[0]);
  let query: URLSearchParams = new URLSearchParams(<any>formData);
  url = url + "?" + query.toString();
  let response: Response = await fetch(url);
  let text: string = await response.text();
  console.log(text);
} 