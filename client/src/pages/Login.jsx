import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setLogin } from '../features/auth/authSlice';

const API_URL = process.env.REACT_APP_BASE_URL;

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleError = (err) => {
    toast.error(err, {
      position: 'bottom-right'
    });
  };

  const handleSuccess = (msg) => {
    toast.success(msg, {
      position: 'top-right'
    });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password
      });
      if (response) {
        dispatch(
          setLogin({
            user: response.data.user,
            token: response.data.token
          })
        );
        handleSuccess('Login Successful!');
        setTimeout(() => {
          navigate('/');
        }, 1000);
      }
    } catch (error) {
      handleError(error.response.data.message);
      console.log('Login error', error);
    }
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className='flex justify-center p-2 min-h-screen'>
      <div className='md:mt-40 mt-16 text-center md:w-[600px] min-w-screen'>
        <div className='border-2 border-light-rose bg-white rounded-lg p- drop-shadow-sm'>
          <div className='my-12'>
            <span className='text-2xl font-bold '>Login</span>
            <div className='mt-16 mb-10'>
              <form onSubmit={handleSubmitForm}>
                <input
                  className='mt-4 rounded p-1.5 w-[90%] md:w-2/3 text-center border-2 border-light-rose outline-primary drop-shadow-sm'
                  type='text'
                  name='email'
                  placeholder='Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete='username'
                />
                <input
                  className='rounded p-1.5 w-[90%] md:w-2/3 text-center border-2 border-light-rose mt-6 outline-primary drop-shadow-sm'
                  type='password'
                  name='password'
                  placeholder='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete='current-password'
                />
                <div className='mt-6 bg-med-rose rounded p-1.5 w-[90%] md:w-2/3 mx-auto hover:bg-primary hover:text-white drop-shadow-sm'>
                  <button type='submit' className='font-bold tracking-widest'>
                    Login
                  </button>
                </div>
                <div className='flex justify-center gap-2 mt-4'>
                  <h1>Don't have an account?</h1>
                  <Link to='/register' className='font-bold'>
                    Register
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
export default Login;
