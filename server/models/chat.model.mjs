import { Schema, model } from "mongoose";

const chatSchema = new Schema(
  {
    chat: {
      type: String,
      required: [true, "Chat name is required!!!"],
      trim: true,
    },
    groupChat: { type: Boolean, default: false },
    users: [{ type: Schema.ObjectId, ref: "User" }],
    messages: [{ type: Schema.ObjectId, ref: "Message" }],
    latestMessage: { type: Schema.ObjectId, ref: "Message" },
    groupAdmins: [{ type: Schema.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export const Chat = model("Chat", chatSchema);
