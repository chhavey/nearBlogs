const Blog = require("../models/Blog");

exports.createBlog = async (req, res) => {
  try {
    const { title, content, region } = req.body;

    const author = req.user._id;
    const authorName = req.user.fullName;

    const newBlog = new Blog({
      title,
      content,
      region,
      author,
      authorName,
    });

    await newBlog.save();
    res
      .status(201)
      .json({ message: "Blog created successfully!", blog: newBlog });
  } catch (error) {
    console.error("Blog creation error:", error);
    res.status(400).json({ error: error.message });
  }
};

exports.updateBlog = async (req, res) => {
  const { title, content, region, coverImage } = req.body;
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
        region,
        coverImage,
        authorName: req.user.fullName,
      },
      { new: true }
    );

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.status(200).json(blog);
  } catch (error) {
    console.error("Blog update error:", error.message);
    res.status(500).json({ error: "Blog update failed" });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.status(204).send(); // Successfully deleted, no content to return
  } catch (error) {
    console.error("Blog deletion error:", error.message);
    res.status(500).json({ error: "Blog deletion failed" });
  }
};

exports.getBlogsByRegion = async (req, res) => {
  const { region } = req.params;
  try {
    const blogs = await Blog.find({ region });
    res.status(200).json(blogs);
  } catch (error) {
    console.error("Error retrieving blogs by region:", error.message);
    res.status(500).json({ error: "Failed to retrieve blogs" });
  }
};

exports.getBlogsByUser = async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.user.id }).populate(
      "author",
      "fullName"
    ); // Populating fullName from User model
    res.status(200).json(blogs);
  } catch (error) {
    console.error("Error retrieving user's blogs:", error.message);
    res.status(500).json({ error: "Failed to retrieve blogs" });
  }
};
