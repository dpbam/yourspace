const router = require("express").Router();

const {
  getAllThoughts,
  getThoughtById,
  addThought,
  updateThoughtById,
  removeThought,
  addReaction,
  removeReaction,
} = require("../../controllers/thought-controller");

// /api/thoughts
router.route("/").get(getAllThoughts);

//  /api/thoughts/<userId>
router.route("/:userId").post(addThought);

//  /api/thoughts/<thoughtId>
router.route("/:thoughtId").get(getThoughtById);

// /api/thoughts/<thoughtId>
router.route("/:thoughtId/reactions").post(addReaction);

router.route("/:thoughtId").put(updateThoughtById).delete(removeThought);

// /api/thoughts/<thoughtId>/<reactionId>
router.route(":thoughtId/:reactionId").delete(removeReaction);

module.exports = router;
