const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const multer = require('multer');
const dotenv = require('dotenv');
const path = require('path');
const morgan = require('morgan');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');
const { register } = require('./controllers/auth');
const { verifyToken } = require('./middleware/auth');
const { createPost, editPost } = require('./controllers/posts');

/* CONFIGURATIONS */
dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use('assets', express.static('public/assets'));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  })
);

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/assets');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + path.extname(file.originalname));
  }
});

const uploadMiddleware = multer({ storage }).single('picture');

/* ROUTES WITH FILES */
app.post('/auth/register', uploadMiddleware, register);
app.post('/posts', verifyToken, uploadMiddleware, createPost);
app.put('/posts/edit/:id', verifyToken, uploadMiddleware, editPost);

/* ROUTES */
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/posts', postRoutes);

/* MONGO DATABASE SETUP */
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connected to MongoDB'))
  .then(() => {
    app.listen(PORT, () => console.log(`Listening on Port: ${PORT}`));
  })
  .catch((error) => console.log('Error connecting to MongoDB', error));
