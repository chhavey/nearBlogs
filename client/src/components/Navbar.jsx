import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faPen } from "@fortawesome/free-solid-svg-icons";

const Navbar = ({ onOpenModal, handleSearch }) => {
  const location = useLocation();
  const isLoggedIn = localStorage.getItem("token") !== null;

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">
          <FontAwesomeIcon icon={faLocationDot} /> &nbsp;
          <Link to="/">nearBlogs</Link>
        </div>

        {location.pathname === "/" && (
          <input
            type="text"
            placeholder="Explore another location.."
            className="px-3 py-1 text-black rounded w-[20rem]"
            onChange={(e) => handleSearch(e.target.value)}
          />
        )}

        <div>
          {!isLoggedIn ? (
            <>
              {/* <button onClick={onOpenModal} className="mr-4">Login</button> */}
              <button onClick={onOpenModal}>Log In / Sign Up</button>
            </>
          ) : (
            <Link to="/myBlogs">
              My Blogs&nbsp; <FontAwesomeIcon icon={faPen} />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
