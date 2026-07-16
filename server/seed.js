import mongoose from 'mongoose';
import connectDB from './config/db.js';
import User from './models/User.js';
import Course from './models/Course.js';
import Quiz from './models/Quiz.js';
import QuizAttempt from './models/QuizAttempt.js';
import VoicePractice from './models/VoicePractice.js';
import Transaction from './models/Transaction.js';

const seedDatabase = async () => {
  try {
    // Connect to database
    await connectDB();

    console.log('🧹 Clearing existing database collections...');
    await User.deleteMany({});
    await Course.deleteMany({});
    await Quiz.deleteMany({});
    await QuizAttempt.deleteMany({});
    await VoicePractice.deleteMany({});
    await Transaction.deleteMany({});
    console.log('✅ Collections cleared!\n');

    console.log('👤 Seeding Users (Admin, Instructor, Student)...');
    const users = await User.insertMany([
      {
        name: 'Admin',
        email: 'admin@learnify.com',
        password: '123456', // Plain text for mock / demonstration purposes
        role: 'admin',
        status: 'active'
      },
      {
        name: 'gv',
        email: 'huyhoang@learnify.com',
        password: '123456',
        role: 'instructor',
        status: 'active'
      },
      {
        name: 'sv',
        email: 'janedoe@learnify.com',
        password: '123456',
        role: 'student',
        status: 'active'
      }
    ]);

    const instructor = users.find(u => u.role === 'instructor');
    const student = users.find(u => u.role === 'student');

    console.log('📚 Seeding Course...');
    const course = await Course.create({
      title: 'Full-Stack JavaScript with Vue 3 and MongoDB',
      description: 'Master modern full-stack development. Learn to build beautiful reactive frontends with Vue 3 and link them seamlessly with Node.js, Express, and MongoDB Atlas.',
      instructor_id: instructor._id,
      price: 99,
      materials: [
        {
          title: 'Course Syllabus & Roadmap',
          type: 'pdf',
          url: 'https://learnify.com/materials/syllabus.pdf'
        },
        {
          title: 'Section 1: Vue 3 Reactive Fundamentals',
          type: 'video',
          url: 'https://learnify.com/materials/v-model-props-emit.mp4'
        },
        {
          title: 'Section 2: MongoDB Atlas and Mongoose schemas',
          type: 'video',
          url: 'https://learnify.com/materials/mongodb-schemas.mp4'
        }
      ]
    });

    console.log('✍️ Seeding Quiz with embedded questions...');
    const quiz = await Quiz.create({
      course_id: course._id,
      title: 'MongoDB Schema Design and Relationships',
      time_limit: 15, // 15 minutes
      rubric: 'Passing grade is 80%. Multi-choice questions test core embedding vs reference choices.',
      questions: [
        {
          question_text: 'When should you typically embed documents rather than refer to them in MongoDB?',
          question_type: 'multiple_choice',
          options: [
            'When the related data has a 1-to-many relationship and the "many" side can grow without bounds.',
            'When the related data is always queried together, updated together, and has a bounded size (like line items in an invoice).',
            'When you want to perform complex relational joins between separate collections.',
            'When security requirements force storing data in isolated collections.'
          ],
          correct_answer: 'When the related data is always queried together, updated together, and has a bounded size (like line items in an invoice).'
        },
        {
          question_text: 'Which Mongoose schema option stores the creation timestamp automatically?',
          question_type: 'multiple_choice',
          options: [
            '{ timestamps: true }',
            '{ dateCreated: true }',
            '{ autoTimestamp: true }',
            '{ saveTime: true }'
          ],
          correct_answer: '{ timestamps: true }'
        }
      ]
    });

    console.log('📝 Seeding Quiz Attempt with student answers and AI Feedback...');
    const quizAttempt = await QuizAttempt.create({
      student_id: student._id,
      quiz_id: quiz._id,
      score: 100,
      time_spent: 340, // 340 seconds
      student_answers: [
        {
          question_id: quiz.questions[0]._id,
          answer: 'When the related data is always queried together, updated together, and has a bounded size (like line items in an invoice).',
          is_correct: true
        },
        {
          question_id: quiz.questions[1]._id,
          answer: '{ timestamps: true }',
          is_correct: true
        }
      ],
      ai_feedback: 'Outstanding work, Jane! You demonstrated a flawless understanding of Mongoose schema configurations and document embedding practices. Keep up the perfect performance!',
      status: 'graded',
      completedAt: new Date()
    });

    console.log('🗣️ Seeding Student Voice Practice...');
    const voicePractice = await VoicePractice.create({
      student_id: student._id,
      prompt_text: 'Developing web applications with MongoDB is both efficient and flexible.',
      transcript: 'Developing web application with MongoDB is both efficient and flexible.',
      pronunciation_score: 93,
      errors_detected: {
        mispronounced_words: ['applications'],
        grammar_errors: ['Used singular "application" instead of plural "applications"'],
        general_feedback: 'Overall excellent pronunciation and fluent flow. Try to clearly enunciate plural endings (s).'
      }
    });

    console.log('💳 Seeding Transaction...');
    const transaction = await Transaction.create({
      student_id: student._id,
      course_id: course._id,
      amount: 99,
      transaction_code: 'TXN-LEARNIFY-2026-0001',
      status: 'success',
      paidAt: new Date()
    });

    console.log('\n=========================================');
    console.log('🚀 Database seeded with complete mock data!');
    console.log('-----------------------------------------');
    console.log(`- Created ${users.length} Users.`);
    console.log(`- Created 1 Course: "${course.title}".`);
    console.log(`- Created 1 Quiz: "${quiz.title}".`);
    console.log(`- Created 1 Quiz Attempt for Student "${student.name}".`);
    console.log(`- Created 1 Voice Practice record.`);
    console.log(`- Created 1 successful Transaction of $${transaction.amount}.`);
    console.log('=========================================\n');

    // Close mongoose connection
    await mongoose.connection.close();
    console.log('🔌 Connection closed safely.');
    process.exit(0);
  } catch (error) {
    console.error(`🔴 Seeding failed: ${error.message}`);
    process.exit(1);
  }
};

seedDatabase();
