import { authors } from "./data.js";

/**
 * Object containing HTML elements
 * @property {Object} headerButtons - The header buttons
 * @property {Object} list - The list elements
 * @property {Object} overlay - The overlay elements
 * @property {Object} searchOverlay - The search overlay elements
 * @property {Object} settingsOverlay - The settings overlay elements
 */
export const html = {
  headerButtons: {
    search: document.querySelector("[data-header-search]"),
    settings: document.querySelector("[data-header-settings]"),
  },
  list: {
    items: document.querySelector("[data-list-items]"),
    message: document.querySelector("[data-list-message]"),
    button: document.querySelector("[data-list-button]"),
  },
  overlay: {
    active: document.querySelector("[data-list-active]"),
    blur: document.querySelector("[data-list-blur]"),
    image: document.querySelector("[data-list-image]"),
    title: document.querySelector("[data-list-title]"),
    subtitle: document.querySelector("[data-list-subtitle]"),
    description: document.querySelector("[data-list-description]"),
    close: document.querySelector("[data-list-close]"),
  },
  searchOverlay: {
    overlay: document.querySelector("[data-search-overlay]"),
    form: document.querySelector("[data-search-form]"),
    title: document.querySelector("[data-search-title]"),
    genres: document.querySelector("[data-search-genres]"),
    authors: document.querySelector("[data-search-authors]"),
    cancel: document.querySelector("[data-search-cancel]"),
  },
  settingsOverlay: {
    overlay: document.querySelector("[data-settings-overlay]"),
    form: document.querySelector("[data-settings-form]"),
    theme: document.querySelector("[data-settings-theme]"),
    cancel: document.querySelector("[data-settings-cancel]"),
  },
};

/**
 * Create HTML for a book preview
 * @param {Object} preview - The book preview object
 * @param {string} preview.id - The ID of the book
 * @param {string} preview.title - The title of the book
 * @param {string} preview.image - The image URL of the book cover
 * @param {string} preview.author - The ID of the book's author
 * @returns {HTMLElement} - The HTML element representing the book preview
 */
export const createBookHtml = (preview) => {
  const { id, title, image, author } = preview;

  const element = document.createElement("div");
  element.className = "preview";
  element.dataset.id = id;

  element.innerHTML = /* html */ `

    <img class="preview__image" src=${image} alt="Book Cover"></img>
    
    <div class="preview__info"> 
    <div class="preview__title">${title}</div>
    <div class="preview__author">${authors[author]}</div>
    
    </div>

  `;
  return element;
};
