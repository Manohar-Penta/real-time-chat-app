import express from "express";
import {
  fetchChats,
  accessChat,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
  getChat,
  pushChat,
} from "../controllers/chat.controllers.mjs";
import { authWare } from "../utils/authentication/authWare.mjs";

let router = express.Router();

router.get("/chats", fetchChats);
router.post("/group/create", createGroupChat);
router.put("/group/rename", renameGroup);
router.put("/group/add", addToGroup);
router.put("/group/remove", removeFromGroup);
router.get("/get/:id", getChat);
router.put("/push/:id", pushChat);
router.get("/:id", accessChat);

export default router;
