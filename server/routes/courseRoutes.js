import express from 'express';
import mongoose from 'mongoose';
import Course from '../models/Course.js';
import User from '../models/User.js';
import Transaction from '../models/Transaction.js';
import Comment from '../models/Comment.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Multer Config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/videos/'); // Ensure this folder exists
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 30 * 1024 * 1024 } // 30MB limit
}).fields([{ name: 'video', maxCount: 1 }, { name: 'document', maxCount: 1 }]);

// POST /api/courses
router.post('/', (req, res) => {
  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ message: 'Dung lượng video vượt quá 30MB. Vui lòng nâng cấp gói Premium để tải lên file lớn hơn!' });
      }
      return res.status(400).json({ message: 'Lỗi tải lên file: ' + err.message });
    } else if (err) {
      return res.status(500).json({ message: 'Lỗi server khi tải lên file.' });
    }

    try {
      const { title, level, subject, instructor, thumbnail } = req.body;
      
      if (!req.files || (!req.files.video && !req.files.document)) {
        return res.status(400).json({ message: 'Không có file nào được tải lên.' });
      }
      
      let videoUrl = '';
      let documentUrl = '';

      if (req.files.video) {
        videoUrl = `http://localhost:5000/uploads/videos/${req.files.video[0].filename}`;
      }
      if (req.files.document) {
        documentUrl = `http://localhost:5000/uploads/videos/${req.files.document[0].filename}`;
      }
      
      // Let's use a dummy instructor ID if not provided, for demo purpose, or require it
      // Actually, since we need to save to DB, let's just use what's provided or find a default one
      let instructorId = instructor;
      if (!instructorId) {
        // Find any user to be the instructor if not provided, just so it doesn't crash
        const user = await User.findOne();
        instructorId = user ? user._id : null;
      }
      
      const newCourse = new Course({
        title,
        level,
        subject,
        videoUrl,
        documentUrl,
        thumbnail: thumbnail || '',
        instructor: instructorId
      });

      await newCourse.save();

      res.status(201).json(newCourse);
    } catch (error) {
      console.error('Error creating course:', error);
      res.status(500).json({ message: 'Server error creating course.' });
    }
  });
});

// GET /api/courses
router.get('/', async (req, res) => {
  try {
    const { role, instructor } = req.query;
    let query = {};
    if (role !== 'instructor' && !instructor) {
      query.isPrivate = { $ne: true };
    } else if (instructor) {
      query.instructor = instructor;
    }

    const courses = await Course.find(query).populate('instructor', 'name');
    res.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ message: 'Server error fetching courses.' });
  }
});

// PUT /api/courses/:id
router.put('/:id', async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ msg: 'ID không hợp lệ' });
  try {
    const courseId = req.params.id;
    const updateData = req.body;
    
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { $set: updateData },
      { new: true }
    );
    
    if (!updatedCourse) return res.status(404).json({ message: 'Course not found' });
    res.json(updatedCourse);
  } catch (error) {
    console.error('Error updating course:', error);
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/courses/:id/toggle-privacy
router.put('/:id/toggle-privacy', async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ msg: 'ID không hợp lệ' });
  try {
    const courseId = req.params.id;
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    
    course.isPrivate = !course.isPrivate;
    await course.save();
    
    res.json(course);
  } catch (error) {
    console.error('Error toggling privacy:', error);
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/courses/:id
router.delete('/:id', async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ msg: 'ID không hợp lệ' });
  try {
    const courseId = req.params.id;
    const course = await Course.findById(courseId);
    
    if (!course) return res.status(404).json({ message: 'Course not found' });

    // Lấy đường dẫn file video/document vật lý
    if (course.videoUrl) {
      // Vì videoUrl đang lưu dưới dạng http://localhost:5000/uploads/videos/...
      // Nên ta trích xuất lấy phần pathname (/uploads/videos/...)
      try {
        const urlObj = new URL(course.videoUrl);
        const filePath = path.join(__dirname, '..', urlObj.pathname);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      } catch (err) {
        // Fallback nếu lưu dưới dạng relative path
        const filePath = path.join(__dirname, '..', course.videoUrl);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
    }

    if (course.documentUrl) {
       try {
        const urlObj = new URL(course.documentUrl);
        const filePath = path.join(__dirname, '..', urlObj.pathname);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      } catch (err) {
        const filePath = path.join(__dirname, '..', course.documentUrl);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
    }

    await Course.findByIdAndDelete(courseId);
    
    res.json({ message: 'Course and related files deleted successfully' });
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET /api/courses/:id/instructor-stats
router.get('/:id/instructor-stats', async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ msg: 'ID không hợp lệ' });
  try {
    const courseId = req.params.id;
    const course = await Course.findById(courseId).populate('instructor', 'name');
    if (!course) return res.status(404).json({ message: 'Course not found' });

    const instructorId = course.instructor._id;
    const instructorCourses = await Course.find({ instructor: instructorId });
    const courseIds = instructorCourses.map(c => c._id);

    const transactions = await Transaction.find({
      course_id: { $in: courseIds },
      status: 'success'
    });

    const uniqueStudents = new Set(transactions.map(t => t.student_id.toString()));

    res.json({
      instructorName: course.instructor.name,
      totalStudents: uniqueStudents.size
    });
  } catch (error) {
    console.error('Error fetching instructor stats:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET /api/courses/:id/related
router.get('/:id/related', async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ msg: 'ID không hợp lệ' });
  try {
    const courseId = req.params.id;
    const currentCourse = await Course.findById(courseId);
    if (!currentCourse) return res.status(404).json({ message: 'Course not found' });

    const subject = currentCourse.subject;
    if (!subject) return res.json([]);

    const relatedCourses = await Course.find({ subject, _id: { $ne: currentCourse._id } })
                                       .populate('instructor', 'name').limit(5);
    
    let relatedMaterials = relatedCourses.map(c => ({
      _id: c._id,
      title: c.title,
      url: c.videoUrl,
      views: c.views || 0,
      instructor: c.instructor.name
    }));

    res.json(relatedMaterials);
  } catch (error) {
    console.error('Error fetching related courses:', error);
    res.status(500).json({ error: error.message });
  }
});

// POST /api/courses/:id/view
router.post('/:id/view', async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ msg: 'ID không hợp lệ' });
  try {
    const courseId = req.params.id;
    const { viewerId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    
    if (course.isPrivate === true) {
      return res.status(400).json({ message: 'Không thể tăng view cho khóa học private' });
    }

    if (viewerId && String(viewerId) === String(course.instructor._id || course.instructor)) {
      return res.status(400).json({ message: 'Không thể tăng view cho tác giả' });
    }

    course.views = (course.views || 0) + 1;
    await course.save();
    
    return res.status(200).json({ views: course.views });
  } catch (error) {
    console.error('Error updating view:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET /api/courses/:id/comments
router.get('/:id/comments', async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ msg: 'ID không hợp lệ' });
  try {
    const courseId = req.params.id;
    const comments = await Comment.find({ course_id: courseId }).populate('user_id', 'name role').sort({ createdAt: -1 });
    
    const commentMap = {};
    const rootComments = [];

    comments.forEach(c => {
      commentMap[c._id.toString()] = { ...c.toObject(), replies: [] };
    });

    comments.forEach(c => {
      if (c.parent_id) {
        if (commentMap[c.parent_id.toString()]) {
          commentMap[c.parent_id.toString()].replies.push(commentMap[c._id.toString()]);
        }
      } else {
        rootComments.push(commentMap[c._id.toString()]);
      }
    });

    rootComments.forEach(c => {
        c.replies.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    });

    res.json(rootComments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET /api/courses/:id
router.get('/:id', async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ msg: 'ID không hợp lệ' });
  try {
    const course = await Course.findById(req.params.id).populate('instructor', 'name');
    if (!course) return res.status(404).json({ message: 'Course not found' });
    
    // Logic tăng view đã được chuyển sang POST /api/courses/:id/view

    res.json({
      ...course.toObject(),
      url: course.videoUrl || course.documentUrl, // Map videoUrl or documentUrl to url so frontend doesn't break
      instructor: course.instructor.name,
      instructor_id: course.instructor._id,
      course_id: course._id
    });
  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
