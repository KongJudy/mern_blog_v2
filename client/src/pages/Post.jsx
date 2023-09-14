import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import axios from 'axios';
import { useSelector } from 'react-redux';

const API_URL = process.env.REACT_APP_BASE_URL;

const Post = () => {
  const { id } = useParams();
  const [postInfo, setPostInfo] = useState(null);
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  useEffect(() => {
    const fetchSinglePost = async () => {
      try {
        const response = await axios.get(`${API_URL}/posts/${id}`, {
          headers: { Authorization: token }
        });
        const fetchedPosts = response.data;
        setPostInfo(fetchedPosts);
      } catch (error) {
        console.log('Error fetching single post: ', error);
      }
    };
    fetchSinglePost();
  }, [token, id]);

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
        </div>
      </div>
    </div>
  );
};
export default Post;
