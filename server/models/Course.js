import mongoose from 'mongoose';

const materialSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['video', 'pdf', 'document', 'link'],
    default: 'video',
  },
  url: {
    type: String,
    required: true,
  }
});

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  instructor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
  materials: [materialSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Course = mongoose.model('Course', courseSchema);
export default Course;
