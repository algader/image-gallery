const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, firstName, lastName } = req.body;


    if (!username || !email || !password || !firstName || !lastName) {
      return res.status(400).json({
        message: 'جميع البيانات مطلوبة'
      });
    }


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: 'البريد الإلكتروني غير صالح'
      });
    }


    if (password.length < 6) {
      return res.status(400).json({
        message: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'
      });
    }


    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });
    
    if (existingUser) {
      let message = 'هذا ';
      if (existingUser.email === email) {
        message += 'البريد الإلكتروني';
      }
      if (existingUser.username === username) {
        if (existingUser.email === email) {
          message += ' واسم المستخدم';
        } else {
          message += 'اسم المستخدم';
        }
      }
      message += ' مسجل مسبقاً';
      
      return res.status(400).json({
        message: message
      });
    }

    // Create new user
    const user = new User({
      username,
      email,
      password,
      firstName,
      lastName
    });

    await user.save();

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'تم إنشاء الحساب بنجاح',
      token,
      user: {
        _id: user._id,
        id: user._id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    
  
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      let message = '';
      if (field === 'email') {
        message = 'البريد الإلكتروني مسجل مسبقاً';
      } else if (field === 'username') {
        message = 'اسم المستخدم مسجل مسبقاً';
      } else {
        message = 'البيانات مسجلة مسبقاً';
      }
      return res.status(400).json({ message });
    }
    
    res.status(500).json({ message: 'خطأ في الخادم. حاول مرة أخرى' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

  
    if (!email || !password) {
      return res.status(400).json({
        message: 'البريد الإلكتروني وكلمة المرور مطلوبان'
      });
    }


    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة'
      });
    }

  
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({
        message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة'
      });
    }

    // إنشاء JWT
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'تم تسجيل الدخول بنجاح',
      token,
      user: {
        _id: user._id,
        id: user._id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'خطأ في الخادم. حاول مرة أخرى' });
  }
});

// Get current user profile
router.get('/me', async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
});


router.get('/test', (req, res) => {
  res.json({
    message: 'الخادم يعمل بشكل صحيح!',
    timestamp: new Date().toISOString(),
    status: 'OK'
  });
});

module.exports = router;
