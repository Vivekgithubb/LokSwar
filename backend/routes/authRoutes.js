const express = require("express");
const router = express.Router();
const {
  register,
  login,
  test,
  protect,
  logout,
  me,
} = require("../controller/authController");

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/me", protect, me);
router.get("/test", protect, test);

module.exports = router;
