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
import express from "express";
const router = express.Router();

// User routes
router.post("/user", createUSer);
router.get("/user", getUSer);
router.get("/user/:id", getUSerById);
router.put("/user/:id", updateUSer);
router.delete("/user/:id", deleteUSer);

// Client routes
router.post("/client", createClient);
router.get("/client", getClient);
router.get("/client/:id", getClientById);
router.put("/client/:id", updateClient);
router.delete("/client/:id", deleteClient);

export default router;
