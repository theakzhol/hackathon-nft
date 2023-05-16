// ! -------------------------------------- NFT ---------------------

const API = "http://localhost:8000/product";

let editer_id = 0;

// ? pull out from html

let btnModalAdd = document.querySelector(".btn-modalAdd");
let btnCancel = document.querySelector(".btn-cancel");
let modal = document.querySelector(".modal");
let render = document.querySelector(".main-content");
let inpName = document.querySelector(".name");
let inpDescr = document.querySelector(".descr");
let inpPrice = document.querySelector(".price");
let inpImg = document.querySelector(".img");
let btnCreate = document.querySelector(".btn-create");
let body = document.querySelector("body");
let btnSave = document.querySelector(".btn-save");

// ? add event to buttons

btnModalAdd.addEventListener("click", () => {
  modal.style.display = "flex";
});

btnCancel.addEventListener("click", () => {
  modal.style.display = "none";
});

// ? ------------------------------------ ADD ----------------------

btnCreate.addEventListener("click", addNft);

async function addNft() {
  // check for empty input
  if (
    !inpName.value.trim() ||
    !inpDescr.value.trim() ||
    !inpPrice.value.trim() ||
    !inpImg.value.trim()
  ) {
    alert("FILL INPUT");
    return;
  }

  let product = {
    name: inpName.value,
    descr: inpDescr.value,
    price: inpPrice.value,
    img: inpImg.value,
  };

  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(product),
  })
    .then((res) => res.json())
    .then((data) => console.log(data));

  inpName.value = "";
  inpDescr.value = "";
  inpPrice.value = "";
  inpImg.value = "";

  modal.style.display = "none";

  read();
}

// ? --------------------------------- READ ----------------------

async function read() {
  let cards = await fetch(`${API}`);
  let res = await cards.json();

  console.log(res);

  render.innerHTML = "";

  res.forEach((element) => {
    render.innerHTML += `<div class="cards">
    <div class="card-img">
      <img src="${element.img}" alt="img error" class="card-img" style="width: 40%"/>
    </div>
    <div class="card-title">
      <h2>${element.name}</h2>
      <p>${element.descr}</p>
      <p>${element.price}$</p>
    </div>
    <div class="card-btn"> 
      <button onclick="updateNft(${element.id})" class="btn-edit">Edit</button>
      <button onclick="deleteNft(${element.id})" class="btn-delete">Delete</button>
    </div>`;
  });
}

read();
// slider start
const galleryContainer = document.querySelector(".gallery-container");
const galleryControlsContainer = document.querySelector(".gallery-controls");
const galleryControls = ["previous", "next"];
const galleryItems = document.querySelectorAll(".gallery-item");

class Carousel {
  constructor(container, items, controls) {
    this.carouselContainer = container;
    this.carouselControls = controls;
    this.carouselArray = [...items];
  }
  // Update css classes for gallery
  updateGallery() {
    this.carouselArray.forEach((el) => {
      el.classList.remove("gallery-item-1");
      el.classList.remove("gallery-item-2");
      el.classList.remove("gallery-item-3");
      el.classList.remove("gallery-item-4");
      el.classList.remove("gallery-item-5");
    });

    this.carouselArray.slice(0, 5).forEach((el, i) => {
      el.classList.add(`gallery-item-${i + 1}`);
    });
  }

  // Update the current order of the carouselArray and gallery
  setCurrentState(direction) {
    if (direction.className == "gallery-controls-previous") {
      this.carouselArray.unshift(this.carouselArray.pop());
    } else {
      this.carouselArray.push(this.carouselArray.shift());
    }

    this.updateGallery();
  }

  setControls() {
    this.carouselControls.forEach((control) => {
      galleryControlsContainer.appendChild(
        document.createElement("button")
      ).className = `gallery-controls-${control}`;

      document.querySelector(`.gallery-controls-${control}`).innerText =
        control;
    });
  }

  useControls() {
    const triggers = [...galleryControlsContainer.childNodes];

    triggers.forEach((control) => {
      control.addEventListener("click", (e) => {
        e.preventDefault();

        if (control.className == "gallery-controls-add") {
          const newItem = document.createElement("img");
          const latestItem = this.carouselArray.length;
          const latestIndex =
            this.carouselArray.findIndex(
              (item) =>
                item.getAttribute("data-index") == this.carouselArray.length
            ) + 1;

          this.carouselArray.splice(latestIndex, 0, newItem);
          document.querySelector(`[data-index="${latestItem}"]`).after(newItem);
          this.updateGallery();
        } else {
          this.setCurrentState(control);
        }
      });
    });
  }
}

function callfunc() {
  console.log("this func is being caled");
}
const exampleCarousel = new Carousel(
  galleryContainer,
  galleryItems,
  galleryControls
);

exampleCarousel.setControls();
// exampleCarousel.setNav();
exampleCarousel.useControls();
// slider end

// ? ------------------------------------- DELETE -----------------

async function deleteNft(id) {
  await fetch(`${API}/${id}`, {
    method: "DELETE",
  });
  read();
}

// ? ------------------------------- UPTADE ---------------------
