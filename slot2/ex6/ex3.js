// Data
const companies = [
  { name: "Company One", category: "Finance", start: 1981, end: 2004 },
  { name: "Company Two", category: "Retail", start: 1992, end: 2008 },
  { name: "Company Three", category: "Auto", start: 1999, end: 2007 },
  { name: "Company Four", category: "Retail", start: 1989, end: 2010 },
  { name: "Company Five", category: "Technology", start: 2009, end: 2014 },
  { name: "Company Six", category: "Finance", start: 1987, end: 2010 },
  { name: "Company Seven", category: "Auto", start: 1986, end: 1996 },
  { name: "Company Eight", category: "Technology", start: 2011, end: 2016 },
  { name: "Company Nine", category: "Retail", start: 1981, end: 1989 }
];

const ages = [33, 12, 20, 16, 5, 54, 21, 44, 61, 13, 15, 45, 25, 64, 32];

const person = {
  name: "Costas",
  address: {
    street: "Lalaland 12"
  }
};

// 1. Sort companies 
const companiesSortedByEnd = [...companies].sort((a, b) => a.end - b.end);
console.log("Companies sorted by end date ASC:");
console.log(companiesSortedByEnd);

// 2. Sort ages 
const agesSortedDesc = [...ages].sort((a, b) => b - a);
console.log("Ages sorted DESC:", agesSortedDesc);

// 3. Sum of all ages 
const sumAges = ages.reduce((acc, age) => acc + age, 0);
console.log("Sum of all ages:", sumAges);

// 4. New object from companies[0]
const { name, category } = companies[0];
const newObj = {
  name,
  category,
  print() {
    console.log(`Name: ${this.name}`);
  }
};
console.log("New object:", newObj);
newObj.print();

// 5. Sums all numbers passed as arguments
function sumAll(...nums) {
  return nums.reduce((acc, n) => acc + n, 0);
}
console.log("Sum all (5, 10, 15, 33):", sumAll(5, 10, 15, 33));

// 6.Takes unknown args, returns array 
function collectAll(...args) {
  let result = [];
  args.forEach(arg => {
    if (Array.isArray(arg)) {
      result.push(...arg);
    } else {
      result.push(arg);
    }
  });
  return result;
}
console.log("Collect all:", collectAll(1, "a", [2, 3], true, [4, 5]));

// 7. Destructuring street from person
const { address: { street } } = person;
console.log("Street:", street);


