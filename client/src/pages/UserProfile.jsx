import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Post from '../components/Post';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BASE_URL;

const UserProfile = () => {
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const [currentUserPosts, setCurrentUserPosts] = useState([]);

  useEffect(() => {
    const fetchCurrentUserPosts = async () => {
      try {
        const response = await axios.get(`${API_URL}/posts/${user._id}/posts`, {
          headers: { Authorization: token }
        });
        const sortByNewestPost = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setCurrentUserPosts(sortByNewestPost);
      } catch (error) {
        console.log('Error fetching your posts: ', error);
      }
    };
    fetchCurrentUserPosts();
  }, [token, user._id]);

  return (
    <div className='flex justify-center min-h-screen'>
      <div className='mt-20 w-[94%] lg:w-[40%]'>
        <span className='flex justify-center font-bold text-2xl mt-4'>
          Your Posts
        </span>
        <div className='grid grid-cols-1 gap-20'>
          {currentUserPosts.map((post) => (
            <div key={post._id}>
              <Post post={post} API_URL={API_URL} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
