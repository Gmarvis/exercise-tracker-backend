let express = require("express");
let router = express.Router();

const Exercise = require("../models/exercise");
const User = require("../models/user");

// get all exercises
router.get('/', (req, res)=> {
    res.send("getting all exercises")
})


// add an exercise

router.post("/", async (req, res) => {
  let { userId, description, duration, date } = req.body.exercise;

  try{
    const foundUser = await User.findById(userId);
    console.log(foundUser);
    if (!foundUser) {
      res.json("No user with that id");
      return
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
  
    if (createdExercise) {
      res.json({
          _id: userId,
          Username: foundUser.username,
          description,
          duration,
          date: date,
        });
    } else {
      // console.log("not created")
      res.send("not created");
    }
  }
  catch(err){
    res.json({"errorMessage:": err })
  }




});

module.exports = router