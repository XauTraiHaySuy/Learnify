import connectDB from './config/db.js';
import User from './models/User.js';
import bcrypt from 'bcrypt';

const run = async () => {
  await connectDB();
  const admin = await User.findOne({ role: 'admin' });
  if (admin) {
    if (!admin.username) {
      admin.username = 'admin';
    }
    if (!admin.password.startsWith('$2b$')) {
      admin.password = await bcrypt.hash(admin.password, 10);
      console.log('Admin password hashed successfully!');
    }
    await admin.save();
    console.log('Admin user updated!');
  } else {
    console.log('Admin password already hashed or not found.');
  }
  process.exit(0);
};

run();
