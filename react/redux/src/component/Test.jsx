import React from "react";
// import { use } from "react";
import { useSelector } from "react-redux";

const Test = () => {
  const task = useSelector((state) => state.todos);
  console.log(task);
  return <div>Test</div>;
};

export default Test;
