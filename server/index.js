import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import User from './models/User.js';

dotenv.config();

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
