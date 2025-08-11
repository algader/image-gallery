const mongoose = require('mongoose');
require('dotenv').config();

async function reindexDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/photo-sharing', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('متصل بقاعدة البيانات...');


    const Image = require('./models/Image');
    
    console.log('إعادة بناء الفهارس...');
    await Image.collection.dropIndexes();
    await Image.createIndexes();
    
    console.log('✅ تم إعادة بناء الفهارس بنجاح');
    
  
    console.log('اختبار البحث...');
    const searchResult = await Image.find({
      $or: [
        { title: { $regex: 'صورة', $options: 'i' } },
        { description: { $regex: 'صورة', $options: 'i' } }
      ]
    }).limit(3);
    
    console.log(`وُجد ${searchResult.length} نتائج للبحث`);
    
    if (searchResult.length > 0) {
      console.log('عينة من النتائج:');
      searchResult.forEach((img, index) => {
        console.log(`${index + 1}. ${img.title} - ${img.description}`);
      });
    }
    
    process.exit(0);
  } catch (error) {
    console.error('خطأ:', error);
    process.exit(1);
  }
}

reindexDatabase();
