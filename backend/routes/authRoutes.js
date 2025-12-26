const express = require("express");
const router = express.Router();
const {
  register,
  login,
  test,
  protect,
  logout,
} = require("../controller/authController");

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/test", protect, test);

module.exports = router;
