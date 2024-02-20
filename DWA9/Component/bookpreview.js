class BookPreview extends HTMLElement {
  constructor() {
    super(); // When an instance of BookPreview is created, it attaches a shadow DOM to it
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render(); // When the custom element is connected to the DOM, the render method is called to render the content inside the shadow DOM
  }

  render() {
    // The render method retrieves the data attributes (id, image, title, author) from the custom element's dataset
    const { id, image, title, author } = this.dataset;

    // The render method sets the inner HTML of the shadow DOM with the template string containing the HTML and CSS for the book preview
    this.shadowRoot.innerHTML = `

        
          <style>
          .preview {
              border-width: 0;
              width: 100%;
              font-family: Roboto, sans-serif;
              padding: 0.5rem 1rem;
              display: flex;
              align-items: center;
              cursor: pointer;
              text-align: left;
              border-radius: 8px;
              border: 1px solid rgba(var(--color-dark), 0.15);
              background: rgba(var(--color-light), 1);
            }
            
            @media (min-width: 60rem) {
              .preview {
                padding: 1rem;
              }
            }
            
            .preview_hidden {
              display: none;
            }
            
            .preview:hover {
              background: rgba(var(--color-blue), 0.05);
            }
            
            .preview__image {
              width: 48px;
              height: 70px;
              object-fit: cover;
              background: grey;
              border-radius: 2px;
              box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.1), 0px 1px 3px 0px rgba(0, 0, 0, 0.1);
            }
            
            .preview__info {
              padding: 1rem;
            }
            
            .preview__title {
              margin: 0 0 0.5rem;
              font-weight: bold;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              overflow: hidden;
              color: rgba(var(--color-dark), 0.8);
            }
            
            .preview__author {
              color: rgba(var(--color-dark), 0.4);
            }
          </style>
          
          <div class="preview" data-id="${id}">
          <img class="preview__image" src="${image}" alt="Book Cover"></img>
          <div class="preview__info">
            <div class="preview__title">${title}</div>
            <div class="preview__author">${author}</div>
          </div>
        </div>
        `;
  }
}

customElements.define("book-preview", BookPreview);
// This code defines a custom element called "book-preview" which extends the HTMLElement class

class BookPreview extends HTMLElement {
  constructor() {
    super();
    // When an instance of BookPreview is created, it attaches a shadow DOM to it
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    // When the custom element is connected to the DOM, the render method is called to render the content inside the shadow DOM
  }

  render() {
    // The render method retrieves the data attributes (id, image, title, author) from the custom element's dataset
    const { id, image, title, author } = this.dataset;

    // The render method sets the inner HTML of the shadow DOM with the template string containing the HTML and CSS for the book preview
    this.shadowRoot.innerHTML = `
      <style>
        /* CSS styles for the book preview */
      </style>
      <div class="preview" data-id="${id}">
        <img class="preview__image" src="${image}" alt="Book Cover"></img>
        <div class="preview__info">
          <div class="preview__title">${title}</div>
          <div class="preview__author">${author}</div>
        </div>
      </div>
    `;
  }
}

// Registers the "book-preview" custom element with the browser's custom elements registry
customElements.define("book-preview", BookPreview);

/* Here's a breakdown of the `constructor` and `connectedCallback` methods in the context of the provided code:

1. `constructor` method:
   - The `constructor` method is a special method in a class that is called when an instance of the class is created.
   - In the provided code, the `constructor` method is used to initialize the `BookPreview` instance by calling the `super()` 
     method to invoke the constructor of the parent class (HTMLElement in this case), and then attaching a shadow DOM to the instance 
     using `this.attachShadow({ mode: "open" })`.

2. `connectedCallback` method:
   - The `connectedCallback` method is one of the custom element lifecycle callbacks defined by the Custom Elements API.
   - It is called when the custom element is inserted into the DOM.
   - In the provided code, the `connectedCallback` method is overridden to call the `render` method when the custom element is 
     connected to the DOM. This triggers the rendering of the book preview content inside the shadow DOM.

In summary, the `constructor` method is used for initializing an instance of the custom element, and the `connectedCallback` 
method is used to handle actions that need to be performed when the custom element is connected to the DOM, such as rendering content.

In JavaScript, when you put this in front of things, such as this.someProperty or this.someMethod(), it refers to the current instance 
of the object or class in which the code is being executed. The usage of this allows you to access the properties and methods 
of the current object within its context.

In the provided code example:

-   this.attachShadow({ mode: "open" }) is used to call the attachShadow method on the current instance of the BookPreview 
    class, enabling the attachment of a shadow DOM to that specific instance.
-   this.render() is used within the connectedCallback method to call the render method of the current instance, 
    triggering the rendering of the book preview content inside the shadow DOM of that instance.
-   By using this, the code can access and manipulate the properties and methods of the current instance of the class, 
    allowing for instance-specific behavior and encapsulation of functionality.
*/
