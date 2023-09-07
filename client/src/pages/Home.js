import { useSelector } from 'react-redux';

const Home = () => {
  const user = useSelector((state) => state.user);
  console.log(user);

  return <div>Home {user.firstName} </div>;
};
export default Home;
