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
import View from "./pages/View";
import Preview from "./pages/Preview";

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
  const isLogged = localStorage.getItem("token") !== null;

  return (
    <Router>
      <Navbar
        onOpenModal={() => setIsModalOpen(true)}
        handleSearch={handleSearch}
      />
      <Routes>
        <Route path="/view" element={<View />} />
        <Route path="/" element={<Home searchWord={searchWord} />} />
        {isLoggedIn ? (
          <>
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="/myBlogs" element={<MyBlogs />} />
            <Route path="/create" element={<Create />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/preview" element={<Preview />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/" replace />} />
        )}
      </Routes>
      {isLogged && <Logout onLogout={handleLogout} />}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAuthenticate={handleAuthenticate}
      />
    </Router>
  );
};

export default App;
