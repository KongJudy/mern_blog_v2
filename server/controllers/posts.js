const Post = require('../models/Post');
const User = require('../models/User');

/* READ */
module.exports.createPost = async (req, res) => {
  try {
    const { userId, description } = req.body;

    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      picturePath: req.file ? req.file.filename : '',
      userPicturePath: user.picturePath,
      likes: {},
      comments: []
    });
    await newPost.save();

    const post = await Post.find();
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports.getSinglePost = async (req, res) => {
  try {
    const { id } = req.params;
    const singlePost = await Post.findById(id);
    res.status(200).json(singlePost);
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
    let userId;
    // get user's posts
    if (req.params.userId) {
      userId = req.params.userId;
      // get logged in user's posts
    } else {
      userId = req.userId;
    }
    const posts = await Post.find({ userId: userId });
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports.getFriendsPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    const friendsIds = user.friends;
    const friendsPosts = await Post.find({ userId: { $in: friendsIds } }).sort({
      createdAt: -1
    });

    res.status(200).json(friendsPosts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.postComment = async (req, res) => {
  try {
    const { userId, postId, text } = req.body;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: 'Post Not Found' });

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

    const comment = {
      userId,
      text,
      createdAt: formattedDate
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
    const { userId, description } = req.body;
    const { id } = req.params;

    const post = await Post.findById(id);

    if (!post) return res.status(404).json({ message: 'Post Not Found' });

    if (post.userId !== userId)
      return res
        .status(401)
        .json({ message: 'Unauthorized to edit this post' });

    post.description = description;

    if (req.file) {
      post.picturePath = req.file.filename;
    }

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

/* DELETE */
module.exports.deletePost = async (req, res) => {
  try {
    const { userId } = req.body;
    const { id } = req.params;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post Not Found' });
    }
    console.log('Request userId: ', userId);
    console.log('Post userId: ', post.userId);
    console.log('Receieved Token: ', req.headers.authorization);
    if (post.userId !== userId)
      return res
        .status(401)
        .json({ message: 'Unauthorized to delete this post' });

    await Post.findByIdAndDelete(id);
    res.status(200).json({ message: 'Post Delete Successfully', post });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.deleteComment = async (req, res) => {
  try {
    const postId = req.params.id;
    const commentId = req.params.commentId;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const commentIndex = post.comments.findIndex(
      (comment) => comment.userId === commentId
    );

    post.comments.splice(commentIndex, 1);
    await post.save();

    res.status(200).json({ message: 'Comment deleted successfully', post });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
