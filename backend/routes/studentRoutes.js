const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// @desc    Get all students
// @route   GET /api/students
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { search, grade, sort } = req.query;
    let query = {};

    // Search functionality
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    // Filter by grade
    if (grade && grade !== 'all') {
      query.grade = grade;
    }

    let studentsQuery = Student.find(query);

    // Sorting
    if (sort) {
       const [field, order] = sort.split(':');
       studentsQuery = studentsQuery.sort({ [field]: order === 'desc' ? -1 : 1 });
    } else {
       studentsQuery = studentsQuery.sort('-createdAt');
    }

    const students = await studentsQuery;

    res.status(200).json({
        success: true,
        count: students.length,
        data: students
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// @desc    Get single student
// @route   GET /api/students/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ success: false, error: 'Student not found' });
    }

    res.status(200).json({ success: true, data: student });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// @desc    Create new student
// @route   POST /api/students
// @access  Public
router.post('/', async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json({ success: true, data: student });
  } catch (err) {
    if (err.code === 11000) {
        return res.status(400).json({ success: false, error: 'Email already exists' });
    }
    res.status(400).json({ success: false, error: err.message });
  }
});

// @desc    Update student
// @route   PUT /api/students/:id
// @access  Public
router.put('/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!student) {
      return res.status(404).json({ success: false, error: 'Student not found' });
    }

    res.status(200).json({ success: true, data: student });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// @desc    Delete student
// @route   DELETE /api/students/:id
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({ success: false, error: 'Student not found' });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
