import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import User from './models/User.js';
import courseRoutes from './routes/courseRoutes.js';
import { createServer } from 'http';
import { Server } from 'socket.io';
import Comment from './models/Comment.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Routes
app.use('/api/courses', courseRoutes);

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Use name as username
    const user = await User.findOne({ name: username });

    if (!user) {
      return res.status(401).json({ message: 'Tài khoản không tồn tại!' });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: 'Sai mật khẩu!' });
    }

    // Success
    res.json({
      message: 'Đăng nhập thành công',
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Lỗi server!' });
  }
});

// Socket.io integration for real-time comments
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Join a course room
  socket.on('join_lecture', (courseId) => {
    socket.join(courseId);
    console.log(`User ${socket.id} joined lecture ${courseId}`);
  });

  // Handle new comment
  socket.on('send_comment', async (data) => {
    try {
      const { course_id, user_id, text, parent_id } = data;
      
      // Save comment to DB
      const newComment = new Comment({
        course_id,
        user_id,
        text,
        parent_id: parent_id || null
      });
      await newComment.save();
      
      // Populate user info to send back to clients
      const populatedComment = await Comment.findById(newComment._id).populate('user_id', 'name role');
      
      // Emit to all users in the same lecture room
      io.to(course_id).emit('new_comment', populatedComment);
    } catch (error) {
      console.error('Error saving socket comment:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
