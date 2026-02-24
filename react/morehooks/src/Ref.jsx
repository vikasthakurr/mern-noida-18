import React, { useLayoutEffect, useRef, useState } from "react";

const Ref = () => {
  const [count, setCount] = useState(0);
  //   const ref = useRef(0);
  //   console.log(ref);
  const ref = useRef();
  //   console.log(ref);

  function handleClick() {
    setCount(count + 1);
    // ref.current = ref.current + 1;
    // console.log(ref.current);
  }
  useLayoutEffect(() => {
    // console.log(ref.current);
    // ref.current.style.backgroundColor = "Red";
    // ref.current.style.backgroundColor = "yellow";
  });
  const handleChange = (e) => {
    console.log(e.target.value);
    ref.current(e.target.value);
  };
  return (
    <div>
      <h1>Count:{count}</h1>
      <button ref={ref} onClick={handleClick}>
        Increse
      </button>
      <input
        type="text"
        placeholder="enter name"
        ref={ref}
        onChange={handleChange}
      ></input>
    </div>
  );
};

export default Ref;
