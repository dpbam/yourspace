const { Thought, User } = require("../models");

const thoughtController = {
    // get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
          // maybe .populate here? What is that again?
          .then((dbUserData) => res.json(dbUserData))
          .catch((err) => {
            console.log(err);
            res.status(400).json(err);
          });
      },

    //   get a thought by its _id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No thought foudn with this id.'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(404).json(err);
        });
    },

  // add thought to user
  addThought({ params, body }, res) {
    console.log(body);
    Thought.create(body).then(({ _id }) => {
      return User.findOneAndUpdate(
        { _id: params.userId },
        { $push: { thought: _id } },
        { new: true }
      );
    })
    .then (dbUserData => { 
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id.' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => res.json(err));
  },

//   PUT to update a thought by its _id
  updateThoughtById({ params }, res) {
    Thought.findOneAndUpdate({ _id: params.thoughtId })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user thought found with this id.' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
  },

//   DELETE to remove a thought by its _id
  removeThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
        .then(deletedThought => {
            if (!deletedThought) {
                return res.status(404).json({ message: 'No thought with this id.' });           
            }
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $pull: { comments: params.thoughtId } },
                {new: true }
            );
        })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user found with this id.' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
  },

  addReaction({})
};
