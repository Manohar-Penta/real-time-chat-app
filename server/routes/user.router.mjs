import express from "express";
import {
  getUser,
  getUsersForSidebar,
} from "../controllers/user.controllers.mjs";

const router = express.Router();

router.post("/", getUsersForSidebar);
router.get("/data/:id", getUser);

export default router;
