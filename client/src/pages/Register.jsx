import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const API_URL = process.env.REACT_APP_BASE_URL;

const Register = () => {
  const navigate = useNavigate();
  const [inputValues, setInputValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    location: ''
  });
  const [picturePath, setPicturePath] = useState(null);

  const handleOnChangeInput = (e) => {
    const { name, value } = e.target;

    setInputValues({
      ...inputValues,
      [name]: value
    });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPicturePath(file);
    }
  };

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

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append(
      'firstName',
      inputValues.firstName.charAt(0).toUpperCase() +
        inputValues.firstName.slice(1).toLowerCase()
    );
    formData.append(
      'lastName',
      inputValues.lastName.charAt(0).toUpperCase() +
        inputValues.lastName.slice(1).toLowerCase()
    );
    formData.append(
      'location',
      inputValues.location.charAt(0).toUpperCase() +
        inputValues.location.slice(1).toLowerCase()
    );
    formData.append('email', inputValues.email);
    formData.append('password', inputValues.password);
    if (picturePath) {
      formData.append('picture', picturePath);
    }

    try {
      const response = await axios.post(`${API_URL}/auth/register`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response) {
        handleSuccess('Registration Successful!');
        setTimeout(() => {
          navigate('/login');
        }, 1000);
      }
    } catch (error) {
      handleError(error.response.data.message);
      console.log('Error submitting form', error);
    }
  };

  return (
    <div className='flex justify-center p-2 min-h-screen'>
      <div className='md:mt-40 mt-16 text-center md:w-[600px] min-w-screen'>
        <div className='border-2 border-light-rose md:h-[640px] h-full bg-white rounded-lg p- drop-shadow-sm'>
          <div className='mt-12'>
            <span className='text-2xl font-bold '>Register</span>
          </div>
          <div className='mt-16 mb-10'>
            <form onSubmit={handleSubmitForm}>
              <input
                className='mt-4 rounded-full p-1.5 w-[90%] md:w-2/3 text-center border-2 border-light-rose outline-primary'
                type='text'
                name='firstName'
                placeholder='First Name'
                value={inputValues.firstName}
                onChange={handleOnChangeInput}
              />
              <input
                className='mt-4 rounded-full p-1.5 w-[90%] md:w-2/3 text-center border-2 border-light-rose outline-primary'
                type='text'
                name='lastName'
                placeholder='Last Name'
                value={inputValues.lastName}
                onChange={handleOnChangeInput}
              />
              <input
                className='mt-4 rounded-full p-1.5 w-[90%] md:w-2/3 text-center border-2 border-light-rose outline-primary'
                type='text'
                name='location'
                placeholder='Location'
                value={inputValues.location}
                onChange={handleOnChangeInput}
              />
              <div className='mt-4 p-2 text-center w-[90%] md:w-2/3 mx-auto'>
                Avatar:
                <input
                  className='p-1.5 w-full'
                  type='file'
                  name='picturePath'
                  onChange={handleAvatarChange}
                />
              </div>
              <input
                className='mt-4 rounded-full p-1.5 w-[90%] md:w-2/3 text-center border-2 border-light-rose outline-primary'
                type='text'
                name='email'
                placeholder='Email'
                value={inputValues.email}
                onChange={handleOnChangeInput}
              />
              <input
                className='mt-4 rounded-full p-1.5 w-[90%] md:w-2/3 text-center border-2 border-light-rose outline-primary'
                type='password'
                name='password'
                placeholder='Password'
                value={inputValues.password}
                onChange={handleOnChangeInput}
              />
              <div className='mt-6 bg-med-rose rounded-full p-1.5 w-[90%] md:w-2/3 mx-auto hover:bg-primary hover:text-white'>
                <button type='submit' className='font-bold tracking-widest'>
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
