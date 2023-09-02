const Post = require('../models/Post');
const User = require('../models/User');

/* READ */
module.exports.createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;

    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      picturePath,
      userPicturePath: user.picturePath,
      likes: {},
      comments: []
    });
    await newPost.save();

    /* FIND ALL POSTS */
    const post = await Post.find();
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports.getFeedPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports.getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.findById({ userId });
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports.postComment = async (req, res) => {
  try {
    const { userId, postId, text } = req.body;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: 'Post Not Found' });

    const comment = {
      userId,
      text
    };

    post.comments.push(comment);

    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/* UPDATE */
module.exports.editPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const { id } = req.params;

    const post = await Post.findById(id);

    if (!post) return res.status(404).json({ message: 'Post Not Found' });

    if (post.userId !== userId)
      return res
        .status(401)
        .json({ message: 'Unauthorized to edit this post' });

    post.description = description;
    post.picturePath = picturePath;

    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports.likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
