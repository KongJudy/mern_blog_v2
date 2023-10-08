import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Post from '../components/Post';

const API_URL = process.env.REACT_APP_BASE_URL;

const Home = () => {
  const token = useSelector((state) => state.token);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${API_URL}/posts`, {
          headers: { Authorization: token }
        });
        const sortByNewestPost = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setPosts(sortByNewestPost);
      } catch (error) {
        console.log('Error fetching posts: ', error);
      }
    };
    fetchPosts();
  }, [token]);

  return (
    <div className='flex justify-center min-h-screen'>
      <div className='mt-20 w-[94%]'>
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 md:gap-10 gap-28'>
          {posts.map((post) => (
            <div key={post._id}>
              <Post post={post} API_URL={API_URL} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
