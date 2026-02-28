import React, { useEffect, useState } from "react";

const Custom = (url) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    try {
      fetch(url)
        .then((response) => response.json())
        .then((data) => setData(data));
    } catch (err) {
      console.log(err);
    }
  });
  return [data];
};

export default Custom;
