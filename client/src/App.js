// // src/App.js
// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Home from "./pages/Home";
// import Navbar from "./components/Navbar"; // Assuming you have a Navbar component

// const App = () => {
//   return (
//     <Router>
//       <Navbar /> {/* Include Navbar on all pages */}
//       <Routes>
//         <Route path="/" element={<Home />} />
//         {/* Add other routes for Create, My Blogs, Payment, etc. */}
//       </Routes>
//     </Router>
//   );
// };

// export default App;
// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Adjust as needed
  const [searchWord, setSearchWord] = useState(""); // State for the search term

  // Handle search term input
  const handleSearch = (searchTerm) => {
    setSearchWord(searchTerm); // Update the searchWord state
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} handleSearch={handleSearch} />
      <Routes>
        <Route path="/" element={<Home searchWord={searchWord} />} />
        {/* Add other routes for Create, My Blogs, Payment, etc. */}
      </Routes>
    </Router>
  );
};

export default App;
