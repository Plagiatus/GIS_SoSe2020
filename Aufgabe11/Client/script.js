"use strict";
var A11Client;
(function (A11Client) {
    // let serverURL: string = "http://localhost:8100";
    let serverURL = "https://gis-example.herokuapp.com";
    let starSpans;
    init();
    function init() {
        document.getElementById("submit-btn")?.addEventListener("click", insert);
        document.getElementById("show-btn")?.addEventListener("click", findAll);
        starSpans = document.querySelectorAll(".rating > span");
        for (let s of starSpans) {
            s.addEventListener("click", selectRating);
        }
    }
    async function insert(_e) {
        let hiddenRatingInput = document.getElementById("rating-input");
        if (!document.forms[0].checkValidity() || parseInt(hiddenRatingInput.value) < 0) {
            _e.preventDefault();
            return;
        }
        for (let s of starSpans) {
            s.classList.remove("selected");
        }
        let fd = new FormData(document.forms[0]);
        // tslint:disable-next-line: no-any
        let query = new URLSearchParams(fd);
        let response = await fetch(serverURL + "/insert?" + query);
        console.log(await response.json());
        hiddenRatingInput.value = "-1";
    }
    async function findAll(_e) {
        let response = await fetch(serverURL + "/read");
        let feedbacks = await response.json();
        let out = document.getElementById("output");
        out.innerHTML = "";
        for (let f of feedbacks) {
            out.appendChild(createOneFeedbackDisplay(f));
        }
    }
    function createOneFeedbackDisplay(_f) {
        let feedbackDiv = document.createElement("div");
        feedbackDiv.classList.add("one-feedback");
        feedbackDiv.setAttribute("_id", _f._id);
        let starDiv = document.createElement("div");
        let maxStars = 5;
        let givenStars = document.createElement("span");
        givenStars.classList.add("given-stars");
        let notGivenStars = document.createElement("span");
        for (let i = 1; i <= maxStars; i++) {
            if (i > _f.rating) {
                notGivenStars.innerHTML += "&star;";
            }
            else {
                givenStars.innerHTML += "&starf;";
            }
        }
        starDiv.appendChild(givenStars);
        starDiv.appendChild(notGivenStars);
        feedbackDiv.appendChild(starDiv);
        let nameSpan = document.createElement("span");
        nameSpan.classList.add("feedback-name");
        nameSpan.innerText = _f.name;
        feedbackDiv.appendChild(nameSpan);
        let feedbackQuote = document.createElement("q");
        feedbackQuote.innerText = _f.freetext;
        feedbackDiv.appendChild(feedbackQuote);
        let removeBtn = document.createElement("button");
        removeBtn.innerText = "Löschen";
        removeBtn.addEventListener("click", removeOne);
        feedbackDiv.appendChild(removeBtn);
        return feedbackDiv;
    }
    function selectRating(_e) {
        let clickedStarSpan = _e.target;
        let clickedStar = parseInt(clickedStarSpan.getAttribute("rating"));
        let hiddenRatingInput = document.getElementById("rating-input");
        hiddenRatingInput.value = clickedStar.toString();
        for (let s of starSpans) {
            s.classList.remove("selected");
        }
        clickedStarSpan.classList.add("selected");
    }
    async function removeOne(_e) {
        let clickedButton = _e.target;
        let parentDiv = clickedButton.parentElement;
        let idToRemove = parentDiv.getAttribute("_id");
        let response = await fetch(serverURL + "/removeOne?id=" + idToRemove);
        console.log(await response.json());
        findAll(_e);
    }
})(A11Client || (A11Client = {}));
//# sourceMappingURL=script.js.map