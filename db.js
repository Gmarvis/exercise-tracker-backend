let mongoose = require("mongoose");

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected"))
  .catch((error) => console.log(error));

console.log(mongoose.connection.readyState);

module.exports = mongoose;
