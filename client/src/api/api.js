// src/api/api.js
import axios from "axios";

// Create an axios instance with a base URL
const api = axios.create({
  baseURL: "http://localhost:4000/api", // Backend base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Helper function to handle errors
const handleError = (error) => {
  if (error.response) {
    // Server-side error
    console.error("Error response:", error.response);
    return {
      success: false,
      message: error.response.data.message || "An error occurred.",
    };
  } else if (error.request) {
    // No response received
    console.error("Error request:", error.request);
    return { success: false, message: "No response from the server." };
  } else {
    // Something else
    console.error("Error message:", error.message);
    return { success: false, message: error.message };
  }
};

// User authentication API calls

export const loginUser = async (credentials) => {
  try {
    const res = await api.post("/auth/signin", credentials);
    return { success: true, data: res.data };
  } catch (error) {
    return handleError(error);
  }
};

export const signupUser = async (userData) => {
  try {
    const res = await api.post("/auth/signup", userData);
    return { success: true, data: res.data };
  } catch (error) {
    return handleError(error);
  }
};

export const logoutUser = async () => {
  try {
    const res = await api.post("/auth/logout");
    return { success: true, data: res.data };
  } catch (error) {
    return handleError(error);
  }
};

// Blog API calls

export const fetchBlogsByLocation = async (location) => {
  try {
    const res = await api.get(`/blogs/${location}`);
    return { success: true, data: res.data };
  } catch (error) {
    return handleError(error);
  }
};

export const fetchBlogById = async (id) => {
  try {
    const res = await api.get(`/blogs/${id}`);
    return { success: true, data: res.data };
  } catch (error) {
    return handleError(error);
  }
};

export const createBlog = async (blogData, token) => {
  try {
    const res = await api.post("/blogs", blogData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { success: true, data: res.data };
  } catch (error) {
    return handleError(error);
  }
};

export const updateBlog = async (id, blogData, token) => {
  try {
    const res = await api.put(`/blogs/${id}`, blogData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { success: true, data: res.data };
  } catch (error) {
    return handleError(error);
  }
};

export const deleteBlog = async (id, token) => {
  try {
    const res = await api.delete(`/blogs/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { success: true, data: res.data };
  } catch (error) {
    return handleError(error);
  }
};

// Payment API calls

export const createPayment = async (amount, token) => {
  try {
    const res = await api.post(
      "/paypal/create-payment",
      { amount },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return { success: true, data: res.data };
  } catch (error) {
    return handleError(error);
  }
};

export const executePayment = async (paymentId, payerId, token) => {
  try {
    const res = await api.post(
      "/paypal/execute-payment",
      { paymentId, payerId },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return { success: true, data: res.data };
  } catch (error) {
    return handleError(error);
  }
};
