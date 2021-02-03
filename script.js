"use strict";

let theActors;
let theFilter = "all";
let popup = document.querySelector("#popup");

document.addEventListener("DOMContentLoaded", start);

async function start() {
  console.log("start");

  let url = "actors.json";
  let jsonData = await fetch(url);
  theActors = await jsonData.json();
  console.log(theActors);

  document.querySelectorAll(".filter").forEach((button) => {
    button.addEventListener("click", buttonClick);
  });

  showActors();
}

function showActors() {
  console.log("showActors");

  let dest = document.querySelector("#actors");
  let temp = document.querySelector("#actor_template");
  dest.innerHTML = "";

  theActors.forEach((actor) => {
    if (theFilter == "all" || theFilter == actor.movie) {
      //console.log(actor);
      let clone = temp.cloneNode(true).content;
      clone.querySelector("h3").textContent = actor.fullname;
      clone.querySelector("p").textContent = actor.movie;
      clone.querySelector(".actor").addEventListener("click", () => showDetails(actor));
      dest.appendChild(clone);
    }
  });
}

function showDetails(actor) {
  console.log(actor);
  popup.style.display = "block";
  document.querySelector(".close").addEventListener("click", () => (popup.style.display = "none"));
  popup.querySelector("h3").textContent = actor.fullname;
  popup.querySelector("p").textContent = actor.movie;
}

function buttonClick() {
  //console.log("buttonClick");
  theFilter = this.dataset.movie;
  //console.log(theFilter);
  document.querySelector(".section_header").textContent = this.textContent;
  document.querySelectorAll(".filter").forEach((button) => {
    button.classList.remove("clicked");
  });
  this.classList.add("clicked");
  showActors(theFilter);
}
