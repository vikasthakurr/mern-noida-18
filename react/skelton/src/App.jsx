// import Card from "./Card";
// // import Skelton from "./Skelton";
// const Skelton = lazy(() => import("./Skelton"));
// import { useEffect, useState } from "react";
// import React, { lazy } from "react";

// const App = () => {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 2000);

//     return () => clearTimeout(timer);
//   }, []);

//   return loading ? <Skelton /> : <Card />;
// };

// export default App;

import React from "react";
import Navbar from "./Navbar";
import Home from "./Home";
import Contact from "./Contact";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
};

export default App;
