import React from "react";
import { useLocation } from "react-router-dom";

const Preview = () => {
  const location = useLocation();
  const { title, content, authorName } = location.state || {};

  if (!title) {
    return <div>Blog not found!</div>;
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center p-6"
      style={{ backgroundImage: "url('/path/to/floral-background.jpg')" }}
    >
      <div className="max-w-2xl mx-auto bg-white bg-opacity-80 p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        <p className="text-gray-600 mb-2">By {authorName || "Anonymous"}</p>
        <div className="mt-4">
          {content &&
            content.blocks.map((block, index) => {
              if (block.type === "header") {
                return (
                  <h2 key={index} className="text-2xl font-bold">
                    {block.data.text}
                  </h2>
                );
              } else if (block.type === "paragraph") {
                return (
                  <p key={index} className="mb-2">
                    {block.data.text}
                  </p>
                );
              } else if (block.type === "image") {
                return (
                  <img
                    key={index}
                    src={block.data.url}
                    alt={block.data.caption}
                    className="w-full h-48 object-cover mb-4"
                  />
                );
              } else if (block.type === "list") {
                return block.data.style === "ordered" ? (
                  <ol key={index} className="list-decimal list-inside mb-4">
                    {block.data.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="mb-1">
                        {item}
                      </li>
                    ))}
                  </ol>
                ) : (
                  <ul key={index} className="list-disc list-inside mb-4">
                    {block.data.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="mb-1">
                        {item}
                      </li>
                    ))}
                  </ul>
                );
              } else if (block.type === "blockquote") {
                return (
                  <blockquote
                    key={index}
                    className="border-l-4 border-gray-400 pl-4 italic mb-4"
                  >
                    {block.data.text}
                  </blockquote>
                );
              }
              return null;
            })}
        </div>
      </div>
    </div>
  );
};

export default Preview;
