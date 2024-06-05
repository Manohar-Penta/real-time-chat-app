import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import passport from "passport";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "../db/connect-db.mjs";
import * as path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

import chatsRouter from "../routes/chats.router.mjs";
import authRouter from "../routes/auth.router.mjs";
import usersRouter from "../routes/user.router.mjs";

dotenv.config();

connectDB()
  .then(() => {
    console.log("Connected to Database!!!");
  })
  .catch((err) => {
    console.error(err);
  });

const app = express();

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//   })
// );
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: process.env.SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 5 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
    },
    store: MongoStore.create({
      client: mongoose.connection.getClient(),
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRouter);
app.use("/api/message", chatsRouter);
app.use("/api/users", usersRouter);

// app.listen(process.env.PORT, () => {
//   console.log("Listening on Port ", process.env.PORT);
// });

// ------------------------------------DeployMent------------------------------------------

const __dirname = dirname(fileURLToPath(import.meta.url));
const static_dir = path.resolve(__dirname + "..", "..", "..", "client", "dist");

if (process.env.NODE_ENV === "production") {
  app.use(express.static(static_dir));
  app.get("*", (req, res) => {
    const file_path = path.resolve(
      __dirname,
      "..",
      "..",
      "client",
      "dist",
      "index.html"
    );
    res.sendFile(file_path);
  });
}
// ------------------------------------DeployMent------------------------------------------

export { app };
