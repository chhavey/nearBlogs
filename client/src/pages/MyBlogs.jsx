import React, { useState, useEffect } from 'react';
import { fetchBlogsByUser, deleteBlog } from '../api/api';
import Card from '../components/Card';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  const loadUserBlogs = async () => {
    try {
      const response = await fetchBlogsByUser(); 
      if (response.success) {
        setBlogs(response.data);
      } else {
        toast.error('Failed to fetch blogs');
      }
    } catch (error) {
      toast.error('Error fetching blogs');
    }
  };

  // Handle deleting a blog
  const handleDelete = async (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        const response = await deleteBlog(blogId);
        if (response.success) {
          toast.success('Blog deleted successfully');
          loadUserBlogs(); 
        } else {
          toast.error('Failed to delete blog');
        }
      } catch (error) {
        toast.error('Error deleting blog');
      }
    }
  };

  // Redirect to blog creation page
  const handleCreateBlog = () => {
    navigate('/create');
  };

  // Load blogs when the component mounts
  useEffect(() => {
    loadUserBlogs();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">My Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogs.map((blog) => (
          <div key={blog._id} className="relative">
            <Card blog={blog} />
            <div className="absolute bottom-2 left-2 flex space-x-2">
              <button
                onClick={() => navigate(`/edit/${blog._id}`)}
                className="text-blue-500 hover:text-blue-700"
              >
                <i className="fas fa-edit"></i> 
              </button>
              <button
                onClick={() => handleDelete(blog._id)}
                className="text-red-500 hover:text-red-700"
              >
                <i className="fas fa-trash"></i> 
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleCreateBlog}
        className="fixed bottom-5 right-5 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
      >
        + Create Blog
      </button>
    </div>
  );
};

export default MyBlogs;