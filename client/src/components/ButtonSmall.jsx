import { Link } from 'react-router-dom';

const ButtonSmall = ({ label, onClick, to }) => {
  return (
    <div>
      {to ? (
        <Link
          className='border-2 border-primary text-primary font-bold hover:bg-primary rounded px-2 py-1 hover:text-white text-xs'
          to={to}
        >
          {label}
        </Link>
      ) : (
        <button
          className='border-2 border-primary text-primary font-bold hover:bg-primary rounded px-2 py-1 hover:text-white text-xs'
          onClick={onClick}
        >
          {label}
        </button>
      )}
    </div>
  );
};

export default ButtonSmall;
