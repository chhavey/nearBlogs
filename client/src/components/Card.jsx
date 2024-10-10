import React from "react";

const Card = ({ blog }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
  
      <div className="p-4">
        {blog.content}
        {/* <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
        <p className="text-gray-700 text-base mb-4">
          {blog.description.substring(0, 100)}...
        </p>
        <p className="text-gray-500 text-sm">By {blog.author}</p>
        <p className="text-gray-500 text-sm">{blog.location}</p> */}
      </div>
    </div>
  );
};

export default Card;