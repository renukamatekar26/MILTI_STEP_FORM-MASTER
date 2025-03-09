const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {type: String, required: true},
  email: { type: String, unique: true, required: true },
  password: {type: String, required: true},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  address: {type: String, required: true},
  phone: {type: String, required: true},
  food: {type: String, required: true},
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
