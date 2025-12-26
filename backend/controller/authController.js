import jwt from "jsonwebtoken";
import { promisify } from "util";
import User from "../models/User.js";
import emailValidator from "../utils/emailValidator.js";
import appError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

export const test = (req, res) => {
  console.log("hello");
  return res.json("Working");
};
const signToken = (id) => {
  console.log("JWT_EXPIRES_IN =", process.env.JWT_EXPIRES_IN);
  console.log("TYPE =", typeof process.env.JWT_EXPIRES_IN);
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    // secure: true, //for https
    httpOnly: true,
  };
  res.cookie("jwt", token, cookieOptions);

  res.status(statusCode).json({
    status: "Success",
    token,
    data: {
      user,
    },
  });
};

export const register = catchAsync(async (req, res) => {
  const { name, email, username, password, bio, pic, location } = req.body;
  if (!emailValidator(email)) {
    return res.status(400).json({ error: "Email not valid" });
  }

  const userExists = await User.findOne({ email });
  //   const userNameExists = await User.findOne({ username });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }
  //   if (userNameExists) {
  //     return res.status(400).json({ message: "Username already exists" });
  //   }

  const user = await User.create({
    name,
    email,
    username,
    password,
    bio,
    pic,
    location,
  });
  console.log(user);
  createSendToken(user, 200, res);
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new appError("Email or password Missing", 401));

  const user = await User.findOne({ email }).select("+password");
  if (!user) return next(new appError("User doesnt exists", 401));

  const correct = await user.correctPassword(password, user.password);
  if (!correct) return next(new appError("Email or password is wrong", 401));

  createSendToken(user, 200, res);
});

export const protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies?.jwt) {
    token = req.cookies.jwt;
  }

  if (!token || token === "loggedOut") {
    return next(new appError("You are not logged in. Please login.", 401));
  }
  ///we convert the verification to a promise so we can then call it and use async await
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  console.log(decoded);

  const curUser = await User.findById(decoded.id);
  console.log(curUser);
  if (!curUser)
    return next(new appError("The user does no longer exists", 401));
  //call next() and grant access to proteted route
  req.user = curUser;
  next();
});

export const logout = catchAsync(async (req, res) => {
  res.cookie("jwt", "loggedOut", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res
    .status(200)
    .json({ status: "Success", message: "Logged out successfully" });
});
