import React, { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import ImageTool from "@editorjs/image";
import Embed from "@editorjs/embed";
import { useNavigate } from "react-router-dom";
import PreviewModal from "../components/PreviewModal";
import toast from "react-hot-toast";

const Create = () => {
  const editorInstance = useRef(null);
  const [title, setTitle] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [previewData, setPreviewData] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    setAuthorName(storedName || "Anonymous");

    editorInstance.current = new EditorJS({
      holder: "editorjs",
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
                        url: "https://via.placeholder.com/300",
                      },
                    });
                  }, 1000);
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
        console.log("Editor.js is ready to use!");
      },
      onChange: () => {
        console.log("Content changed");
      },
    });

    return () => {
      if (
        editorInstance.current &&
        typeof editorInstance.current.destroy === "function"
      ) {
        editorInstance.current.destroy();
      }
    };
  }, []);

  const addSampleBlock = async () => {
    await editorInstance.current.blocks.insert("header", {
      text: "Sample Header",
      level: 2,
    });
    await editorInstance.current.blocks.insert("paragraph", {
      text: "This is a sample paragraph that demonstrates adding content to the editor.",
    });
  };

  const handleSave = async () => {
    try {
      const outputData = await editorInstance.current.save();
      console.log("Output Data from Editor.js:", outputData);

      if (!title.trim()) {
        toast.error("Please provide a title for your blog.");
        return;
      }

      if (outputData.blocks.length === 0) {
        toast.error("Your blog is empty. Add some content before publishing.");
        return;
      }

      const blogData = {
        title,
        content: outputData,
        region: "Default Region",
        authorName: authorName,
      };

      navigate("/payment", { state: blogData });
    } catch (error) {
      console.error("Saving failed:", error);
      toast.error("An error occurred while saving the blog.");
    }
  };

  const handlePreview = async () => {
    try {
      const outputData = await editorInstance.current.save();

      if (!title.trim()) {
        toast.error("Please provide a title for your blog.");
        return;
      }

      if (outputData.blocks.length === 0) {
        toast.error("Your blog is empty. Add some content before previewing.");
        return;
      }

      const blogData = {
        title,
        content: outputData,
        authorName,
      };

      setPreviewData(blogData);
      setIsPreviewOpen(true);
    } catch (error) {
      console.error("Preview failed:", error);
      toast.error("An error occurred while generating the preview.");
    }
  };

  const closeModal = () => {
    setIsPreviewOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-gray-50 flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">
        Create a New Blog Post
      </h1>

      <input
        type="text"
        placeholder="Blog Title"
        className="mb-6 w-full max-w-4xl p-4 border border-gray-300 rounded-lg text-lg"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div
        id="editorjs"
        className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6 border min-h-[200px] mb-6"
      ></div>

      <div className="flex justify-around items-center gap-8">
        <button
          className="mt-6 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg shadow-md transition duration-200"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
        <button
          className="mt-6 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg shadow-md transition duration-200"
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
        <button
          className="mt-6 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg shadow-md transition duration-200"
          onClick={handlePreview}
        >
          Preview Blog
        </button>
      </div>

      <PreviewModal isOpen={isPreviewOpen} onClose={closeModal}>
        {previewData && (
          <div>
            <h1 className="text-3xl font-bold mb-4">{previewData.title}</h1>
            <p className="text-gray-600 mb-2">By {previewData.authorName}</p>
            <div className="mt-4">
              {previewData.content.blocks.map((block, index) => {
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
                }
                return null;
              })}
            </div>
          </div>
        )}
      </PreviewModal>
    </div>
  );
};

export default Create;
