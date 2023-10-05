import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import EditPost from './pages/EditPost';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/createPost' element={<CreatePost />} />
        <Route path='/profile/:userId' element={<Profile />} />
        <Route path='/post/:id' element={<Post />} />
        <Route path='/editPost/:id' element={<EditPost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
