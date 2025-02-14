import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/user.js";
// Register User
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ name, email, password: hashedPassword });
    await user.save();

    const payload = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
    const token = jwt.sign(payload, "ghbnjmkmjnjbjnmk", {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Login User
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const payload = {
      user: { id: user.id, name: user.name, email: user.email },
    };
    const token = jwt.sign(payload, "ghbnjmkmjnjbjnmk", {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Verify Token Middleware
export const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // Extract token (handle both 'Bearer token' and direct token cases)
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : authHeader;

  try {
    const decoded = jwt.verify(token, "ghbnjmkmjnjbjnmk"); // Ensure correct secret key
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error("JWT Error:", err.message); // Log detailed error for debugging
    return res.status(401).json({ msg: "Token is not valid" });
  }
};

// Get Authenticated User
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
