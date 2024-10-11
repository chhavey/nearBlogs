import React, { useEffect, useRef, useState } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Quote from '@editorjs/quote';
import ImageTool from '@editorjs/image';
import Embed from '@editorjs/embed';
import { createBlog } from '../api/api'; 
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const editorInstance = useRef(null);
  const [title, setTitle] = useState('');
  const [authorName, setAuthorName] = useState(''); 
  const navigate = useNavigate(); 

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    setAuthorName(storedName || "Anonymous"); 

    editorInstance.current = new EditorJS({
      holder: 'editorjs',
      tools: {
        header: Header,
        list: List,
        quote: Quote,
        image: {
          class: ImageTool,
          config: {
            uploader: {
              async uploadByFile(file) {
                const mockUpload = new Promise((resolve) => {
                  setTimeout(() => {
                    resolve({
                      success: 1,
                      file: {
                        url: 'https://via.placeholder.com/300', // Replace with actual upload logic
                      },
                    });
                  }, 1000); // Simulate a 1-second upload delay
                });
                return mockUpload;
              },
              async uploadByUrl(url) {
                return {
                  success: 1,
                  file: {
                    url,
                  },
                };
              },
            },
          },
        },
        embed: Embed,
      },
      autofocus: true,
      onReady: () => {
        console.log('Editor.js is ready to use!');
      },
      onChange: () => {
        console.log('Content changed');
      },
    });

    return () => {
      if (editorInstance.current && typeof editorInstance.current.destroy === 'function') {
        editorInstance.current.destroy();
      }
    };
  }, []);

  const addSampleBlock = async () => {
    await editorInstance.current.blocks.insert('header', {
      text: 'Sample Header',
      level: 2,
    });
    await editorInstance.current.blocks.insert('paragraph', {
            text: 'This is a sample paragraph that demonstrates adding content to the editor.',
          });
  };

  // const handleSave = async () => {
  //   try {
  //     const outputData = await editorInstance.current.save();
  //     console.log('Output Data from Editor.js:', outputData);

  //     // Log each block for inspection
  //     outputData.blocks.forEach((block, index) => {
  //       console.log(`Block ${index}:`, block);
  //     });

  //     if (outputData.blocks.length === 0) {
  //       console.error('No content available in blocks');
  //       return;
  //     }

  //     // Prepare blog data
  //     const blogData = {
  //       title,
  //       content: outputData,
  //       region: "Default Region",
  //       authorName: authorName,
  //     };

  //     const response = await createBlog(blogData);
  //     if (response.success) {
  //       console.log('Blog created successfully:', response.data);
  //       navigate('/payment');
  //     } else {
  //       console.error('Error creating blog:', response.message);
  //     }
  //   } catch (error) {
  //     console.error('Saving failed:', error);
  //   }
  // };
  const handleSave = async () => {
    try {
      const outputData = await editorInstance.current.save();
      console.log('Output Data from Editor.js:', outputData);
  
      if (outputData.blocks.length === 0) {
        console.error('No content available in blocks');
        return;
      }
  
      // Prepare blog data
      const blogData = {
        title,
        content: outputData,
        region: "Default Region",
        authorName: authorName,
      };
  
      const response = await createBlog(blogData);
      if (response.success) {
        console.log('Blog created successfully:', response.data);
  
        // Navigate to the payment page with blog details
        navigate('/payment', { state: blogData });
      } else {
        console.error('Error creating blog:', response.message);
      }
    } catch (error) {
      console.error('Saving failed:', error);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Create a New Blog Post</h1>
      <input
        type="text"
        placeholder="Blog Title"
        className="mb-6 w-full max-w-4xl p-2 border border-gray-300 rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div id="editorjs" className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6 border min-h-[300px]"></div>
      <button
        className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
        onClick={addSampleBlock}
      >
        Add Sample Block
      </button>
      <button
        className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md transition duration-200"
        onClick={handleSave}
      >
        Publish Blog
      </button>
    </div>
  );
};

export default Create;

