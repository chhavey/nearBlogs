const express = require("express");
const {
  createPayment,
  executePayment,
  cancelPayment,
} = require("../controllers/paypalController");
const { isAuthenticated } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/pay", isAuthenticated, createPayment);
router.get("/success", executePayment);
router.get("/cancel", cancelPayment);

module.exports = router;
