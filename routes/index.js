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
  createStudent,
  getStudent,
  getStudentById,
  updateStudent,
  deleteStudent,
} from "../controller/student/index.js";
import {
  register,
  login,
  getMe,
  authMiddleware,
} from "../controller/auth/index.js";
import express from "express";
import { importCSV } from "../controller/upload-csv/index.js";

const router = express.Router();
import multer from "multer";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Create the multer instance
const upload = multer({ storage: storage });

// User routes
router.post("/user", createUSer);
router.get("/user", getUSer);
router.get("/user/:id", authMiddleware, getUSerById);
router.put("/user/:id", authMiddleware, updateUSer);
router.delete("/user/:id", deleteUSer);

// Auth routes
router.post("/register", register);
router.post("/login", login);

// Student routes
router.post("/student", authMiddleware, createStudent);
router.get("/student", authMiddleware, getStudent);
router.get("/student/:id", authMiddleware, getStudentById);
router.put("/student/:id", authMiddleware, updateStudent);
router.delete("/student/:id", authMiddleware, deleteStudent);

// Client routes
router.post("/client", authMiddleware, createClient);
router.get("/client", authMiddleware, getClient);
router.get("/client/:id", authMiddleware, getClientById);
router.put("/client/:id", authMiddleware, updateClient);
router.delete("/client/:id", authMiddleware, deleteClient);

// Upload CSV route
router.post("/upload-csv", upload.single("file"), importCSV);

export default router;
