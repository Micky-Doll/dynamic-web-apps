const provinces = [
  "Western Cape",
  "Gauteng",
  "Northern Cape",
  "Eastern Cape",
  "KwaZulu-Natal",
  "Free State",
];
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
 * Convert each province to uppercase using map and toUpperCase()
 * Logs the result to the console
 */
const upperCase = provinces.map((province) => province.toUpperCase());
console.log(upperCase);

/**
 * Creates a new array with the lengths of the names.
 */
const newArr = names.map((name) => {
  return name.length;
});
console.log(newArr);

/**
 * Sort the provinces array in alphabetical order and logs the sorted array to the console.
 */
console.log(provinces.toSorted());

/**
 * Filters the provinces array to remove provinces that have the word "Cape" and returns the number of remaining provinces.
 */
const provinceFilter = provinces.filter(
  (province) => !province.includes("Cape")
); //checks if each province doesn't include the word "Cape".
const remainingProvinces = provinceFilter.length;
console.log(remainingProvinces);

/**
 * Creates a boolean array indicating whether each name contains an 'S' character in it.
 */
const hasSCharacter = names.map((name) =>
  name.split("").some((char) => char.toUpperCase() === "S")
);
console.log(hasSCharacter);

/**
 * Converts the names array and provinces array into an object indicating the province of each individual.
 */
const result = names.reduce((acc, name, index) => {
  acc[name] = provinces[index];
  return acc;
}, {});

console.log(result);
