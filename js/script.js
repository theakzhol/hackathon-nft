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
let inpSearch = document.querySelector(".inp-search");
let btnSearch = document.querySelector(".btn-search");

let searchVal = "";

// ? pagination
// let currentPage = 1; // текущая страница
// let pageTotalCount = 1; // общее кол-во страниц
// let pageList = document.querySelector(".page-list");
// let prev = document.querySelector(".btn-previous");
// let next = document.querySelector(".btn-next");

// ? add event to buttons

btnModalAdd.addEventListener("click", () => {
  modal.style.display = "flex";
  btnSave.style.display = "none";
  btnCreate.style.display = "flex";
  body.style.overflow = "hidden";
  inpName.value = "";
  inpDescr.value = "";
  inpPrice.value = "";
  inpImg.value = "";
});

btnCancel.addEventListener("click", () => {
  modal.style.display = "none";
  body.style.overflow = "auto";
});

// ? ----------------------------------------------------------- ADD ----------------------

btnCreate.addEventListener("click", async function () {
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
  });

  inpName.value = "";
  inpDescr.value = "";
  inpPrice.value = "";
  inpImg.value = "";

  modal.style.display = "none";
  body.style.overflow = "auto";

  read();
});

// ? --------------------------------------------------------------- READ ----------------------

async function read() {
  let cards = await fetch(`${API}?q=${searchVal}`);
  let res = await cards.json();

  console.log(res);

  render.innerHTML = "";

  res.forEach((element) => {
    render.insertAdjacentHTML(
      "beforeend",
      `<div class="cards">
    <div class="card-img">
      <img src="${element.img}" alt="img error" class="card-img" style="width: 50%"/>
    </div>
    <div class="card-title">
      <h2>${element.name}</h2>
      <p>${element.descr}</p>
      <p>${element.price}$</p>
    </div>
    <div class="card-btn"> 
      <button onclick="updateNft(${element.id})" class="btn-edit">Edit</button>
      <button onclick="deleteNft(${element.id})" class="btn-delete">Delete</button>
    </div>`
    );
  });
}

read();

// ? ------------------------------------- DELETE -----------------

async function deleteNft(id) {
  await fetch(`${API}/${id}`, {
    method: "DELETE",
  });
  read();
}

// ? ------------------------------- UPTADE ---------------------

async function updateNft(id) {
  editer_id = id;
  let res = await fetch(`${API}/${id}`);
  let cards = await res.json();

  console.log(editer_id);
  console.log(cards);

  modal.style.display = "flex";
  btnCreate.style.display = "none";
  btnSave.style.display = "flex";

  inpName.value = cards.name;
  inpDescr.value = cards.descr;
  inpPrice.value = cards.price;
  inpImg.value = cards.img;

  read(); // Добавлен вызов функции read для обновления списка элементов
}

btnSave.addEventListener("click", async function () {
  let newProduct = {
    name: inpName.value,
    descr: inpDescr.value,
    price: inpPrice.value,
    img: inpImg.value,
  };

  console.log(newProduct);

  fetch(`${API}/${editer_id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newProduct),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      read();
    });

  modal.style.display = "none";
});

// ? ------------------------ SEARCH

btnSearch.addEventListener("click", () => {
  searchVal = inpSearch.value;
  read();
});

read();

// ! ================================================================  slider start ==================================================
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
exampleCarousel.useControls();
// ! =================================================================== slider end =====================================================
