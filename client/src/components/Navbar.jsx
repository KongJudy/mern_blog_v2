import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setLogout } from '../features/auth/authSlice';
import { useState } from 'react';
import { Fade } from 'hamburger-react';
import { PiPuzzlePieceFill } from 'react-icons/pi';

const API_URL = process.env.REACT_APP_BASE_URL;

const MenuItem = ({ to, label, onClick }) => (
  <div className='hover:bg-primary hover:rounded hover:text-white px-2'>
    {to ? (
      <Link to={to}>{label}</Link>
    ) : (
      <button onClick={onClick}>{label}</button>
    )}
  </div>
);

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [menuOpen, setMenuOpen] = useState(false);
  const avatar =
    user && user.picturePath ? `${API_URL}/assets/${user.picturePath}` : null;

  const handleLogout = () => {
    dispatch(
      setLogout({
        user: '',
        token: ''
      })
    );
  };

  return (
    <nav className='bg-white fixed z-10 w-full flex justify-between py-4 px-6 shadow-md'>
      <div className='text-primary font-extrabold flex'>
        <Link to='/' className='flex text-3xl'>
          Connect
          <PiPuzzlePieceFill color='#463c3c' className='mt-1 ml-2 rotate-45' />
        </Link>
      </div>
      <div
        className={`${
          menuOpen ? 'block' : 'hidden'
        } md:flex font-bold mt-10 md:mt-0 text-end
        }`}
      >
        <div className='md:flex md:items-center gap-4'>
          <MenuItem to='/' label='Home' />
          {user ? (
            <>
              <MenuItem to='/createPost' label='Create Post' />
              <div className='md:flex md:items-center text-right'>
                {avatar ? (
                  <img
                    className='hidden md:block rounded-full w-[28px] h-[28px] mt-1 mr-2 object-cover ring-2 ring-primary'
                    src={avatar}
                    alt='user profile'
                  />
                ) : null}
                <div>
                  <MenuItem
                    to={`/profile/${user._id}`}
                    label={user.firstName}
                  />
                </div>
              </div>

              <MenuItem label='Logout' onClick={handleLogout} />
            </>
          ) : (
            <>
              <MenuItem to='/login' label='Login' />
              <MenuItem to='/register' label='Register' />
            </>
          )}
        </div>
      </div>
      <div className='block md:hidden absolute right-2 top-3'>
        <Fade
          size={18}
          toggled={menuOpen}
          toggle={setMenuOpen}
          easing='ease-in'
        />
      </div>
    </nav>
  );
};

export default Navbar;
