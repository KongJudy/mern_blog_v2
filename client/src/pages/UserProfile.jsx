import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Post from '../components/Post';
import axios from 'axios';
import Button from '../components/Button';

const API_URL = process.env.REACT_APP_BASE_URL;

const UserProfile = () => {
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const [currentUserPosts, setCurrentUserPosts] = useState([]);
  const [friendsPosts, setFriendsPosts] = useState([]);
  const [friendsInfo, setFriendsInfo] = useState([]);
  const [showConnections, setShowConnections] = useState(false);
  const [showUserPosts, setShowUserPosts] = useState(true);
  const [showFriendsPosts, setShowFriendsPosts] = useState(false);

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

    const fetchUserFriends = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/users/${user._id}/friends`,
          {
            headers: { Authorization: token }
          }
        );
        setFriendsInfo(response.data);
        console.log(response.data);
      } catch (error) {
        console.log('Error fetching user friends: ', error);
      }
    };

    const fetchFriendsPosts = async () => {
      const response = await axios.get(
        `${API_URL}/posts/${user._id}/friendsPosts`,
        {
          headers: { Authorization: token }
        }
      );
      setFriendsPosts(response.data);
    };

    fetchCurrentUserPosts();
    fetchUserFriends();
    fetchFriendsPosts();
  }, [token, user._id]);

  useEffect(() => {
    if (showConnections) {
      setShowUserPosts(false);
      setShowFriendsPosts(false);
    } else if (showFriendsPosts) {
      setShowConnections(false);
      setShowUserPosts(false);
    } else {
      setShowUserPosts(true);
    }
  }, [showConnections, showFriendsPosts]);

  const handleDisplay = (type) => {
    setShowConnections(type === 'Connections');
    setShowUserPosts(type === 'User');
    setShowFriendsPosts(type === 'Friends');
  };

  return (
    <div className='flex justify-center min-h-screen'>
      <div className='mt-20 w-[94%] lg:w-[40%]'>
        <div className='lg:flex lg:justify-center lg:gap-4 text-center mt-4'>
          <div className='mb-2'>
            <Button
              label='Connections'
              onClick={() => handleDisplay('Connections')}
            />
          </div>
          <div className='mb-2'>
            <Button label='Your Posts' onClick={() => handleDisplay('User')} />
          </div>
          <Button
            label='Friends Posts'
            onClick={() => handleDisplay('Friends')}
          />
        </div>
        {showConnections && (
          <div className='mt-10'>
            <span>Your Connections:</span>
            <div>
              {friendsInfo.map((friend) => (
                <div key={friend._id}>
                  {friend.firstName}, {friend.location}
                </div>
              ))}
            </div>
          </div>
        )}
        {showUserPosts && (
          <div className='mt-10'>
            <div className='text-center'>
              <span className='font-bold text-2xl mt-4'>Your Posts</span>
            </div>
            <div className='grid grid-cols-1 gap-28 md:gap-16'>
              {currentUserPosts.map((post) => (
                <div key={post._id}>
                  <Post post={post} API_URL={API_URL} />
                </div>
              ))}
            </div>
          </div>
        )}
        {showFriendsPosts && (
          <div className='mt-10'>
            <div className='text-center'>
              <span className='font-bold text-2xl mt-4'>Friends Posts</span>
            </div>
            <div className='grid grid-cols-1 gap-28 md:gap-16'>
              {friendsPosts.map((post) => (
                <div key={post._id}>
                  <Post post={post} API_URL={API_URL} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
