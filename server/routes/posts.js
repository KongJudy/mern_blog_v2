const express = require('express');
const {
  getFeedPosts,
  getUserPosts,
  likePost,
  getSinglePost,
  postComment,
  deleteComment
} = require('../controllers/posts');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

/* CREATE */
router.post('/:id/comment', verifyToken, postComment);

/* READ */
router.get('/', verifyToken, getFeedPosts);
router.get('/:id', verifyToken, getSinglePost);
router.get('/:userId/posts', verifyToken, getUserPosts);

/* UPDATE */
router.put('/:id/like', verifyToken, likePost);

/*DELETE */
router.delete('/:id/comment/:commentId/', verifyToken, deleteComment);

module.exports = router;
