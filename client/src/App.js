import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import CreatePost from './pages/CreatePost';

function App() {
  return (
    <div className='bg-light-rose'>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/createPost' element={<CreatePost />} />
          <Route path='/profile/:userId' element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
