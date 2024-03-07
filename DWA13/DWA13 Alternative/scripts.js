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

names.forEach((name) => console.log(name));

names.forEach((name, index) => {
  const province = provinces[index];
  console.log(`${name} (${province})`);
});

const upperCase = provinces.map((province) => province.toUpperCase());
console.log(upperCase);

const newArr = names.map((name) => {
  return name.length;
});
console.log(newArr);

console.log(provinces.toSorted());

const provinceFilter = provinces.filter(
  (province) => !province.includes("Cape")
); //checks if each province doesn't include the word "Cape".
const remainingProvinces = provinceFilter.length;
console.log(remainingProvinces);

const hasSCharacter = names.map((name) =>
  name.split("").some((char) => char.toUpperCase() === "S")
);
console.log(hasSCharacter);

const result = names.reduce((acc, name, index) => {
  acc[name] = provinces[index];
  return acc;
}, {});

console.log(result);
