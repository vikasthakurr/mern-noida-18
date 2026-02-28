import React from "react";
import AddTodo from "./component/AddTodo";
import ViewTodo from "./component/ViewTodo";
import Test from "./component/Test";

const App = () => {
  return (
    <div>
      <AddTodo />
      <br></br>
      <ViewTodo />
      <br></br>
      <Test />
    </div>
  );
};

export default App;
