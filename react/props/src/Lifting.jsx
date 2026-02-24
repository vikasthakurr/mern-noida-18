import React from "react";
import { useState } from "react";
import Child from "./Child";

const Lifting = () => {
  const [name, setName] = useState("");
  return (
    <div>
      <Child setName={setName} name={name} />
      <h1>the value coming from child:{name}</h1>
    </div>
  );
};

export default Lifting;
