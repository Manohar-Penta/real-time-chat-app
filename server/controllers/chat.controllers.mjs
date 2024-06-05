import { Chat } from "../models/chat.model.mjs";
import { Message } from "../models/message.model.mjs";
import { User } from "../models/user.model.mjs";

export async function accessChat(req, res) {
  if (req.isAuthenticated()) {
    try {
      let isChat = await Chat.findOne({
        groupChat: false,
        $and: [
          { users: { $elemMatch: { $eq: req.user._id } } },
          { users: { $elemMatch: { $eq: req.params.id } } },
        ],
      })
        .populate("users", "-password")
        .populate("latestMessage")
        .populate("messages");

      // console.log(isChat);

      isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "username profilePic",
      });

      isChat = await Message.populate(isChat, {
        path: "messages.sender",
        select: "username profilePic",
      });

      if (isChat) {
        res.send(isChat);
      } else {
        let chatData = {
          chat: "sender",
          isGroupChat: false,
          users: [req.user._id, req.params.id],
        };

        try {
          const createdChat = await Chat.create(chatData);
          const FullChat = await Chat.findOne({
            _id: createdChat._id,
          }).populate("users", "-password");
          res.status(200).json(FullChat);
        } catch (error) {
          res.status(400);
          throw new Error(error.message);
        }
      }
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
  } else res.status(401).send("User is not authenticated...");
}

export async function fetchChats(req, res) {
  if (req.isAuthenticated()) {
    try {
      const userId = req.user._id;

      Chat.find({
        users: { $elemMatch: { $eq: userId } },
      })
        .populate("users", "-password")
        .populate("latestMessage")
        .populate("groupAdmins", "-password")
        .sort({ updatedAt: -1 })
        .then(async (results) => {
          // console.log(results);
          results = await User.populate(results, {
            path: "latestMessage.sender",
            select: "username profilePic",
          });
          // console.log(results);
          res.send({ results });
        });
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal Server error");
    }
  } else res.status(401).send("User is not authenticated...");
}

export async function createGroupChat(req, res) {
  if (req.isAuthenticated()) {
    if (!req.body.users || !req.body.name) {
      return res.status(400).send({ message: "Please Fill all the feilds" });
    }

    let { users } = req.body;

    if (users.length < 1) {
      return res
        .status(400)
        .send("More than 2 users are required to form a group chat");
    }

    users.push(req.user);

    try {
      const groupChat = await Chat.create({
        chat: req.body.name,
        users: users,
        groupChat: true,
        groupAdmins: [req.user],
      });

      const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
        // .populate("users", "-password")
        // .populate("groupAdmins", "-password");

      res.status(200).json(fullGroupChat);
    } catch (error) {
      res.status(400);
      console.log(error);
    }
  } else {
    res.sendStatus(401);
  }
}

export async function renameGroup(req, res) {
  if (req.isAuthenticated()) {
    const { chatId, chatName } = req.body;

    let isAdmin = await Chat.findOne({
      _id: chatId,
      groupAdmins: { $elemMatch: { $eq: req.user._id } },
    });

    if (!isAdmin) return res.sendStatus(401);

    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      {
        chat: chatName,
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmins", "-password");

    if (!updatedChat) {
      res.status(404);
    } else {
      res.json(updatedChat);
    }
  } else {
    res.sendStatus(401);
  }
}

export async function addToGroup(req, res) {
  if (req.isAuthenticated()) {
    const { chatId, userId } = req.body;

    let findchat = await Chat.findOne({
      _id: chatId,
      users: { $elemMatch: { $eq: userId } },
    });

    let findUser = await User.findOne({
      _id: userId,
    });

    if (!findUser) return res.status(400).send("User not found...");
    if (findchat) return res.status(200).send(findchat);

    const added = await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: { users: userId },
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmins", "-password");

    if (!added) {
      res.status(404);
      throw new Error("Chat Not Found");
    } else {
      res.json(added);
    }
  } else res.sendStatus(401);
}

export async function removeFromGroup(req, res) {
  if (req.isAuthenticated()) {
    const { chatId, userId } = req.body;

    if (!chatId || !userId) return res.send("Pls fill all the details...");

    const removed = await Chat.findByIdAndUpdate(
      chatId,
      {
        $pull: { users: userId },
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmins", "-password");

    if (!removed) {
      res.status(404);
      throw new Error("Chat Not Found");
    } else {
      res.json(removed);
    }
  } else return res.status(401);
}

export async function getChat(req, res) {
  if (req.isAuthenticated()) {
    try {
      let isChat = await Chat.findOne({
        _id: req.params.id,
      })
        .populate("users", "-password")
        .populate("latestMessage")
        .populate("messages");

      isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "username profilePic",
      });

      isChat = await Message.populate(isChat, {
        path: "messages.sender",
        select: "username profilePic",
      });

      res.send(isChat);
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
  } else res.status(401).send("User is not authenticated...");
}

export async function pushChat(req, res) {
  if (req.isAuthenticated()) {
    try {
      let chatId = req.params.id;
      let text = req.body.text;

      let newMsg = await Message.create({
        sender: req.user._id,
        message: text,
      });

      const added = await Chat.findByIdAndUpdate(
        chatId,
        {
          $push: { messages: newMsg._id },
          latestMessage: newMsg._id,
        },
        {
          new: true,
        }
      ).populate({ path: "latestMessage", populate: { path:"sender" } });
      // .populate("latestMessage/sender");

      // added.populate("latestMessage");

      // console.log(added);

      if (added) res.send({ ...added });
      else res.sendStatus(406);
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
  } else res.status(401).send("User is not authenticated...");
}
