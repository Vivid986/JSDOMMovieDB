const addButton = document.querySelector("header button");
const addModal = document.getElementById("add-modal");
const backdrop = document.getElementById("backdrop");
const cancelAddMovieButton = addModal.querySelector(".btn--passive");
const addMovieButton = addModal.querySelector(".btn--success");
const inputs = addModal.querySelectorAll("input");

const movies = [];

const toggleBackdrop = () => {
  backdrop.classList.toggle("visible");
};

const onClickBackdrop = () => {
  closeAddMovieModal();
  toggleBackdrop();
};

const openAddMovieModalHandler = () => {
  addModal.classList.add("visible");
  toggleBackdrop();
};

const closeAddMovieModal = () => {
  addModal.classList.remove("visible");
  toggleBackdrop();
};

const addMovie = () => {
  const title = inputs[0].value;
  const imageUrl = inputs[1].value;
  const rating = inputs[2].value;

  if (
    title.trim() === "" ||
    imageUrl.trim() === "" ||
    rating.trim() === "" ||
    +rating < 1 ||
    +rating > 5
  ) {
    alert("Invalid input fields (Rating should be between 1 and 5)");
    return;
  }

  const newMovie = {
    id: Math.random().toString(),
    title: title,
    imageUrl: imageUrl,
    rating: rating,
  };
};

addButton.addEventListener("click", openAddMovieModalHandler);
cancelAddMovieButton.addEventListener("click", closeAddMovieModal);
backdrop.addEventListener("click", closeAddMovieModal);
