import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password || username === "" || email === "" || password === "") {
    return next(errorHandler(400, "All fields are required"));
  }

  try {
    const hashedPassword = await bcryptjs.hash(password, 12);
    const newUser = await User.create({ username, email, password: hashedPassword });

    res.json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    return next(errorHandler(400, "All fields are required"));
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid credentials"));
    }

    // !!! This is the token lifespan
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, { expiresIn: "10h" });
    const { password: pass, ...rest } = validUser._doc;

    // !!! MaxAge is for the browser to know how long it should store the token//
    // It's not the token lifespan
    res
      .status(200)
      .cookie("access_token", token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 1000 })
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "10h" });
    const { password, ...rest } = user._doc;
    console.log(user);

    res
      .status(200)
      .cookie("access_token", token, { httpOnly: true, maxAge: 10 * 60 * 60 * 1000 })
      .json(rest);
  } else {
    const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
    const hashedPassword = await bcryptjs.hash(generatedPassword, 12);
    const newUser = await User.create({
      username: name.toLowerCase().split(" ").join("") + Math.random().toString(9).slice(-4),
      email,
      password: hashedPassword,
      profilePicture: googlePhotoUrl,
    });

    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "10h" });
    const { password, ...rest } = newUser._doc;

    res
      .status(200)
      .cookie("access_token", token, { httpOnly: true, maxAge: 10 * 60 * 60 * 1000 })
      .json(rest);
  }

  try {
  } catch (error) {
    next(error);
  }
};
