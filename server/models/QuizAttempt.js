import mongoose from 'mongoose';

const studentAnswerSchema = new mongoose.Schema({
  question_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  is_correct: {
    type: Boolean,
    default: false,
  }
});

const quizAttemptSchema = new mongoose.Schema({
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  quiz_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true,
  },
  score: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
  time_spent: {
    type: Number, // in seconds or minutes
    required: true,
    min: 0,
    default: 0,
  },
  student_answers: [studentAnswerSchema],
  ai_feedback: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ['graded', 'pending_review'],
    default: 'graded',
  },
  completedAt: {
    type: Date,
    default: Date.now,
  }
});

const QuizAttempt = mongoose.model('QuizAttempt', quizAttemptSchema);
export default QuizAttempt;
