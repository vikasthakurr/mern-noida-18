import React from "react";
import Ref from "./Ref";
import UseMemo from "./UseMemo";
import Custom from "./Custom";

const App = () => {
  const [data] = Custom("https://jsonplaceholder.typicode.com/todos/1");
  console.log(data);

  return (
    <div>
      {/* <Ref /> */}
      {/* <UseMemo /> */}
      <Custom />
    </div>
  );
};

export default App;
