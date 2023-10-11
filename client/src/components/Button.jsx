import { Link } from 'react-router-dom';

const Button = ({ label, onClick, to }) => {
  return (
    <div>
      {to ? (
        <Link
          className='border-2 border-primary text-primary font-bold hover:bg-primary rounded px-2 py-1 hover:text-white'
          to={to}
        >
          {label}
        </Link>
      ) : (
        <button
          className='border-2 border-primary text-primary font-bold hover:bg-primary rounded px-2 py-1 hover:text-white'
          onClick={onClick}
        >
          {label}
        </button>
      )}
    </div>
  );
};

export default Button;
