// ! -------------------------------------- NFT ---------------------

const API = "http://localhost:8000/product";

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
  await fetch(API)
    .then((res) => res.json())
    .then((data) => {
      data.forEach((element) => {
        render.innerHTML += `<div class="cards">
        <img src="${element.img}" alt="img error"/>
          <h2>${element.name}</h2>
          <p>${element.descr}</p>
          <p>${element.price}$</p>
        </div>`;
      });
    });
}

read();
