import React, { useState, useEffect, useRef } from "react";
import { loginUser, signupUser } from "../api/api";
import { toast } from "react-hot-toast";

const Modal = ({ isOpen, onClose, onAuthenticate }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const modalRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = isLogin
      ? { email, password }
      : { fullName: name, username, email, password };

    try {
      const response = isLogin
        ? await loginUser(userData)
        : await signupUser(userData);

      if (response.success) {
        onAuthenticate(response.data);
        onClose();
      } else {
        toast.error(response.message || "An error occurred during login.");
      }
    } catch (error) {
      toast.error(
        "Error during authentication: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div ref={modalRef} className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-lg font-bold mb-4">
          {isLogin ? "Login" : "Sign Up"}
        </h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-4">
              <label htmlFor="name" className="block mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="border rounded w-full p-2"
              />
            </div>
          )}
          {!isLogin && (
            <div className="mb-4">
              <label htmlFor="username" className="block mb-1">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="border rounded w-full p-2"
              />
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border rounded w-full p-2"
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white rounded px-4 py-2"
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-500 mt-2"
            >
              {isLogin ? "Create an account" : "Already have an account? Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
