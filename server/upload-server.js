const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5001;

// Middleware
app.use(cors());
app.use(express.json());

// إعداد مجلد uploads
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// إعداد multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

// Routes
app.get('/api/test', (req, res) => {
  res.json({ success: true, message: 'الخادم يعمل بشكل طبيعي!' });
});

app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'لم يتم رفع أي ملف' });
  }

  res.json({
    success: true,
    message: 'تم رفع الصورة بنجاح',
    data: {
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
      imageUrl: `/uploads/${req.file.filename}`,
      fullUrl: `http://localhost:${PORT}/uploads/${req.file.filename}`
    }
  });
});

app.delete('/api/delete/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'uploads', filename);
  
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    res.json({ success: true, message: 'تم حذف الصورة بنجاح' });
  } else {
    res.status(404).json({ success: false, message: 'الملف غير موجود' });
  }
});

// إعداد مجلد الصور الثابتة
app.use('/uploads', express.static(uploadsDir));

// بدء الخادم
app.listen(PORT, () => {
  console.log(`🚀 خادم رفع الصور يعمل على المنفذ ${PORT}`);
});

module.exports = app;
