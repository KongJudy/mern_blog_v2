const UserProfileData = ({
  userData,
  userPosts,
  handleConnectFriend,
  API_URL,
  isFriend,
  user
}) => {
  //used in case loading of image takes longer to
  const userImage = userData.picturePath
    ? `${API_URL}/assets/${userData.picturePath}`
    : '';
  //checking if logged in user is the same as the profile
  const currentUser = user._id === userData._id;

  return (
    <div className='mt-10 flex justify-center border-2 border-primary rounded p-6'>
      <div className='font-bold text-center'>
        <div className='flex gap-4 justify-center'>
          <img
            className='rounded-full w-[32px] h-[32px] object-cover ring-2 ring-primary'
            src={userImage}
            alt='user'
          />
          <span className='flex items-center text-lg'>
            {userData.firstName}
          </span>
        </div>
        <div className='mt-2 flex justify-center'>
          <span className='mr-2'>Location:</span>
          {userData.location}
        </div>
        <div>
          <span className='mr-2'>Posts created:</span>
          {userPosts.length}
        </div>
        <div>
          <span className='mr-2'>Connections:</span>
          {userData.friends ? userData.friends.length : 0}
        </div>
        {!currentUser ? (
          isFriend ? (
            <button
              onClick={handleConnectFriend}
              className='mt-1 bg-med-rose text-primary font-bold hover:bg-primary w-[60%] rounded-full p-1 hover:text-white'
            >
              Connect
            </button>
          ) : (
            <button
              onClick={handleConnectFriend}
              className='mt-1 bg-primary font-bold text-white w-[60%] rounded-full p-1 hover:bg-med-rose hover:text-primary'
            >
              Connected
            </button>
          )
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default UserProfileData;
