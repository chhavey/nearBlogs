const express = require("express");
const {
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogsByRegion,
  getBlogsByUser,
} = require("../controllers/blogController");
const { isAuthenticated } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/user", isAuthenticated, getBlogsByUser);
router.get("/:region", getBlogsByRegion);
router.post("/", isAuthenticated, createBlog);
router.put("/:id", isAuthenticated, updateBlog);
router.delete("/:id", isAuthenticated, deleteBlog);

module.exports = router;
