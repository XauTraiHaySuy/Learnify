import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  level: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
    // Không bắt buộc nữa, vì có thể chỉ có documentUrl
  },
  documentUrl: {
    type: String,
  },
  thumbnail: {
    type: String,
    default: '',
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  views: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
    default: '',
  },
  isPrivate: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);
export default Course;
