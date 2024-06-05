import { User } from "../models/user.model.mjs";

export async function getUser(req, res) {
  if (req.isAuthenticated()) {
    try {
      const userId = req.user._id;

      let searchUser = await User.findOne({ _id: req.params.id }).select(
        "-password"
      );
      res.status(200).json({ status: true, searchUser });
    } catch (err) {
      console.log("Error in user controller...", err);
      res.send({ status: false, err });
    }
  } else {
    res.send({ status: false, err: "User is not Authenticated..." });
  }
}

export async function getUsersForSidebar(req, res) {
  if (req.isAuthenticated()) {
    try {
      const userId = req.user._id;
      let keyword = req.body.search
        ? {
            $or: [
              { username: { $regex: req.body.search, $options: "i" } },
              { fullName: { $regex: req.body.search, $options: "i" } },
            ],
          }
        : {};
      let searchUsers = await User.find(keyword)
        .find({ _id: { $ne: userId } })
        .select("-password");
      res.status(200).json({ status: true, searchUsers });
    } catch (err) {
      console.log("Error in user controller...", err);
      res.send({ status: false, err });
    }
  } else {
    res.send({ successStatus: false, err: "User is not Authenticated..." });
  }
}
