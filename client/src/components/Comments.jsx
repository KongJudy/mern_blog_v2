import { AiFillDelete } from 'react-icons/ai';

const Comments = ({ comment, user, handleDeleteComment }) => {
  return (
    <div className='w-full border-primary border-2 p-2 rounded mb-2'>
      <div className='flex justify-between'>
        <span className='font-bold'>{comment.createdAt}</span>
        {comment.userId === user.firstName && (
          <button onClick={() => handleDeleteComment(comment._id)}>
            <AiFillDelete />
          </button>
        )}
      </div>
      <p>{comment.text}</p>
      <p className='text-right font-bold'>Posted by: {comment.userId}</p>
    </div>
  );
};

export default Comments;
