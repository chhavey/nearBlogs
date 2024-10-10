const Blog = require("../models/Blog");

exports.createBlog = async (req, res) => {
  const { title, content, region } = req.body;
  try {
    const blog = new Blog({ title, content, author: req.user.id, region });
    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ error: "Blog creation failed" });
  }
};

exports.updateBlog = async (req, res) => {
  const { title, content, region } = req.body;
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, content, region },
      { new: true }
    );
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: "Blog update failed" });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Blog deletion failed" });
  }
};

exports.getBlogsByRegion = async (req, res) => {
  const { region } = req.params;
  try {
    const blogs = await Blog.find({ region });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve blogs" });
  }
};
