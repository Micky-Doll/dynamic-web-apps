/**
 * Represents a list of products with their names and prices.
 * @typedef {Object} Product
 * @property {string} product - The name of the product.
 * @property {string} price - The price of the product.
 */

/**
 * An array containing products with their names and prices.
 * @type {Array.<Product>}
 */
const products = [
  { product: "banana", price: "2" },
  { product: "mango", price: 6 },
  { product: "potato", price: " " },
  { product: "avocado", price: "8" },
  { product: "coffee", price: 10 },
  { product: "tea", price: "" },
];

/**
 * Logs each product name to the console.
 */
const logProductNames = products.forEach((product) =>
  console.log(product.product)
);

/**
 * Filters products with names whose length is less than or equal to 5.
 * @type {Array.<Product>}
 */
const overFive = products.filter((product) => product.product.length <= 5);

/**
 * Filters out products with invalid prices and calculates the total price of the remaining products.
 * @type {number}
 */
const totalPrice = products
  .filter((product) => product.price !== "" && !isNaN(product.price))
  .map((product) => ({ ...product, price: Number(product.price) })) // Converts price to a number.
  .reduce((total, product) => total + product.price, 0);

/**
 * Concatenates all product names into a single string.
 * @type {string}
 */
const concatenatedNames = products.reduce(
  (names, product) => names + (names ? ", " : "") + product.product,
  ""
);

/**
 * Determines the highest and lowest-priced items and logs them to the console.
 */
const { highestProduct, lowestProduct } = products.reduce(
  (acc, product) => {
    if (product.price > acc.highestPrice) {
      acc.highestPrice = product.price;
      acc.highestProduct = product.product;
    }
    if (product.price < acc.lowestPrice || acc.lowestPrice === undefined) {
      acc.lowestPrice = product.price;
      acc.lowestProduct = product.product;
    }
    return acc;
  },
  { highestPrice: -Infinity, lowestPrice: undefined }
);

/**
 * Modifies the object structure and stores the modified objects in an array.
 * @type {Array.<Object>}
 */
const modifiedObjects = products.reduce((acc, item) => {
  const modifiedItem = Object.entries(item).reduce((obj, [key, value]) => {
    if (key === "product") {
      obj.name = value;
    } else if (key === "price") {
      obj.cost = value;
    } else {
      obj[key] = value;
    }
    return obj;
  }, {});
  acc.push(modifiedItem);
  return acc;
}, []);

// Logs the results to the console
console.log(
  "Products with names length less than or equal to 5:",
  overFive,
  "Total price of remaining products:",
  totalPrice,
  "Concatenated product names:",
  concatenatedNames,
  "Highest and lowest-priced items:",
  { highestProduct, lowestProduct },
  "Modified object structure:",
  modifiedObjects
);
