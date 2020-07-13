namespace A11Client {

  export interface Feedback {
    _id: string;
    name: string;
    freetext: string;
    rating: number;
  }

  // let serverURL: string = "http://localhost:8100";
  let serverURL: string = "https://gis-example.herokuapp.com";
  let starSpans: NodeListOf<Element>;
  init();

  function init(): void {
    document.getElementById("submit-btn")?.addEventListener("click", insert);
    document.getElementById("show-btn")?.addEventListener("click", findAll);
    starSpans = document.querySelectorAll(".rating > span");
    for (let s of starSpans) {
      s.addEventListener("click", selectRating);
    }
  }

  async function insert(_e: Event): Promise<void> {
    let hiddenRatingInput: HTMLInputElement = <HTMLInputElement>document.getElementById("rating-input");
    if (!document.forms[0].checkValidity() || parseInt(hiddenRatingInput.value) < 0) {
      _e.preventDefault();
      return;
    }
    for (let s of starSpans) {
      s.classList.remove("selected");
    }

    let fd: FormData = new FormData(document.forms[0]);
    // tslint:disable-next-line: no-any
    let query: URLSearchParams = new URLSearchParams(<any>fd);
    let response: Response = await fetch(serverURL + "/insert?" + query);
    console.log(await response.json());
    hiddenRatingInput.value = "-1";
  }

  async function findAll(_e: Event): Promise<void> {
    let response: Response = await fetch(serverURL + "/read");
    let feedbacks: Feedback[] = await response.json();
    let out: HTMLDivElement = <HTMLDivElement>document.getElementById("output")!;
    out.innerHTML = "";

    for (let f of feedbacks) {
      out.appendChild(createOneFeedbackDisplay(f));
    }
  }

  function createOneFeedbackDisplay(_f: Feedback): HTMLElement {
    let feedbackDiv: HTMLDivElement = document.createElement("div");
    feedbackDiv.classList.add("one-feedback");
    feedbackDiv.setAttribute("_id", _f._id);

    let starDiv: HTMLDivElement = document.createElement("div");
    let maxStars: number = 5;
    let givenStars: HTMLSpanElement = document.createElement("span");
    givenStars.classList.add("given-stars");
    let notGivenStars: HTMLSpanElement = document.createElement("span");
    for (let i: number = 1; i <= maxStars; i++) {
      if (i > _f.rating) {
        notGivenStars.innerHTML += "&star;";
      } else {
        givenStars.innerHTML += "&starf;";
      }
    }
    starDiv.appendChild(givenStars);
    starDiv.appendChild(notGivenStars);
    feedbackDiv.appendChild(starDiv);

    let nameSpan: HTMLSpanElement = document.createElement("span");
    nameSpan.classList.add("feedback-name");
    nameSpan.innerText = _f.name;
    feedbackDiv.appendChild(nameSpan);

    let feedbackQuote: HTMLQuoteElement = document.createElement("q");
    feedbackQuote.innerText = _f.freetext;
    feedbackDiv.appendChild(feedbackQuote);

    let removeBtn: HTMLButtonElement = document.createElement("button");
    removeBtn.innerText = "Löschen";
    removeBtn.addEventListener("click", removeOne);
    feedbackDiv.appendChild(removeBtn);
    if (isOneOfExampleFeedbacks(_f._id)) {
      removeBtn.disabled = true;
    }

    return feedbackDiv;
  }

  function selectRating(_e: Event): void {
    let clickedStarSpan: HTMLSpanElement = <HTMLSpanElement>_e.target;
    let clickedStar: number = parseInt(clickedStarSpan.getAttribute("rating")!);
    let hiddenRatingInput: HTMLInputElement = <HTMLInputElement>document.getElementById("rating-input");
    hiddenRatingInput.value = clickedStar.toString();
    for (let s of starSpans) {
      s.classList.remove("selected");
    }
    clickedStarSpan.classList.add("selected");
  }

  async function removeOne(_e: Event): Promise<void> {
    let clickedButton: HTMLElement = <HTMLElement>_e.target;
    let parentDiv: HTMLElement = <HTMLElement>clickedButton.parentElement;
    let idToRemove: string = parentDiv.getAttribute("_id")!;
    if (isOneOfExampleFeedbacks(idToRemove)) {
      console.log("No, you can't remove this. Stop messing with the pages code!");
      return;
    }
    let response: Response = await fetch(serverURL + "/removeOne?id=" + idToRemove);
    console.log(await response.json());
    findAll(_e);
  }

  let protectedIDs: string[] = ["5f04564b6cd67d17e07c7f10", "5f048670ff291225a0174c5b", "5f048845ff291225a0174c5d"];
  function isOneOfExampleFeedbacks(_id: string): boolean {
    for (let id of protectedIDs) {
      if (id == _id) return true;
    }
    return false;
  }
}