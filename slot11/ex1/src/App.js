import React, { useState } from "react";

function App() {
  const [name, setName] = useState("Nam");
  const [age, setAge] = useState("5");

  // const originalName = "Nam";
  // const originalAge = "5";

  const handleNameChange = (e) => {
    const newName = e.target.value;
    console.log("Old name:", name, " New name:", newName);
    if (newName === name) {
      alert("No Change Name");
    } else {
      setName(newName);
    }
  };

  const handleAgeChange = (e) => {
    const newAge = e.target.value;
    console.log("Old age:", age, " New age:", newAge);
    if (newAge === age) {
      alert("No Change Age");
    } else {
      setAge(newAge);
    }
  };

  return (
    <>
      <section>
        <input value={name} onChange={handleNameChange} />
        <p>My name is {name}</p>
      </section>
      <section>
        <input type="number" value={age} onChange={handleAgeChange} />
        <p>My age is {age}</p>
      </section>
    </>
  );
}

export default App;
