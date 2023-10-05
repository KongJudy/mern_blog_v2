import { format } from 'date-fns';
import { Link } from 'react-router-dom';

const Post = ({ post }) => {
  const API_URL = process.env.REACT_APP_BASE_URL;
  const lessDescription = post.description.slice(0, 190);

  return (
    <div className='mt-10 h-[300px] mb-12'>
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
          <div className='flex text-sm font-bold '>
            <img
              className='rounded-full w-[24px] h-[24px] object-cover ring-1 ring-primary'
              src={`${API_URL}/assets/${post.userPicturePath}`}
              alt='user'
            />
            <Link to={`/${post._id}`}>
              <span className='ml-2 flex'>{post.firstName}</span>
            </Link>
          </div>
        </div>
        <div className='mt-2'>
          <p>{lessDescription}</p>
          <Link to={`/post/${post._id}`}>
            <div className='text-right'>
              <button className='border-primary border-2 py-1 px-2 text-xs font-bold rounded-full'>
                READ MORE
              </button>
            </div>
          </Link>
          <div className='text-right my-2 text-sm font-bold'>
            {post.comments.length}
            {post.comments.length === 1 ? (
              <span className='mx-2'>Comment</span>
            ) : (
              <span className='mx-2'>Comments</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Post;
