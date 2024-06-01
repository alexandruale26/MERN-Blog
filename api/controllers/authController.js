import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
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
