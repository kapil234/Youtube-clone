import bcrypt from "bcrypt";
import User from "../models/User.js";
import generateToken from "../config/jwt.js";

export const register = async (req, res) => {
  try {
    let { username, email, password } = req.body;

    // Trim input
    username = username.trim();
    email = email.trim().toLowerCase();

    // Email Validation
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Please enter a valid email address.",
      });
    }

    // Password Validation
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters and include uppercase, lowercase, number and special character.",
      });
    }

    // Check Existing User
    const userExists = await User.findOne({
      email,
    });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);

    const hashedPassword =
      await bcrypt.hash(password, salt);

    // Create User
    await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // No JWT Here
    res.status(201).json({
      success: true,
      message: "Registration successful. Please login.",
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    let { email, password } = req.body;

    email = email.trim().toLowerCase();

    const user = await User.findOne({
      email,
    });

    if (
      user &&
      (await bcrypt.compare(
        password,
        user.password
      ))
    ) {
      res.status(200).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({
        message: "Invalid Credentials",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};