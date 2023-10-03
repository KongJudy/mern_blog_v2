import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { setPosts } from '../features/auth/authSlice';

const API_URL = process.env.REACT_APP_BASE_URL;

const CreatePost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const [inputValues, setInputValues] = useState({
    userId: user._id,
    description: ''
  });
  const [picturePath, setPicturePath] = useState(null);

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPicturePath(file);
    }
  };

  const handleOnChangeInput = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value
    });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

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

    const formData = new FormData();
    formData.append('userId', inputValues.userId);
    formData.append('description', inputValues.description);
    if (picturePath) {
      formData.append('picture', picturePath);
    }

    try {
      const response = await axios.post(`${API_URL}/posts`, formData, {
        headers: {
          Authorization: token,
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.status === 200) {
        const { data } = response;

        dispatch(
          setPosts({
            post: data
          })
        );
        handleSuccess('Post Sent!');
        setTimeout(() => {
          navigate('/');
        }, 1000);
      }
    } catch (error) {
      handleError('Error creating Post');
      console.log('Error submitting form', error);
    }
  };

  return (
    <div className='h-screen'>
      <div className='flex justify-center text-center p-2'>
        <div className='mt-28 w-[500px] md:w-[700px]'>
          <span className='text-2xl font-bold'>Create Post</span>
          <div className='mt-12'>
            <form onSubmit={handleSubmitForm}>
              <textarea
                className='w-full rounded p-3 h-[200px] border-2 border-primary'
                type='text'
                name='description'
                placeholder='Description'
                value={inputValues.description}
                onChange={handleOnChangeInput}
              ></textarea>
              <input
                className='mt-2 flex'
                type='file'
                name='picturePath'
                value={inputValues.picturePath}
                onChange={handlePictureChange}
              />
              <button className='mt-4 bg-med-rose text-primary font-bold hover:bg-primary w-full rounded-full p-1 hover:text-white'>
                POST
              </button>
            </form>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default CreatePost;
