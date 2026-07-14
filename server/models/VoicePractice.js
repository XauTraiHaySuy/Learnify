import mongoose from 'mongoose';

const errorDetailsSchema = new mongoose.Schema({
  mispronounced_words: [String],
  grammar_errors: [String],
  general_feedback: {
    type: String,
    trim: true,
  }
}, { _id: false });

const voicePracticeSchema = new mongoose.Schema({
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  prompt_text: {
    type: String,
    required: true,
    trim: true,
  },
  transcript: {
    type: String,
    required: true,
    trim: true,
  },
  pronunciation_score: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
    default: 0,
  },
  errors_detected: errorDetailsSchema,
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const VoicePractice = mongoose.model('VoicePractice', voicePracticeSchema);
export default VoicePractice;
