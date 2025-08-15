import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import UserForm from "./UserForm";

const App = () => {
  const handleSubmit = (data) => {
    console.log("Dữ liệu hợp lệ:", data);
    alert("Form hợp lệ! Xem console để xem dữ liệu.");
  };

  return (
    <div className="App">
      <h1>I love Fpt - Slot9 PropTypes</h1>
      <UserForm onSubmit={handleSubmit} />
    </div>
  );
};

export default App;
