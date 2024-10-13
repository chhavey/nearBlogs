import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:4000/api", //LOCALHOST LINK
  baseURL: "https://nearblogs.onrender.com/api", //LIVE BACKEND LINK
  headers: {
    "Content-Type": "application/json",
  },
});

const handleError = (error) => {
  if (error.response) {
    console.error("Error response:", error.response);
    return {
      success: false,
      message: error.response.data.message || "An error occurred.",
    };
  } else if (error.request) {
    console.error("Error request:", error.request);
    return { success: false, message: "No response from the server." };
  } else {
    console.error("Error message:", error.message);
    return { success: false, message: error.message };
  }
};

// User authentication API calls

export const loginUser = async (credentials) => {
  try {
    const res = await api.post(`/auth/signin`, credentials);

    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userName", res.data.fullName); // Store the user name
    }

    return { success: true, data: res.data };
  } catch (error) {
    return handleError(error);
  }
};

export const signupUser = async (userData) => {
  try {
    const res = await api.post("/auth/signup", userData);

    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userName", res.data.fullName);
    }
    return { success: true, data: res.data };
  } catch (error) {
    return handleError(error);
  }
};

export const logoutUser = async () => {
  try {
    localStorage.removeItem("token");
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

// Fetch user blogs
export const fetchBlogsByUser = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await api.get("/blogs/user", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { success: true, data: res.data };
  } catch (error) {
    return handleError(error);
  }
};

export const createBlog = async (blogData) => {
  try {
    const token = localStorage.getItem("token");
    const res = await api.post("/blogs", blogData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { success: true, data: res.data };
  } catch (error) {
    return handleError(error);
  }
};

export const updateBlog = async (id, blogData) => {
  try {
    const token = localStorage.getItem("token");
    const res = await api.put(`/blogs/${id}`, blogData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { success: true, data: res.data };
  } catch (error) {
    return handleError(error);
  }
};

export const deleteBlog = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const res = await api.delete(`/blogs/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { success: true, data: res.data };
  } catch (error) {
    return handleError(error);
  }
};

// Payment API calls

export const createPayment = async (amount) => {
  try {
    const token = localStorage.getItem("token");
    const res = await api.post(
      "/paypal/pay",
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

export const executePayment = async (paymentId, payerId) => {
  try {
    const token = localStorage.getItem("token");
    const res = await api.get(
      `/paypal/success?paymentId=${paymentId}&PayerID=${payerId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return { success: true, data: res.data };
  } catch (error) {
    return handleError(error);
  }
};
