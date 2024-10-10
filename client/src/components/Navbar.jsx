import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ isLoggedIn, handleSearch }) => {
  const location = useLocation();

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left side */}
        <div className="text-xl font-bold">
          <Link to="/">nearBlogs</Link>
        </div>

        {/* Center (Search field on Home page only) */}
        {location.pathname === "/" && (
          <input
            type="text"
            placeholder="Enter a location"
            className="px-3 py-1 rounded"
            onChange={(e) => handleSearch(e.target.value)} // Call handleSearch prop
          />
        )}

        {/* Right side */}
        <div>
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="mr-4">Login</Link>
              <Link to="/signup">Sign Up</Link>
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