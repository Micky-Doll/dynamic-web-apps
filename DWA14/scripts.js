import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";

const MAX_NUMBER = 15;
const MIN_NUMBER = -5;
const STEP_AMOUNT = 1;

class LitComponent extends LitElement {
  static properties = {
    count: { type: Number },
  };

  constructor() {
    super();
    this.count = 0;
  }

  subtractHandler() {
    console.log("Subtract clicked");
    this.count -= STEP_AMOUNT;
    this.requestUpdate();

    if (this.count === MIN_NUMBER) {
      console.log("Limit reached");
      setTimeout(() => {
        alert("You've reached the minimum counter limit!");
      }, 150);
    }
  }

  addHandler() {
    console.log("Add clicked");
    this.count += STEP_AMOUNT;
    this.requestUpdate();

    if (this.count === MAX_NUMBER) {
      console.log("Limit reached");
      setTimeout(() => {
        alert("You've reached the maximum counter limit!");
      }, 150);
    }
  }

  resetHandler() {
    console.log("Reset clicked");
    this.count = 0;
    this.requestUpdate();
    setTimeout(() => {
      alert("Reset clicked!");
    }, 150);
  }

  render() {
    return html`
      <main class="counter">
        <input
          class="counter_value"
          type="number"
          .value=${this.count}
          disabled
        />

        <div class="counter_actions">
          <button
            type="subtract"
            class="counter_button
                      counter__button_first"
            @click=${this.subtractHandler}
            ?disabled=${this.count <= MIN_NUMBER}
          >
            -
          </button>

          <button
            type="add"
            class="counter_button"
            @click=${this.addHandler}
            ?disabled=${this.count >= MAX_NUMBER}
          >
            +
          </button>
        </div>

        <div class="clearall_button">
          <button
            type="reset"
            class="clearall_button"
            @click=${this.resetHandler}
          >
            Reset
          </button>
        </div>
      </main>
    `;
  }

  static styles = css`
    :root {
      --color-green: #31c48d;
      --color-white: #ffffff;
      --color-dark-grey: #33333d;
      --color-medium-grey: #424250;
      --color-light-grey: #d2d6dc;
    }

    * {
      box-sizing: border-box;
    }

    html {
      height: 100vh;
    }

    body {
      margin: 0;
      background: var(--color-medium-grey);
      color: var(--color-white);
      font-family: Roboto, Arial, Helvetica, sans-serif;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
    }

    /* header */
    .header {
      text-align: center;
    }

    .header__title {
      font-size: 3rem;
      font-weight: 900;
      color: var(--color-light-grey);
    }

    /* controls */

    .controls {
      background: yellow;
    }
    /* counter */

    .counter {
      background: var(--color-dark-grey);
    }

    .counter__value {
      width: 100%;
      height: 15rem;
      text-align: center;
      font-size: 6rem;
      font-weight: 900;
      background: none;
      color: var(--color-white);
      border-width: 0;
      border-bottom: 1px solid var(--color-light-grey);
    }

    .counter__actions {
      display: flex;
    }

    .counter__button {
      background: none;
      width: 50%;
      border-width: 0;
      color: var(--color-white);
      font-size: 3rem;
      height: 10rem;
      border-bottom: 1px solid var(--color-light-grey);
      transition: transform 0.1s;
      transform: translateY(0);
    }

    .counter__button:disabled {
      opacity: 0.2;
    }

    .counter__button:active {
      background: var(--color-medium-grey);
      transform: translateY(2%);
    }

    .counter__button_first {
      border-right: 1px solid var(--color-light-grey);
    }

    /* footer */

    .footer {
      background: var(--color-dark-grey);
      color: var(--color-light-grey);
      padding: 2rem;
      font-size: 0.8rem;
      text-align: center;
    }

    .footer__link {
      color: var(--color-white);
    }
  `;
}

customElements.define("button-component", LitComponent);
