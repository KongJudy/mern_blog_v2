import { useEffect, useState } from 'react';
import Post from '../components/Post';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import UserProfileData from '../components/UserProfileData';
import { setFriends } from '../features/auth/authSlice';

const API_URL = process.env.REACT_APP_BASE_URL;

const UserPosts = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [userData, setUserData] = useState([]);
  const [isFriend, setIsFriend] = useState(false);

  useEffect(() => {
    // User's posts
    const fetchUserPosts = async () => {
      try {
        const response = await axios.get(`${API_URL}/posts/${userId}/posts`, {
          headers: { Authorization: token }
        });
        const sortByNewestPost = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setUserPosts(sortByNewestPost);
      } catch (error) {
        console.log(`Error fetching user's posts: `, error.response);
      }
    };
    // user data
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${API_URL}/users/${userId}`, {
          headers: { Authorization: token }
        });
        setUserData(response.data);

        if (!isFriend) {
          const isFriend = response.data.friends.includes(user._id);
          setIsFriend(isFriend);
        }
      } catch (error) {
        console.log('Error fecthing user data: ', error.response);
      }
    };
    fetchUserPosts();
    fetchUserData();
  }, [token, userId, isFriend, user._id]);

  const handleConnectFriend = async () => {
    try {
      const response = await axios.put(
        `${API_URL}/users/${user._id}/${userId}`,
        null,
        {
          headers: { Authorization: token }
        }
      );
      dispatch(setFriends({ friends: response.data }));
      setIsFriend(!isFriend);
    } catch (error) {
      console.log('Error handling adding friend: ', error);
    }
  };

  return (
    <div className='flex justify-center min-h-screen'>
      <div className='mt-20 w-[94%] md:[84%] lg:[80%] xl:w-[52%]'>
        <div className='md:flex gap-20'>
          <div>
            <UserProfileData
              userData={userData}
              userPosts={userPosts}
              API_URL={API_URL}
              handleConnectFriend={handleConnectFriend}
              isFriend={isFriend}
              user={user}
            />
          </div>
          <div className='w-[98%]'>
            <div className='grid grid-cols-1'>
              {userPosts.map((post) => (
                <div key={post._id}>
                  <Post post={post} API_URL={API_URL} user={user} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPosts;
