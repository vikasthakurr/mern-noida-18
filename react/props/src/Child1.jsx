import React from "react";
import { useContext } from "react";
import { postman } from "./Drilling";

const Child1 = () => {
  const data = useContext(postman);
  console.log(data);
  //   console.log(props);
  return <div>{data.fullname}</div>;
};

export default Child1;
