import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const View = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { title, content, authorName, createdAt } = location.state || {};

  if (!title) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-700">
        <p>Blog not found!</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center p-6 flex flex-col items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/19670/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
      }}
    >
      <div className="max-w-2xl mx-auto bg-white bg-opacity-90 p-8 rounded-lg shadow-lg transition-all duration-300">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">
          {title}
        </h1>
        <p className="text-gray-600 text-lg mb-4 text-center italic">
          By {authorName} on {new Date(createdAt).toLocaleDateString()}
        </p>

        <div className="prose prose-lg max-w-none mx-auto mt-6">
          {content &&
            content.blocks.map((block, index) => {
              if (block.type === "header") {
                return (
                  <h2 key={index} className="text-2xl font-bold mb-4">
                    {block.data.text}
                  </h2>
                );
              } else if (block.type === "paragraph") {
                return (
                  <p key={index} className="mb-6 leading-relaxed">
                    {block.data.text}
                  </p>
                );
              } else if (block.type === "image") {
                return (
                  <img
                    key={index}
                    src={block.data.url}
                    alt={block.data.caption}
                    className="w-full h-auto rounded-lg shadow-md mb-8 transition-transform transform hover:scale-105" // Ensure classes are correct
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                );
              }
              return null;
            })}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            className="bg-white text-black py-2 px-6 rounded-lg shadow hover:bg-white-600 transition duration-200 ease-in-out"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default View;
