var people = [
  { name: 'Jack', age: 50 },
  { name: 'Michael', age: 9 },
  { name: 'John', age: 40 },
  { name: 'Ann', age: 19 },
  { name: 'Elisabeth', age: 16 }
];

const firstTeenager = people.find(person => person.age >= 10 && person.age <= 20);
console.log("First teenager:", firstTeenager);

const allTeenagers = people.filter(person => person.age >= 10 && person.age <= 20);
console.log("All teenagers:", allTeenagers);

const isEveryoneTeen = people.every(person => person.age >= 10 && person.age <= 20);
console.log("Is everyone a teenager?", isEveryoneTeen);

const isAnyoneTeen = people.some(person => person.age >= 10 && person.age <= 20);
console.log("Is anyone a teenager?", isAnyoneTeen);
