import React, { useEffect } from "react";

const Effect = () => {
  useEffect(() => {
    console.log("component aagya");

    //cleanup code or cleanup function
    return () => {
      console.log("compoent jaa rha hai");
    };
  }, []);
  return <div>Effect</div>;
};

export default Effect;
