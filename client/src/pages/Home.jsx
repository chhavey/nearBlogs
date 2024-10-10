// import React, { useEffect, useState } from "react";
// import Card from "../components/Card";
// import { fetchBlogsByLocation } from "../api/api"; // Ensure this is correctly set up

// const Home = () => {
//   const [location, setLocation] = useState("");
//   const [blogs, setBlogs] = useState([]);

//   // Fetch user location and blogs based on location
//   useEffect(() => {
//     const fetchLocationAndBlogs = async () => {
//       try {
//         // Fetch user location
//         const res = await fetch("https://ipapi.co/json/");
//         const data = await res.json();
//         const userLocation = data.city; 
//         // const userLocation = 'Europe';         
//         setLocation(userLocation);

//         console.log("Fetching blogs for location:", userLocation); // Debug log
//         const blogsData = await fetchBlogsByLocation(userLocation);
        
//         if (blogsData.success) {
//           console.log("Blogs fetched from API:", blogsData.data); // Debug log
//           setBlogs(blogsData.data);
//         } else {
//           console.error("Error fetching blogs", blogsData.message);
//         }
//       } catch (err) {
//         console.error("Error fetching location or blogs:", err);
//         setBlogs([]); // Ensure blogs is an array
//       }
//     };

//     fetchLocationAndBlogs();
//   }, []);

//   return (
//     <div className="container mx-auto my-8">
//       <h1 className="text-2xl font-bold mb-6">
//         All blogs near you in {location}
//       </h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
//         {blogs.length > 0 ? (
//           blogs.map((blog) => <Card key={blog._id} blog={blog} />) // Use the appropriate unique key
//         ) : (
//           <p>No blogs available in your region.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;
// src/pages/Home.js
import React, { useEffect, useState } from "react";
import Card from "../components/Card"; 
import { fetchBlogsByLocation } from "../api/api"; // Ensure this is correctly set up

const Home = ({ searchWord }) => {
  const [location, setLocation] = useState(""); // For displaying the location
  const [blogs, setBlogs] = useState([]); // To store the blogs

  // Fetch user location and blogs based on location
  useEffect(() => {
    const fetchLocationAndBlogs = async () => {
      try {
        // Fetch user location
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        const userLocation = data.city; 
        setLocation(userLocation);

        console.log("Fetching blogs for location:", userLocation); // Debug log
        const blogsData = await fetchBlogsByLocation(userLocation);
        
        if (blogsData.success) {
          console.log("Blogs fetched from API:", blogsData.data); // Debug log
          setBlogs(blogsData.data);
        } else {
          console.error("Error fetching blogs", blogsData.message);
          setBlogs([]); // Reset blogs to empty if error occurs
        }
      } catch (err) {
        console.error("Error fetching location or blogs:", err);
        setBlogs([]); // Ensure blogs is an empty array on error
      }
    };

    fetchLocationAndBlogs();
  }, []); // Only run once on mount

  // Fetch blogs based on search word
  useEffect(() => {
    const fetchBlogsBySearch = async () => {
      if (searchWord) {
        try {
          const blogsData = await fetchBlogsByLocation(searchWord); // Use the API for the search
          if (blogsData.success) {
            console.log("Blogs fetched for search:", blogsData.data); // Debug log
            setBlogs(blogsData.data);
          } else {
            console.error("Error fetching blogs", blogsData.message);
            setBlogs([]); // Reset blogs if there's an error
          }
        } catch (err) {
          console.error("Error fetching blogs by search:", err);
          setBlogs([]); // Ensure blogs is an empty array on error
        }
      }
    };

    fetchBlogsBySearch();
  }, [searchWord]); // Run whenever searchWord changes

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-2xl font-bold mb-6">
        {searchWord ? `All blogs near you in ${searchWord}` : `All blogs near you in ${location}`}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {blogs.length > 0 ? (
          blogs.map((blog) => <Card key={blog._id} blog={blog} />) // Use the appropriate unique key
        ) : (
          <p>No blogs available in your region.</p>
        )}
      </div>
    </div>
  );
};

export default Home;