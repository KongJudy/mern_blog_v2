import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import EditPost from './pages/EditPost';
import UserPosts from './pages/UserPosts';
import UserProfile from './pages/UserProfile';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/createPost' element={<CreatePost />} />
        <Route path='/user/:userId' element={<UserProfile />} />
        <Route path='/post/:id' element={<Post />} />
        <Route path='/editPost/:id' element={<EditPost />} />
        <Route path='/posts/:userId' element={<UserPosts />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
