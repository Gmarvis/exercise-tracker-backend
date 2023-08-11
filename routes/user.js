let express = require("express");
let router = express.Router();

const User = require("../models/user");

// get all users
router.get("/", async (req, res) => {
try {
  const users = await User.find({})
  res.json(users).status(200);
} catch(err){
  res.json({mssg: "an error occured: ", err})
}
});

// add new user
router.post('/', async (req, res)=> {
  const user = req.body.user
//   const foundUser = await User.findOne(user)
//   foundUser? res.json(foundUser) : res.send("user not found")
  const createdUser = await User.create(user)
  res.json(createdUser);
  console.log(createdUser);

})


module.exports = router

