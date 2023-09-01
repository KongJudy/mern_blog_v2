const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

/* GENERATE TOKEN */
module.exports.generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

/* REGISTER NEW USER */
module.exports.Register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, picturePath, location } =
      req.body;

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      location
    });
    const token = this.generateToken(newUser._id);
    const savedUser = await newUser.save();

    res.status(201).json({ savedUser, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* LOGGING IN */
module.exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid User' });

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword)
      return res.status(400).json({ msg: 'Invalid Credentials' });

    const token = this.generateToken(user._id);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
