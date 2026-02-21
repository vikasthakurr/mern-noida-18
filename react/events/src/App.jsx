import React from "react";
import Card1 from "./Card1";

const App = () => {
  // const btn = document.getElementById("btn");
  // console.log(btn);
  // btn.addEventListener("click", () => {
  //   console.log("btn clicked");
  //   // console.log(btn);
  // });
  // const handleClick = () => {
  //   console.log("btn clicked");
  // };
  return (
    <div>
      {/* <button onClick={handleClick}>Click</button> */}
      <Card1 fullname="vikas" age="34" salry="12345" />
      {/* <Card1 fullname="akhilesh" />
      <Card1 fullname="akash" /> */}
    </div>
  );
};

export default App;
