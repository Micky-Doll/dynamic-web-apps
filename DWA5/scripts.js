const form = document.querySelector("[data-form]");
const result = document.querySelector("[data-result]");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const entries = new FormData(event.target);
  const { dividend, divider } = Object.fromEntries(entries);

  if (dividend.trim() === "" || divider.trim() === "") {
    result.innerText =
      "Division not performed. Both values are required in inputs. Try again";
  } else if (divider < 0) {
    result.innerText =
      "Division not performed. Invalid number provided. Try again";
    console.error(
      "Invalid number provided. Divider cannot be a negative value."
    );
  } else {
    const entryAnswer = dividend / divider;
    result.innerText = Number.isInteger(entryAnswer)
      ? entryAnswer
      : Math.floor(entryAnswer);
  }

  if (isNaN(dividend) || isNaN(divider)) {
    result.innerText = "Something critical went wrong. Please reload the page";
    console.error("Critical error. One or more inputs is NaN. Inputs logged.");
    console.error("Dividend:", dividend, "Divider:", divider);
    return;
  }
});

/**
 * I did throw new Error at first, but the more I read about it the more it
 * seemed specific to functions and this way was more simplistic though likely longer to do.
 */
