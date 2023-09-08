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
    <nav className='w-full shadow-md bg-white z-10 fixed'>
      <div className='flex text-2xl px-8'>
        <div className='text-primary py-4 flex'>
          <Link to='/' className='flex'>
            Connect
            <PiPuzzlePieceFill
              color='#463c3c'
              className='mt-1 ml-2 rotate-45'
            />
          </Link>
        </div>
        <div className='text-2xl mt-2 ml-auto text-primary flex justify-center relative md:mr-20'>
          <div
            className={`md:flex md:justify-normal mt-14 text-right rounded absolute right-12 md:bg-white md:mt-0 md:p-0 ${
              menuOpen ? 'block' : 'hidden'
            }`}
          >
            <div className='md:flex md:gap-4 md:mt-2 md:p-0 p-4 rounded bg-white md:w-[200px] w-full text-center'>
              <MenuItem to='/' label='Home' />
              {user ? (
                <>
                  <div className='md:flex md:mr-4'>
                    {avatar ? (
                      <img
                        className='hidden md:block rounded-full w-[28px] h-[28px] mt-1'
                        src={avatar}
                        alt='user profile'
                      />
                    ) : null}
                    <MenuItem to='/profile/userId' label={user.firstName} />
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
          <div className='block md:hidden justify-end items-center'>
            <Fade
              size={20}
              toggled={menuOpen}
              toggle={setMenuOpen}
              easing='ease-in'
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
