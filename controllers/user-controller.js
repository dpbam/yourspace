const { User } = require("../models");
// maybe another const here? const { db } ?

const userController = {
  // get all users
  getAllUsers(req, res) {
    User.find({})
      // maybe .populate here? What is that again?
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // get one user by id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        //   populated thought and friend data?
        path: "thoughts",
        select: "-__v",
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id." });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // post new user
};
