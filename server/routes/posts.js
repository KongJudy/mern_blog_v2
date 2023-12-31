const express = require('express');
const {
  getFeedPosts,
  getUserPosts,
  likePost,
  getSinglePost,
  postComment,
  deleteComment,
  deletePost,
  getFriendsPosts
} = require('../controllers/posts');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

/* CREATE */
router.post('/:id/comment', verifyToken, postComment);

/* READ */
router.get('/', getFeedPosts);
router.get('/:id', verifyToken, getSinglePost);
router.get('/:userId/posts', verifyToken, getUserPosts);
router.get('/:userId/friendsPosts', verifyToken, getFriendsPosts);

/* UPDATE */
router.put('/:id/like', verifyToken, likePost);

/*DELETE */
router.delete('/:id', verifyToken, deletePost);
router.delete('/:id/comment/:commentId/', verifyToken, deleteComment);

module.exports = router;
