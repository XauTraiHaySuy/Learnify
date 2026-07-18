import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import User from './models/User.js';
import { OAuth2Client } from 'google-auth-library';
import bcrypt from 'bcrypt';
import { sendApprovalEmail, sendRejectionEmail } from './utils/emailService.js';
import courseRoutes from './routes/courseRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Adjust appropriately for production
    methods: ["GET", "POST"]
  }
});

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Routes
app.use('/api/courses', courseRoutes);

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ 
      $or: [
        { username: { $regex: new RegExp(`^${username}$`, 'i') } },
        { email: { $regex: new RegExp(`^${username}$`, 'i') } }
      ] 
    });

    if (!user) {
      return res.status(401).json({ message: 'Tài khoản không tồn tại!' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Sai mật khẩu!' });
    }

    if (user.role === 'instructor' && user.status === 'pending') {
      return res.status(403).json({ message: 'Tài khoản của bạn đang chờ xét duyệt. Vui lòng kiểm tra email sau.' });
    }
    
    if (user.status === 'banned') {
      return res.status(403).json({ message: 'Tài khoản của bạn đã bị từ chối/khóa.' });
    }

    // Success
    res.json({
      message: 'Đăng nhập thành công',
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
        email: user.email,
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Lỗi server!' });
  }
});

app.post('/api/auth/google', async (req, res) => {
  try {
    const { access_token } = req.body;
    if (!access_token) {
      return res.status(400).json({ message: 'Missing access_token' });
    }

    const userInfoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${access_token}` }
    });

    if (!userInfoRes.ok) {
      throw new Error('Failed to fetch user info with access_token');
    }

    const payload = await userInfoRes.json();
    const email = payload.email;
    const name = payload.name;
    // Bỏ tham số kích thước của Google URL để lấy ảnh gốc (giữ nguyên định dạng GIF nếu có)
    let picture = payload.picture;
    if (picture && picture.includes('=')) {
      picture = picture.split('=')[0];
    }

    const user = await User.findOne({ email });

    if (user) {
      if (user.role === 'instructor' && user.status === 'pending') {
        return res.status(403).json({ message: 'Tài khoản của bạn đang chờ xét duyệt. Vui lòng kiểm tra email sau.' });
      }
      
      if (user.status === 'banned') {
        return res.status(403).json({ message: 'Tài khoản của bạn đã bị từ chối/khóa.' });
      }

      // Đã có tài khoản -> Đăng nhập thành công
      return res.json({
        status: 'exists',
        message: 'Đăng nhập thành công',
        user: {
          id: user._id,
          name: user.name,
          role: user.role,
          email: user.email,
        },
        googleAvatar: picture,
        googleEmail: payload.email
      });
    } else {
      // Chưa có tài khoản -> Chuyển hướng tới trang đăng ký
      return res.json({
        status: 'new',
        message: 'Tài khoản chưa tồn tại, vui lòng đăng ký',
        payload: {
          email,
          name,
          picture: picture
        }
      });
    }
  } catch (error) {
    console.error('Google Auth Error:', error);
    res.status(500).json({ message: 'Lỗi xác thực Google!' });
  }
});

app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, name, email, password, role } = req.body;
    
    // Validate
    if (!username || !name || !email || !password) {
      return res.status(400).json({ message: 'Vui lòng nhập đầy đủ thông tin' });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(400).json({ message: 'Email đã được sử dụng' });
      }
      return res.status(400).json({ message: 'Tên đăng nhập đã tồn tại' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    let userRole = role || 'student';
    let userStatus = 'active';
    
    if (userRole === 'teacher') {
      userRole = 'instructor';
    }
    if (userRole === 'instructor') {
      userStatus = 'pending';
    }

    const newUser = new User({
      username,
      name,
      email,
      password: hashedPassword,
      role: userRole,
      status: userStatus
    });

    await newUser.save();

    if (userRole === 'instructor') {
      // Emit socket event
      io.emit('newTeacherRegistered', {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        subject: newUser.subject || 'Chưa cập nhật',
        status: newUser.status,
        role: newUser.role
      });

      return res.status(201).json({
        message: 'đăng ký tài khoản thành công chờ xét duyệt chúng tôi sẽ gửi thông báo xét duyệt thành công cho bạn vào gmail',
        user: {
          id: newUser._id,
          name: newUser.name,
          role: newUser.role
        }
      });
    }

    res.status(201).json({
      message: 'Đăng ký thành công',
      user: {
        id: newUser._id,
        name: newUser.name,
        role: newUser.role
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Lỗi server khi đăng ký' });
  }
});

const PORT = process.env.PORT || 5000;

// Admin Routes
app.get('/api/admin/pending-teachers/count', async (req, res) => {
  try {
    const count = await User.countDocuments({ role: 'instructor', status: 'pending' });
    res.json({ count });
  } catch (error) {
    console.error('Error fetching pending teachers count:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
});

app.get('/api/admin/pending-teachers', async (req, res) => {
  try {
    const pendingTeachers = await User.find({ role: 'instructor', status: 'pending' }).select('-password');
    res.json(pendingTeachers);
  } catch (error) {
    console.error('Error fetching pending teachers:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
});

app.post('/api/admin/approve-teacher/:id', async (req, res) => {
  try {
    const plainPassword = Math.random().toString(36).slice(-8) + 'A1!';
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    
    const user = await User.findByIdAndUpdate(req.params.id, { 
      status: 'active',
      password: hashedPassword 
    }, { new: true });
    
    if (!user) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng' });
    }
    
    // Send email asynchronously
    sendApprovalEmail(user.email, user.name, user.username, plainPassword);
    
    // Emit event to update pending count
    io.emit('teacherStatusUpdated', { id: user._id, status: 'active' });
    
    res.json({ message: 'Đã phê duyệt thành công', user });
  } catch (error) {
    console.error('Error approving teacher:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
});

app.post('/api/admin/reject-teacher/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { status: 'banned' }, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng' });
    }
    
    // Send email asynchronously
    sendRejectionEmail(user.email, user.name);
    
    // Emit event to update pending count
    io.emit('teacherStatusUpdated', { id: user._id, status: 'banned' });
    
    res.json({ message: 'Đã từ chối thành công', user });
  } catch (error) {
    console.error('Error rejecting teacher:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
