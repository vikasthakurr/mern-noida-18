import React from "react";
import Child from "./Child";
import { createContext } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const postman = createContext();

const Drilling = () => {
  let data = {
    fullname: "vikas",
  };
  return (
    <postman.Provider value={data}>
      {/* <Child /> */}
    </postman.Provider>
  );
};

export default Drilling;
