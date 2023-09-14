const express = require('express');
const {
  getFeedPosts,
  getUserPosts,
  likePost,
  getSinglePost
} = require('../controllers/posts');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

/* READ */
router.get('/', verifyToken, getFeedPosts);
router.get('/:id', verifyToken, getSinglePost);
router.get('/:userId/posts', verifyToken, getUserPosts);

/* UPDATE */
router.put('/:id/like', verifyToken, likePost);

module.exports = router;
