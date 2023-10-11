import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { FaRegComment } from 'react-icons/fa';

const Post = ({ API_URL, post, user }) => {
  const lessDescription = post.description.slice(0, 170);

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
            {user && user._id ? (
              <Link to={`/posts/${post.userId}`}>
                <span className='ml-2 flex'>{post.firstName}</span>
              </Link>
            ) : (
              <Link to='/login'>
                <span className='ml-2 flex'>{post.firstName}</span>
              </Link>
            )}
          </div>
        </div>
        <div className='flex justify-end text-xs font-bold mt-2'>
          <span>{post.location}</span>
        </div>
        <div className='mt-2'>
          <p>{lessDescription}...</p>
          {user && user._id ? (
            <Link to={`/post/${post._id}`}>
              <div className='text-right mt-2'>
                <button className='border-primary border-2 py-1 px-2 text-xs font-bold rounded-full hover:bg-primary hover:text-white'>
                  READ MORE
                </button>
              </div>
            </Link>
          ) : (
            <Link to='/login'>
              <div className='text-right mt-2'>
                <button className='border-primary border-2 py-1 px-2 text-xs font-bold rounded-full hover:bg-primary hover:text-white'>
                  LOGIN TO READ MORE
                </button>
              </div>
            </Link>
          )}

          <div className='flex justify-end gap-2 my-2 text-sm font-bold'>
            {post.comments.length}
            <FaRegComment size={12} className='mt-1' />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Post;
