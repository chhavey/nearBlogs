import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ isLoggedIn, onOpenModal, handleSearch }) => {
  const location = useLocation();

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link to="/">nearBlogs</Link>
        </div>

        {location.pathname === "/" && (
          <input
            type="text"
            placeholder="Enter a location"
            className="px-3 py-1 text-black rounded"
            onChange={(e) => handleSearch(e.target.value)}
          />
        )}

        <div>
          {!isLoggedIn ? (
            <>
              <button onClick={onOpenModal} className="mr-4">Login</button>
              <button onClick={onOpenModal}>Sign Up</button>
            </>
          ) : (
            <Link to="/myBlogs">My Blogs</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;