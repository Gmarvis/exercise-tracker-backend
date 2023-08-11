const mongoose = require("../db")

const Schema = mongoose.Schema

const exerciseSchema = new Schema({
    userId: String,
    username: String,
    description: { type: String, require: true },
    duration: { type: Number, require: true },
    date: String,
},
{versionKey: false}
)

const Exercise = mongoose.model("Exercise", exerciseSchema)
module.exports = Exercise