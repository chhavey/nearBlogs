import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Logout from "./components/Logout";
import Modal from "./components/Modal";
import { Navigate } from "react-router-dom";
import MyBlogs from "./pages/MyBlogs";
import Create from "./pages/Create";
import Payment from "./pages/Payment";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchWord, setSearchWord] = useState("");

  const handleAuthenticate = (user) => {
    setIsLoggedIn(true);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("user");
  };

  const handleSearch = (searchTerm) => {
    setSearchWord(searchTerm);
  };

  return (
    <Router>
      <Navbar
        isLoggedIn={isLoggedIn}
        onOpenModal={() => setIsModalOpen(true)}
        handleSearch={handleSearch}
      />
      <Routes>
        <Route path="/" element={<Home searchWord={searchWord} />} />
        {isLoggedIn ? (
          <>
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="/myBlogs" element={<MyBlogs />} />
            <Route path="/create" element={<Create />} />
            <Route path="/payment" element={<Payment />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/" replace />} />
        )}
      </Routes>
      {isLoggedIn && <Logout onLogout={handleLogout} />}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAuthenticate={handleAuthenticate}
      />
    </Router>
  );
};

export default App;
