let express = require("express");
let router = express.Router();

const Exercise = require("../models/exercise");
const User = require("../models/user");

// get all exercises
router.get("/", async (req, res) => {
  try {
    const AllExercises = await Exercise.find({});
    res.json(AllExercises).status(200);
  } catch (err) {
    res.json({ "an error occured: ": err });
  }
});

// Get single exercise
router.get("/:_id/exercises", async (req, res) => {
  const _id = req.params._id;
  console.log("this is userid", _id);
  try {
    const foundExersice = await Exercise.findOne({ userId: _id });
    res.json({
      userId: foundExersice.userId,
      username: foundExersice.username,
      description: foundExersice.description,
      duration: foundExersice.duration,
      date: foundExersice.date,
    });
  } catch (err) {
    res.json({ "An error occured here": err });
  }
});

// add an exercise

router.post("/", async (req, res) => {
  let { userId, description, duration, date } = req.body.exercise;

  try {
    const foundUser = await User.findById(userId);
    console.log(foundUser);
    if (!foundUser) {
      res.json("No user with that id");
      return;
    }
    if (!date) {
      date = new Date();
    }

    let createdExercise = await Exercise.create({
      userId: userId,
      username: foundUser.username,
      description,
      duration,
      date,
    });

    const redirectTo = `http://localhost:9000/api/user/${createdExercise.userId}/exercises`
    res.redirect(redirectTo);
 

    
    // if (createdExercise) {
    //   res.json({
    //     _id: userId,
    //     Username: foundUser.username,
    //     description,
    //     duration,
    //     date: date,
    //   });

    // } else {
    //   // console.log("not created")
    //   res.send("not created");
    // }
  } catch (err) {
    res.json({ "errorMessage:": err });
  }
});

module.exports = router;
