// import React, { useEffect, useRef } from 'react';
// import EditorJS from '@editorjs/editorjs';
// import Header from '@editorjs/header';
// import List from '@editorjs/list';
// import Quote from '@editorjs/quote';
// import ImageTool from '@editorjs/image';
// import Embed from '@editorjs/embed';

// const Create = () => {
//   const editorInstance = useRef(null);

//   useEffect(() => {
//     // Initialize Editor.js
//     editorInstance.current = new EditorJS({
//       holder: 'editorjs',
//       tools: {
//         header: Header,
//         list: List,
//         quote: Quote,
//         image: {
//           class: ImageTool,
//           config: {
//             uploader: {
//               // Define an async function for handling image uploads
//               async uploadByFile(file) {
//                 // Implement your custom image upload logic here
//                 // For example, uploading to a cloud storage or server
                
//                 // Placeholder: Simulating an image upload
//                 const mockUpload = new Promise((resolve) => {
//                   setTimeout(() => {
//                     resolve({
//                       success: 1,
//                       file: {
//                         url: 'https://via.placeholder.com/300', // Replace with the actual image URL after upload
//                       },
//                     });
//                   }, 1000); // Simulate a 1-second upload delay
//                 });

//                 return mockUpload;
//               },

//               // Optional: Handle image uploads via URL
//               async uploadByUrl(url) {
//                 return {
//                   success: 1,
//                   file: {
//                     url, // Use the provided URL directly
//                   },
//                 };
//               },
//             },
//           },
//         },
//         embed: Embed,
//       },
//       autofocus: true,
//       onReady: () => {
//         console.log('Editor.js is ready to use!');
//       },
//       onChange: () => {
//         console.log('Content changed');
//       },
//     });

//     return () => {
//       if (editorInstance.current && typeof editorInstance.current.destroy === 'function') {
//         editorInstance.current.destroy();
//       }
//     };
//   }, []);

//   const handleSave = async () => {
//     try {
//       const outputData = await editorInstance.current.save();
//       console.log('Saved content:', outputData);
//     } catch (error) {
//       console.log('Saving failed:', error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
//       {/* Page Title */}
//       <h1 className="text-3xl font-bold mb-8 text-gray-800">
//         Create a New Blog Post
//       </h1>

//       {/* Editor.js Container */}
//       <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6 border">
//         <div id="editorjs" className="min-h-[300px]"></div>
//       </div>

//       {/* Save Button */}
//       <button
//         className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md transition duration-200"
//         onClick={handleSave}
//       >
//         Save Blog
//       </button>
//     </div>
//   );
// };

// export default Create;

import React, { useEffect, useRef, useState } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Quote from '@editorjs/quote';
import ImageTool from '@editorjs/image';
import Embed from '@editorjs/embed';
import axios from 'axios'; // Make sure to install axios

const Create = () => {
  const editorInstance = useRef(null);
  const [title, setTitle] = useState(''); // State to hold the blog title

  useEffect(() => {
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

  const handleSave = async () => {
    try {
      const outputData = await editorInstance.current.save();
      console.log('Saved content:', outputData);

      // Make an API call to save the blog content
      const response = await axios.post('/api/blogs', {
        title, // Use the title state
        content: outputData, // Send the outputData from Editor.js
        authorName: 'Chhavi Gupta', // Replace with dynamic author name if necessary
      });

      console.log(response.data.message);
      // Optionally redirect or show a success message
    } catch (error) {
      console.log('Saving failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Create a New Blog Post</h1>
      
      {/* Title Input */}
      <input
        type="text"
        placeholder="Blog Title"
        className="mb-6 w-full max-w-4xl p-2 border border-gray-300 rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)} // Update title state
      />

      {/* Editor.js Container */}
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6 border">
        <div id="editorjs" className="min-h-[300px]"></div>
      </div>

      {/* Save Button */}
      <button
        className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md transition duration-200"
        onClick={handleSave}
      >
        Save Blog
      </button>
    </div>
  );
};

export default Create;