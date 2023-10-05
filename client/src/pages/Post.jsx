import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { PiPuzzlePieceFill, PiPuzzlePiece } from 'react-icons/pi';
import { FiEdit } from 'react-icons/fi';
import { setPost } from '../features/auth/authSlice';
import Comments from '../components/Comments';

const API_URL = process.env.REACT_APP_BASE_URL;

const Post = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [postInfo, setPostInfo] = useState(null);
  const [like, setLike] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [comment, setComment] = useState('');
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const handleLikeClick = async () => {
    try {
      const response = await axios.put(
        `${API_URL}/posts/${id}/like`,
        { userId: user._id },
        { headers: { Authorization: token } }
      );

      dispatch(setPost({ post_id: id, post: response.data }));

      const updatedPost = response.data;
      setLike((prevLike) => !prevLike);
      setLikesCount(Object.keys(updatedPost.likes).length);
    } catch (error) {
      console.log('Error liking post: ', error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${API_URL}/posts/${id}/comment`,
        { userId: user.firstName, postId: id, text: comment },
        { headers: { Authorization: token } }
      );

      setComment('');

      setPostInfo(response.data);
    } catch (error) {
      console.log('Error posting comment: ', error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await axios.delete(
        `${API_URL}/posts/${id}/comment/${commentId}`,
        {
          headers: { Authorization: token }
        }
      );
      // console.log('API Response:', response.data);

      setPostInfo(response.data.post);
    } catch (error) {
      console.log('Error deleting comment: ', error);
    }
  };

  useEffect(() => {
    const fetchSinglePost = async () => {
      try {
        const response = await axios.get(`${API_URL}/posts/${id}`, {
          headers: { Authorization: token }
        });
        const fetchedPost = response.data;
        setPostInfo(fetchedPost);

        if (fetchedPost.likes[user._id]) {
          setLike(true);
        }
        setLikesCount(Object.keys(fetchedPost.likes).length);
      } catch (error) {
        console.log('Error fetching single post: ', error);
      }
    };
    fetchSinglePost();
  }, [token, id, user._id]);

  if (!postInfo) {
    return <div>Loading...</div>;
  }
  return (
    <div className='min-h-screen'>
      <div className='w-full flex justify-center'>
        <div key={postInfo._id} className='w-[700px] mt-20 p-4'>
          {postInfo.picturePath && (
            <img
              className='w-full rounded h-[200px] drop-shadow-md'
              src={`${API_URL}/assets/${postInfo.picturePath}`}
              alt='post'
            />
          )}
          <div className='flex justify-between mt-4'>
            <time className='text-sm font-bold'>
              {format(new Date(postInfo.createdAt), 'MMM d, yyyy HH:mm')}
            </time>
            <div className='flex'>
              <img
                className='rounded-full w-[24px] h-[24px] object-cover ring-1 ring-primary'
                src={`${API_URL}/assets/${postInfo.userPicturePath}`}
                alt='user'
              />
              <Link to={`/${postInfo._id}`}>
                <span className='ml-2 text-sm font-bold flex'>
                  {postInfo.firstName}
                </span>
              </Link>
            </div>
          </div>
          <div className='mt-2'>
            <p>{postInfo.description}</p>
          </div>
          <div className='text-right mb-2'>
            {postInfo.firstName === user.firstName && (
              <button onClick={() => navigate(`/editPost/${postInfo._id}`)}>
                <FiEdit />
              </button>
            )}
          </div>
          <div className='text-right'>
            <button onClick={handleLikeClick}>
              <div className='flex items-center'>
                <div className='font-bold text-sm'>{likesCount}</div>
                <div className='ml-1'>
                  {like ? <PiPuzzlePieceFill size={16} /> : <PiPuzzlePiece />}
                </div>
              </div>
            </button>
          </div>
          <div>
            <span>COMMENTS</span>
            <div className='w-full border-2 border-primary rounded p-2'>
              <form onSubmit={handleFormSubmit} className='p-2'>
                <textarea
                  className='w-full p-2 h-[100px]'
                  type='text'
                  name='comment'
                  value={comment}
                  placeholder='Post a comment'
                  onChange={(e) => setComment(e.target.value)}
                />
                <div className='text-right mt-2'>
                  <button
                    type='submit'
                    className='border-2 border-primary rounded-full py-1 px-3 text-sm font-bold'
                  >
                    Post Comment
                  </button>
                </div>
              </form>
              <div className='mt-8'>
                {postInfo.comments.map((comment, index) => (
                  <Comments
                    key={index}
                    comment={comment}
                    user={user}
                    handleDeleteComment={handleDeleteComment}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Post;
