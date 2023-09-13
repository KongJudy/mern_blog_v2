import { format } from 'date-fns';
import { Link } from 'react-router-dom';

const Post = ({ post }) => {
  const API_URL = process.env.REACT_APP_BASE_URL;
  const lessDescription = post.description.slice(0, 190);

  return (
    <div className='h-screen w-auto mt-10'>
      <div key={post._id}>
        {post.picturePath && (
          <img
            className='w-full rounded h-[200px] drop-shadow-md'
            src={`${API_URL}/assets/${post.picturePath}`}
            alt='post'
          />
        )}
        <div className='flex justify-between mt-4'>
          <time className='text-sm font-bold'>
            {format(new Date(post.createdAt), 'MMM d, yyyy HH:mm')}
          </time>
          <div className='flex'>
            <img
              className='rounded-full w-[24px] h-[24px] object-cover ring-1 ring-primary'
              src={`${API_URL}/assets/${post.userPicturePath}`}
              alt='user'
            />
            <Link to={`/${post._id}`}>
              <span className='ml-2 text-sm font-bold flex'>
                {post.firstName}
              </span>
            </Link>
          </div>
        </div>
        <p>{lessDescription}</p>
      </div>
    </div>
  );
};
export default Post;
