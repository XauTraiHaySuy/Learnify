import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  question_text: {
    type: String,
    required: true,
  },
  question_type: {
    type: String,
    enum: ['multiple_choice', 'short_answer', 'essay'],
    default: 'multiple_choice',
  },
  options: [String], // only for multiple choice
  correct_answer: {
    type: String,
    required: true,
  }
});

const quizSchema = new mongoose.Schema({
  course_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  time_limit: {
    type: Number, // in minutes
    required: true,
    min: 0,
    default: 30,
  },
  rubric: {
    type: String, // criteria for manual or automated AI grading
    trim: true,
  },
  questions: [questionSchema]
});

const Quiz = mongoose.model('Quiz', quizSchema);
export default Quiz;
