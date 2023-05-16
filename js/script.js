// ! -------------------------------------- NFT ---------------------

// ? pull out from html

let btnModalAdd = document.querySelector(".btn-modalAdd");
let btnCancel = document.querySelector(".btn-cancel");
let modal = document.querySelector(".modal");

// ? add event to buttons

btnModalAdd.addEventListener("click", () => {
  modal.style.display = "flex";
});

btnCancel.addEventListener("click", () => {
  modal.style.display = "none";
});
