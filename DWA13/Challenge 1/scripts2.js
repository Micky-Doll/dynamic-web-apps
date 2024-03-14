/**
 * Array containing the names of South African provinces.
 * @type {Array.<string>}
 */
const provinces = [
  "Western Cape",
  "Gauteng",
  "Northern Cape",
  "Eastern Cape",
  "KwaZulu-Natal",
  "Free State",
];

/**
 * Array containing individual names.
 * @type {Array.<string>}
 */
const names = [
  "Ashwin",
  "Sibongile",
  "Jan-Hendrik",
  "Sifso",
  "Shailen",
  "Frikkie",
];

/**
 * Logs each name in the names array to the console.
 */
names.forEach((name) => console.log(name));

/**
 * Logs each name with the corresponding province to the console.
 */
names.forEach((name, index) => {
  const province = provinces[index];
  console.log(`${name} (${province})`);
});

/**
 * Converts each province to uppercase using map and toUpperCase().
 * Logs the result to the console.
 */
const upperCaseProvinces = provinces.map((province) => province.toUpperCase());
console.log(upperCaseProvinces);

/**
 * Creates a new array with the lengths of the names.
 * @type {Array.<number>}
 */
const nameLengths = names.map((name) => {
  return name.length;
});
console.log(nameLengths);

/**
 * Sorts the provinces array in alphabetical order and logs the sorted array to the console.
 */
console.log(provinces.toSorted());

/**
 * Filters the provinces array to remove provinces that include the word "Cape" and returns the number of remaining provinces.
 * @type {number}
 */
const provinceFilter = provinces.filter(
  (province) => !province.includes("Cape")
);
const remainingProvinces = provinceFilter.length;
console.log(remainingProvinces);

/**
 * Creates a boolean array indicating whether each name contains an 'S' character in it.
 * @type {Array.<boolean>}
 */
const hasSCharacter = names.map((name) =>
  name.split("").some((char) => char.toUpperCase() === "S")
);
console.log(hasSCharacter);

/**
 * Converts the names array and provinces array into an object indicating the province of each individual.
 * @type {Object}
 */
const result = names.reduce((acc, name, index) => {
  acc[name] = provinces[index];
  return acc;
}, {});

console.log(result);
