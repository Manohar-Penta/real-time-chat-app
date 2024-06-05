import { User } from "../../models/user.model.mjs";
import passport from "passport";
import { Strategy } from "passport-local";
import { checkPassword } from "../hashing.utils.mjs";

passport.serializeUser((user, done) => {
  // console.log("inside Serializing user...");
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  // console.log("inside Deserializing user...");
  try {
    let findUser = await User.findOne({ _id: id });
    if (!findUser) throw "User not found...";
    done(null, findUser);
  } catch (err) {
    console.log("error at deserializeUser \n", err);
    done(err, null);
  }
});

passport.use(
  "local",
  new Strategy({ passReqToCallback: true }, async function verify(
    req,
    username,
    password,
    done
  ) {
    try {
      // console.log("inside passport authenticate...");
      let findUser = await User.findOne({ username });
      if (!findUser) throw "User not found!!";
      if (!(await checkPassword(password, findUser.password)))
        throw "Incorrect Password!!";
      done(null, findUser);
    } catch (err) {
      console.log("error from local Strategy...", err);
      done(err, null);
    }
  })
);

export { passport };
