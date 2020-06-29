document.getElementsByTagName("button")[0].addEventListener("click", sendRequest);

async function sendRequest(): Promise<void> {
  let url: string = "https://gis-example.herokuapp.com/";
  let formData: FormData = new FormData(document.forms[0]);
  // tslint:disable-next-line: no-any
  let query: URLSearchParams = new URLSearchParams(<any>formData);
  url = url + "?" + query.toString();
  let response: Response = await fetch(url);
  let text: string = await response.text();
  console.log(text);
} 