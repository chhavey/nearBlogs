const express = require("express");
const {
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogsByRegion,
} = require("../controllers/blogController");
const { isAuthenticated } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", isAuthenticated, createBlog);
router.put("/:id", isAuthenticated, updateBlog);
router.delete("/:id", isAuthenticated, deleteBlog);
router.get("/:region", getBlogsByRegion);

module.exports = router;
