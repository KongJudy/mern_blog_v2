import axios from 'axios';
import { useEffect, useState } from 'react';
import Post from '../components/Post';
import { useSelector } from 'react-redux';

const API_URL = process.env.REACT_APP_BASE_URL;

const Home = () => {
  const [posts, setPosts] = useState([]);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${API_URL}/posts`);
        const sortByNewestPost = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setPosts(sortByNewestPost);
      } catch (error) {
        console.log('Error fetching posts: ', error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className='flex justify-center min-h-screen'>
      <div className='mt-20 w-[94%]'>
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 md:gap-y-20 gap-28'>
          {posts.map((post) => (
            <div key={post._id}>
              <Post post={post} API_URL={API_URL} user={user} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
