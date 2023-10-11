const User = require('../models/User');

/* READ */
module.exports.getUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports.getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    const friendsIds = user.friends;
    const userFriends = await User.find({ _id: { $in: friendsIds } });

    res.status(200).json(userFriends);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/* UPDATE */
module.exports.addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    /* REMOVE FRIEND */
    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((friendId) => friendId !== id);
    } else {
      /* ADD FRIEND */
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    const savedUser = await user.save();
    const savedFriend = await friend.save();

    res.status(200).json({ savedUser, savedFriend });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
