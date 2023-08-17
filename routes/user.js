let express = require("express");
let router = express.Router();

const User = require("../models/user");

// get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users).status(200);
  } catch (err) {
    res.json({ mssg: "an error occured: ", err });
  }
});

// getuser by id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try{
    const user = await User.findOne({ _id: id });
    res.json(user).status(200)
  }catch (err){
    res.json({"an error occured: ":  err})
  }
});

// add new user
router.post("/", async (req, res) => {
  const user = req.body.user;
  try {
    const createdUser = await User.create(user);
    res.json(createdUser).status(200)
    console.log(createdUser);
  } catch (err) {
    res.json({ errorMassage: err }).status(400);
  }
});

module.exports = router;
