import express from "express";
import { userLogout, userSignUp } from "../controllers/auth.controllers.mjs";
import { passport } from "../utils/authentication/passport.setup.mjs";
// import { validationResult,matchedData,checkSchema } from "express-validator";
// import { userLoginValidationSchema,userSignUpValidationSchema } from "../utils/userValidation.mjs";

const router = express.Router();

router.get("/home", (req, res) => {
  if (req.isAuthenticated()) {
    let { username, fullName, gender, _id, profilePic } = req.user;
    res.send({ status: true, user: { username, fullName, _id, profilePic } });
  } else res.send({ status: false });
});

// router.get("/success", (req, res) => {
//   res.status(200).send({ user: req.user });
// });

router.post(
  "/login",
  passport.authenticate("local", { failWithError: true }),
  function (req, res, next) {
    return res.redirect("/api/auth/home");
  },
  function (err, req, res, next) {
    return res.send({ status: false, err });
  }
);

router.post("/signup", userSignUp);

router.post("/logout", userLogout);

export default router;
