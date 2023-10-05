import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

const API_URL = process.env.REACT_APP_BASE_URL;

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const [postData, setPostData] = useState({
    description: '',
    picturePath: null
  });

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get(`${API_URL}/posts/${id}`, {
          headers: { Authorization: token }
        });
        const { description, picturePath } = response.data;
        setPostData({ description, picturePath });
      } catch (error) {
        console.log('Error fetching post data: ', error);
      }
    };
    fetchPostData();
  }, [id, token]);

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPostData((prevData) => ({ ...prevData, picturePath: file }));
    }
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('description', postData.description);
    formData.append('userId', user._id);
    if (postData.picturePath) {
      formData.append('picture', postData.picturePath);
    }

    try {
      const response = await axios.put(
        `${API_URL}/posts/edit/${id}`,
        formData,
        {
          headers: {
            Authorization: token,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      // console.log(response.data);

      if (response.status === 200) {
        toast.success('Post Updated!', {
          position: 'top-right'
        });
        setTimeout(() => {
          navigate(`/post/${id}`);
        }, 1000);
      }
    } catch (error) {
      toast.error('Error updating Post', {
        position: 'bottom-right'
      });
      console.log('Error submitting form', error);
    }
  };

  return (
    <div className='h-screen'>
      <div className='flex justify-center text-center p-2'>
        <div className='mt-28 w-[500px] md:w-[700px]'>
          <span className='text-2xl font-bold'>Edit Post</span>
          <div className='mt-12'>
            {postData.picturePath &&
              typeof postData.picturePath !== 'object' && (
                <img
                  src={`${API_URL}/assets/${postData.picturePath}`}
                  alt='Current Post'
                  className='w-full h-[200px] object-cover rounded mb-4'
                />
              )}
            <form onSubmit={handleSubmitForm}>
              <input
                className='my-4 flex'
                type='file'
                name='picturePath'
                onChange={handlePictureChange}
              />
              <textarea
                className='w-full rounded p-3 h-[200px] border-2 border-primary'
                type='text'
                name='description'
                placeholder='Description'
                value={postData.description}
                onChange={(e) =>
                  setPostData({ ...postData, description: e.target.value })
                }
              ></textarea>
              <button className='mt-4 bg-med-rose text-primary font-bold hover:bg-primary w-full rounded-full p-1 hover:text-white'>
                UPDATE
              </button>
            </form>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default EditPost;
