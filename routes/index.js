import {
  createUSer,
  getUSer,
  getUSerById,
  updateUSer,
  deleteUSer,
} from "../controller/user/index.js";

import {
  createClient,
  getClient,
  getClientById,
  updateClient,
  deleteClient,
} from "../controller/client/index.js";
import {
  register,
  login,
  getMe,
  authMiddleware,
} from "../controller/auth/index.js";
import express from "express";
const router = express.Router();

// User routes
router.post("/user", createUSer);
router.get("/user", getUSer);
router.get("/user/:id", authMiddleware, getUSerById);
router.put("/user/:id", authMiddleware, updateUSer);
router.delete("/user/:id", deleteUSer);

// Auth routes
router.post("/register", register);
router.post("/login", login);

// Client routes
router.post("/client", authMiddleware, createClient);
router.get("/client", authMiddleware, getClient);
router.get("/client/:id", authMiddleware, getClientById);
router.put("/client/:id", authMiddleware, updateClient);
router.delete("/client/:id", authMiddleware, deleteClient);

export default router;
