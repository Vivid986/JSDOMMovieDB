const addButton = document.querySelector("header button");
const addModal = document.getElementById("add-modal");
const backdrop = document.getElementById("backdrop");
const cancelAddMovieButton = addModal.querySelector(".btn--passive");
const addMovieButton = addModal.querySelector(".btn--success");
const inputs = addModal.querySelectorAll("input");
const movieList = document.getElementById("movie-list");
const entryText = document.getElementById("entry-text");
const deleteModal = document.getElementById("delete-modal");

const movies = [];

const toggleBackdrop = () => {
  backdrop.classList.toggle("visible");
};

const onClickBackdrop = () => {
  closeAddMovieModal();
  closeDeleteMovieModel();
  toggleBackdrop();
};

const openAddMovieModalHandler = () => {
  addModal.classList.add("visible");
  toggleBackdrop();
};

const closeAddMovieModal = () => {
  addModal.classList.remove("visible");
  clearInputs();
  toggleBackdrop();
};

const updateUI = () => {
  if (movies.length === 0) {
    entryText.style.display = "block";
    movieList.style.display = "none";
  } else {
    entryText.style.display = "none";
    movieList.style.display = "block";
  }
};

const clearInputs = () => {
  for (const input of inputs) {
    input.value = "";
  }
};

const closeDeleteMovieModel = () => {
  deleteModal.classList.remove("visible");
  toggleBackdrop();
};

const deleteMovieHandler = (movieId) => {
  console.log(movieId);

  let movieIndex = 0;
  for (const movie of movies) {
    if (movie.id === movieId) {
      break;
    }
    movieIndex++;
  }

  movies.splice(movieIndex, 1);
  movieList.removeChild(movieList.children[movieIndex]);
  updateUI();
  closeDeleteMovieModel();
};

const startDeleteMovieHandler = (movieId) => {
  deleteModal.classList.add("visible");
  toggleBackdrop();

  const cancelDeleteButton = deleteModal.querySelector(".btn--passive");
  let confirmDeleteButton = deleteModal.querySelector(".btn--danger");

  cancelDeleteButton.removeEventListener("click", closeDeleteMovieModel);
  //todo : wont work because, bind gives new fxn, since fxn is object
  //event if two objects have same value, they aren't equal
  // confirmDeleteButton.removeEventListener(
  //   "click",
  //   deleteMovieHandler.bind(null, movieId)
  // );

  //? to create a new button.
  //by doing this, the old node wont be referenced and will be garbage collected
  confirmDeleteButton.replaceWith(confirmDeleteButton.cloneNode(true));
  confirmDeleteButton = deleteModal.querySelector(".btn--danger");

  cancelDeleteButton.addEventListener("click", closeDeleteMovieModel);
  confirmDeleteButton.addEventListener(
    "click",
    deleteMovieHandler.bind(null, movieId)
  );
};

const createMovieElement = (movie) => {
  const movieElement = document.createElement("li");
  movieElement.innerHTML = `
    <div class='movie-element__image'>
      <img src='${movie.imageUrl}' alt='${movie.title}'>
    </div>
    <div class='movie-element__info'>
      <h2>${movie.title}</h2>
      <p>${movie.rating}/5 stars</p>
    </div>
  `;

  movieElement.className = "movie-element";

  movieElement.addEventListener(
    "click",
    startDeleteMovieHandler.bind(null, movie.id)
  );

  movieList.append(movieElement);
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

  movies.push(newMovie);
  console.log(movies);
  createMovieElement(newMovie);
  clearInputs();
};

const addMovieHandler = () => {
  addMovie();
  updateUI();
  closeAddMovieModal();
};

addButton.addEventListener("click", openAddMovieModalHandler);
cancelAddMovieButton.addEventListener("click", closeAddMovieModal);
addMovieButton.addEventListener("click", addMovieHandler);
backdrop.addEventListener("click", onClickBackdrop);
