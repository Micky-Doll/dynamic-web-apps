/**
 * Importing data and view modules
 */
import { books, BOOKS_PER_PAGE, genres, authors, state } from "./data.js";
import { createBookHtml, html } from "./view.js";

/**
 * Set the default page number
 */
state.pageNumber = 1;

/**
 * Ensure that 'books' is available and is an array, throw an error if not
 * @throws {Error} When 'books' is not available or not an array
 */
if (!books && !Array.isArray(books)) throw new Error("Source required");

/**
 * Theme settings object
 * @type {Object}
 * @property {Object} day - Day theme settings
 * @property {string} day.dark - Dark color for day theme
 * @property {string} day.light - Light color for day theme
 * @property {Object} night - Night theme settings
 * @property {string} night.dark - Dark color for night theme
 * @property {string} night.light - Light color for night theme
 */
const themeSetting = {
  day: {
    dark: "10, 10, 20",
    light: "255, 255, 255",
  },
  night: {
    dark: "255, 255, 255",
    light: "10, 10, 20",
  },
};

/**
 * Create button text based on the array length
 * @param {Array} array - The array to calculate the button text from
 */
const createButtonText = (array) => {
  if (array.length === 0) {
    html.list.button.disabled = true;
    html.list.button.innerHTML = `
Show More <span class="list__remaining">(${0})</span>
`;
  } else {
    html.list.button.disabled = false;
    html.list.button.innerHTML = `
    Show More <span class="list__remaining">(${
      array.length - Object.keys(state.booksLoaded).length
    })</span>`;
  }
};

/**
 *
 * Create a list of books based on the provided array
 * @param {Array} array - The array of books to create the list from
 */
const createBookList = (array) => {
  const startPosition = (state.pageNumber - 1) * BOOKS_PER_PAGE;
  const endPosition = startPosition + BOOKS_PER_PAGE;

  const fragment = document.createDocumentFragment();
  const extracted = array.slice(startPosition, endPosition); // Accounting for arrays starting at 0

  for (let i = 0; i < extracted.length; i++) {
    const bookInfo = extracted[i];
    state.booksLoaded[bookInfo.id] = bookInfo;
    const preview = createBookHtml(bookInfo); // preview = what createBookHtml returns
    fragment.appendChild(preview);
  }

  state.pageNumber += 1;

  html.list.items.appendChild(fragment);
  createButtonText(array);
};

/**
 * Create dropdown menu options for Authors
 */
const createAuthorOptions = () => {
  const fragment = document.createDocumentFragment();

  const defaultOption = document.createElement("option");
  defaultOption.value = "any";
  defaultOption.innerText = "All Authors";
  fragment.appendChild(defaultOption);

  let authorIdArray = Object.keys(authors);
  for (let i = 0; i < authorIdArray.length; i++) {
    const id = authorIdArray[i];
    const option = document.createElement("option");
    option.value = id;
    option.innerText = authors[id];
    fragment.appendChild(option);
  }

  html.searchOverlay.authors.appendChild(fragment);
};

/**
 * Create dropdown menu options for Genres
 */
const createGenreOptions = () => {
  const fragment = document.createDocumentFragment();

  const defaultOption = document.createElement("option");
  defaultOption.value = "any";
  defaultOption.innerText = "All Genres";
  fragment.appendChild(defaultOption);

  let genreIdArray = Object.keys(genres);
  for (let i = 0; i < genreIdArray.length; i++) {
    const id = genreIdArray[i];
    const option = document.createElement("option");
    option.value = id;
    option.innerText = genres[id];
    fragment.appendChild(option);
  }

  html.searchOverlay.genres.appendChild(fragment);
};

// Functions that run when the page first loads

createBookList(books);
createAuthorOptions();
createGenreOptions();

// Checking for and matching local browser preferences for Light/Dark theme
if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
) {
  state.theme = "night";
}

// Event Handlers

/**
 * Toggle search overlay attribute open
 * @param {Event} event - The event object
 */
const handleSearchToggle = (event) => {
  html.searchOverlay.overlay.toggleAttribute("open");
};

/**
 * Toggle settings overlay attribute open
 * @param {Event} event - The event object
 */
const handleSettingsToggle = (event) => {
  html.settingsOverlay.overlay.toggleAttribute("open");
};

/**
 * Get ID value from click event and use it to display information in the overlay
 * @param {Event} event - The event object
 */
const handleItemClick = (event) => {
  event.preventDefault();
  html.overlay.active.toggleAttribute("open");

  let idValue = null;

  if (
    [
      "preview",
      "preview__image",
      "preview__info",
      "preview__author",
      "preview__title",
    ].includes(event.srcElement.classList[0])
  ) {
    const path = event.path || event.composedPath();
    for (const element of path) {
      const { id } = element.dataset;
      if (id) {
        idValue = id;
        break;
      }
    }
  }

  const published = new Date(state.booksLoaded[idValue].published);

  html.overlay.blur.setAttribute("src", state.booksLoaded[idValue].image);
  html.overlay.image.setAttribute("src", state.booksLoaded[idValue].image);
  html.overlay.title.innerText = state.booksLoaded[idValue].title;
  html.overlay.subtitle.innerText = `${
    authors[state.booksLoaded[idValue].author]
  } (${published.getFullYear()})`;
  html.overlay.description.innerText = state.booksLoaded[idValue].description;
};

/**
 * Handle the "Show More" action
 */
const handleShowMore = () => {
  createBookList(books);
};

/**
 * Day/Night Mode Toggle
 * Handle settings form submission
 * @param {Event} event - The event object
 */
const handleSettingsSubmit = (event) => {
  event.preventDefault();
  const theme = event.target[0].value;

  if (theme === "night") {
    state.theme = "dark";
  } else {
    state.theme = "light";
  }

  document.documentElement.style.setProperty(
    "--color-dark",
    themeSetting[theme].dark
  );
  document.documentElement.style.setProperty(
    "--color-light",
    themeSetting[theme].light
  );

  handleSettingsToggle();
};

/**
 * Handle search form submission
 * @param {Event} event - The event object
 */
const handleSearchSubmit = (event) => {
  event.preventDefault();
  const titleValue = event.target[0].value.trim();
  const genreID = event.target[1].value;
  const authorID = event.target[2].value;
  state.pageNumber = 1;
  state.searchResult = [];
  state.booksLoaded = {};
  state.isSearching = true;

  // const searchResults = filterBooks (titleValue, genreID, authorID)
  const searchResults = books.filter((book) => {
    const titleCheck =
      titleValue === ""
        ? true
        : book["title"].toLowerCase().includes(titleValue.toLowerCase());
    const genreCheck =
      genreID === "any" ? true : book["genres"].includes(genreID);
    const authorCheck = authorID === "any" ? true : book["author"] === authorID;

    return titleCheck && genreCheck && authorCheck;
  });

  while (html.list.items.hasChildNodes()) {
    html.list.items.removeChild(html.list.items.firstChild);
  }

  if (searchResults.length === 0) {
    createButtonText(searchResults);
    handleSearchToggle();
    html.list.message.style.display = "block";
    return;
  } else {
    html.list.message.style.display = "none";
    for (const element in searchResults) {
      state.searchResult.push(searchResults[element]);
    }
  }

  createBookList(state.searchResult);
  handleSearchToggle();
};

// Function to filter books based on search criteria
// const filterBooks = (titleValue, genreID, authorID) => {
//   return books.filter((book) => {
//     const titleCheck =
//     titleValue === ""
//       ? true
//       : book["title"].toLowerCase().includes(titleValue.toLowerCase());
//     const genreCheck =
//       genreID === "any" ? true : book["genres"].includes(genreID);
//     const authorCheck = authorID === "any" ? true : book["author"] === authorID;

//     return titleCheck && genreCheck && authorCheck;
//   });
// };

// Event Listeners
const attachEventListeners = () => {
  html.headerButtons.search.addEventListener("click", handleSearchToggle);

  html.searchOverlay.cancel.addEventListener("click", handleSearchToggle);
  html.searchOverlay.form.addEventListener("submit", handleSearchSubmit);

  html.headerButtons.settings.addEventListener("click", handleSettingsToggle);
  html.settingsOverlay.cancel.addEventListener("click", handleSettingsToggle);

  html.list.items.addEventListener("click", handleItemClick);
  html.overlay.close.addEventListener("click", handleItemClick);
  html.list.button.addEventListener("click", handleShowMore);

  html.settingsOverlay.form.addEventListener("submit", handleSettingsSubmit);
};

attachEventListeners();
