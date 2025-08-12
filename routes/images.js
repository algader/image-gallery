const express = require('express');
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');
const Image = require('../models/Image');
const User = require('../models/User');

const router = express.Router();


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {

  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Only JPEG and PNG images are allowed'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 
  },
  fileFilter: fileFilter
});


const authenticateToken = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid token.' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token.' });
  }
};

// Upload image
router.post('/upload', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file uploaded' });
    }

    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }

    const image = new Image({
      title,
      description,
      filename: req.file.filename,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      size: req.file.size,
      path: req.file.path,
      uploadedBy: req.user._id
    });

    await image.save();

 
    await image.populate('uploadedBy', 'username firstName lastName');

    res.status(201).json({
      message: 'Image uploaded successfully',
      image: image
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all images 
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const images = await Image.find()
      .populate('uploadedBy', 'username firstName lastName')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Image.countDocuments();

    res.json({
      images,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalImages: total
    });
  } catch (error) {
    console.error('Get images error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user images
router.get('/my-images', authenticateToken, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const images = await Image.find({ uploadedBy: req.user._id })
      .populate('uploadedBy', 'username firstName lastName')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Image.countDocuments({ uploadedBy: req.user._id });

    res.json({
      images,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalImages: total
    });
  } catch (error) {
    console.error('Get user images error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single image
router.get('/:id', async (req, res) => {
  try {
    const image = await Image.findById(req.params.id)
      .populate('uploadedBy', 'username firstName lastName')
      .populate('likes', 'username firstName lastName');

    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    // Increment view count
    image.views += 1;
    await image.save();

    res.json(image);
  } catch (error) {
    console.error('Get image error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Like/Unlike image
router.post('/:id/like', authenticateToken, async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);

    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    const userIndex = image.likes.indexOf(req.user._id);

    if (userIndex > -1) {
   
      image.likes.splice(userIndex, 1);
    } else {

      image.likes.push(req.user._id);
    }

    await image.save();

    res.json({
      message: userIndex > -1 ? 'Image unliked' : 'Image liked',
      likes: image.likes,
      likesCount: image.likes.length,
      isLiked: userIndex === -1
    });
  } catch (error) {
    console.error('Like image error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update image 
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { title, description } = req.body;


    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }

    if (title.trim().length < 2 || title.trim().length > 100) {
      return res.status(400).json({ message: 'Title must be between 2 and 100 characters' });
    }

    if (description.trim().length < 5 || description.trim().length > 500) {
      return res.status(400).json({ message: 'Description must be between 5 and 500 characters' });
    }

    const image = await Image.findById(req.params.id);

    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }


    if (image.uploadedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied. You can only update your own images.' });
    }

    // Update the image
    image.title = title.trim();
    image.description = description.trim();
    image.updatedAt = new Date();

    await image.save();

  
    await image.populate('uploadedBy', 'username firstName lastName');

    res.json({
      message: 'Image updated successfully',
      image: image
    });
  } catch (error) {
    console.error('Update image error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete image
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);

    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    // Check if user is the owner
    if (image.uploadedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied. You can only delete your own images.' });
    }

    await Image.findByIdAndDelete(req.params.id);

    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Delete image error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Search images
router.get('/search/:query', async (req, res) => {
  try {
    const query = req.params.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;


    const searchConditions = {
      $or: [
     
        { $text: { $search: query } },
   
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ]
    };

    let images;
    let total;

    try {
  
      images = await Image.find({ $text: { $search: query } })
        .populate('uploadedBy', 'username firstName lastName')
        .sort({ score: { $meta: 'textScore' }, createdAt: -1 })
        .skip(skip)
        .limit(limit);

      total = await Image.countDocuments({ $text: { $search: query } });
    } catch (textSearchError) {
   
      console.log('Text search not available, using regex search');
      images = await Image.find({
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { description: { $regex: query, $options: 'i' } }
        ]
      })
        .populate('uploadedBy', 'username firstName lastName')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

      total = await Image.countDocuments({
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { description: { $regex: query, $options: 'i' } }
        ]
      });
    }

    res.json({
      images,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalImages: total,
      searchQuery: query
    });
  } catch (error) {
    console.error('Search images error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
