import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  course_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course', // Reference to the Course model
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  text: {
    type: String,
    required: true,
    trim: true,
  },
  parent_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
    default: null,
  },
  likes: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;
