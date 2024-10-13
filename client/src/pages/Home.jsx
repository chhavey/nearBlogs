import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { fetchBlogsByLocation } from "../api/api";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { BounceLoader } from "react-spinners";

const Home = ({ searchWord }) => {
  const [location, setLocation] = useState("");
  const [country, setCountry] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("token") !== null;

  useEffect(() => {
    const fetchLocationAndBlogs = async () => {
      try {
        const res = await fetch(
          "https://api.ipdata.co?api-key=47cc665d913e71a21bac9c28de85599706c07774e9f61dc2069b3b24"
        );
        const data = await res.json();
        const userLocation = data.city;
        setLocation(userLocation);
        setCountry(data.country_name);

        const blogsData = await fetchBlogsByLocation(
          searchWord || userLocation
        );

        if (blogsData.success) {
          setBlogs(blogsData.data);
        } else {
          setBlogs([]);
        }
      } catch (err) {
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLocationAndBlogs();
  }, [searchWord]);

  const handleCreateBlog = () => {
    navigate("/create");
  };

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-2xl font-bold mb-6">
        {searchWord
          ? `All blogs near you in ${searchWord}`
          : `All blogs near you in ${location}, ${country}`}
      </h1>
      {loading ? (
        <div className="flex justify-center items-center h-80">
          <BounceLoader color="#007bff" loading={loading} size={60} />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <Card key={blog._id} blog={blog} showActions={false} />
            ))
          ) : (
            <p>No blogs available in your region.</p>
          )}
        </div>
      )}
      {isLoggedIn && (
        <button
          onClick={handleCreateBlog}
          className="fixed bottom-5 right-5 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
        >
          <FontAwesomeIcon icon={faPlus} /> Create Blog
        </button>
      )}
    </div>
  );
};

export default Home;
