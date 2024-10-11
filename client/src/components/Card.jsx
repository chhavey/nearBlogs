import React from "react";

const Card = ({ blog }) => {
  const renderContent = () => {
    if (blog.content && blog.content.blocks) {
      return blog.content.blocks.map((block, index) => {
        if (block.type === 'header') {
          return <h2 key={index} className="text-2xl font-bold">{block.data.text}</h2>;
        } else if (block.type === 'paragraph') {
          return <p key={index}>{block.data.text}</p>;
        } else if (block.type === 'image') {
          return (
            <img 
              key={index} 
              src={block.data.url} 
              alt={block.data.caption} 
              className="w-full h-48 object-cover" 
            />
          );
        }
        return null; 
      });
    }
    return null; 
  };

  const getSummary = () => {
    const paragraphs = blog.content.blocks.filter(block => block.type === 'paragraph');
    if (paragraphs.length > 0) {
      const text = paragraphs.map(paragraph => paragraph.data.text).join(" ");
      return text.split('.').slice(0, 2).join('.') + (text.split('.').length > 2 ? '...' : '');
    }
    return '';
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      {blog.coverImage && (
        <img 
          src={blog.coverImage} 
          alt={blog.title} 
          className="w-full h-48 object-cover" 
        />
      )}
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
        <div className="text-gray-700 line-clamp-2">
          {getSummary()}
        </div>
      </div>
      <div className="p-4 flex justify-end">
        <span className="text-gray-500 text-sm">By {blog.authorName}</span>
      </div>
    </div>
  );
};

export default Card;