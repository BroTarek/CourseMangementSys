const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  phone: {
    type: String,
    maxlength: [20, 'Phone number can not be longer than 20 characters'],
  },
  enrollmentDate: {
    type: Date,
    default: Date.now,
  },
  grade: {
    type: String,
    required: [true, 'Grade is required'],
    enum: ['Grade-9', 'Grade-10', 'Grade-11', 'Grade-12'],
  },
  Projects: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Projects', // Assuming we will have a Course model later
  }],
  Assignments: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Assignments', // Assuming we will have a Course model later
  }],
  Exams: {
    type: mongoose.Schema.ObjectId,
    ref: 'Exams'
  },
  parentName: {
    type: String,
    maxlength: [20, 'Parent name can not be longer than 20 characters'],
  },
  parentNumber: {
    type: String,
    maxlength: [20, 'Phone number can not be longer than 20 characters'],
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Student', studentSchema);
