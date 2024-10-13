import React, { useState, useEffect } from "react";
import { fetchBlogsByUser, deleteBlog } from "../api/api";
import Card from "../components/Card";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { BounceLoader } from "react-spinners";

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const loadUserBlogs = async () => {
    setLoading(true);
    try {
      const response = await fetchBlogsByUser();
      if (response.success) {
        setBlogs(response.data);
      } else {
        toast.error("Failed to fetch blogs");
      }
    } catch (error) {
      toast.error("Error fetching blogs");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (blogId) => {
    try {
      const response = await deleteBlog(blogId);
      if (response.success) {
        toast.success("Blog deleted successfully");
        loadUserBlogs();
      } else {
        toast.error("Failed to delete blog");
      }
    } catch (error) {
      toast.error("Error deleting blog");
    }
  };

  const handleCreateBlog = () => {
    navigate("/create");
  };

  useEffect(() => {
    loadUserBlogs();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">My Blogs</h1>
      {loading ? (
        <div className="flex justify-center items-center h-80">
          <BounceLoader color="#007bff" loading={loading} size={60} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {blogs.map((blog) => (
            <Card
              key={blog._id}
              blog={blog}
              showActions={true}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      )}
      <button
        onClick={handleCreateBlog}
        className="fixed bottom-5 right-5 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
      >
        <FontAwesomeIcon icon={faPlus} /> Create Blog
      </button>
    </div>
  );
};

export default MyBlogs;
