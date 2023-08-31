const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      min: 2,
      max: 20,
      required: true
    },
    lastName: {
      type: String,
      min: 2,
      max: 20,
      required: true
    },
    email: {
      type: String,
      required: true,
      min: 2,
      max: 30,
      unique: true
    },
    password: {
      type: String,
      min: 5,
      required: true
    },
    picturePath: {
      type: String,
      default: ''
    },
    friends: {
      type: Array,
      default: []
    },
    location: String
  },
  { timestamps: true }
);

const User = mongoose.model('User', UserSchema);
export default User;