import { User } from "../models/user.model.mjs";
import { hashPassword } from "../utils/hashing.utils.mjs";

export async function userSignUp(req, res, next) {
  let { fullName, username, password, confirmPassword, gender } = req.body;
  let profilePic = `https://avatar.iran.liara.run/public/${gender}?username=${username}`;
  try {
    if (password !== confirmPassword)
      throw "Confirm Password doesn't match the password.";
    let findUser = await User.findOne({ username });
    if (findUser) throw "user already exists..";
    let hashedPassword = await hashPassword(password);
    let newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic,
    });
    await newUser.save();
    // console.log(newUser);
    req.login(newUser, (err) => {
      if (err) throw err;
      else res.redirect("/api/auth/home");
    });
  } catch (err) {
    console.error(err);
    res.send({ status: false, err });
  }
}

export async function userLogout(req, res) {
  // console.log("trying to logout...");
  if (!req.user) return res.sendStatus(401);
  else {
    req.logout((err) => {
      if (err) return res.status(400).send({ err });
      else res.status(200).send({ status: true });
    });
  }
}
