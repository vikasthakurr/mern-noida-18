import React from "react";
// import { memo } from "react";

const Child = React.memo(() => {
  console.log("child loaded again");
  return <div>Child</div>;
});

export default Child;
