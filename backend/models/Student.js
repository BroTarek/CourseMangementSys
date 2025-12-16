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
  class: {
    type: String,
    required: [true, 'Class is required'], // e.g., '10-A', '11-B'
  },
  avatar: {
    type: String,
    default: 'no-photo.jpg',
  },
  courses: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Course', // Assuming we will have a Course model later
  }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Student', studentSchema);
