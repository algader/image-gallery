const mongoose = require('mongoose');
const User = require('./models/User');


mongoose.connect('mongodb://localhost:27017/photo-sharing', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function checkDatabase() {
  try {
    console.log('🔍 فحص قاعدة البيانات...');
    
  
    const userCount = await User.countDocuments();
    console.log(`📊 عدد المستخدمين: ${userCount}`);
  
    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('firstName lastName username email createdAt');
    
    console.log('\n👥 آخر المستخدمين المسجلين:');
    recentUsers.forEach((user, index) => {
      console.log(`${index + 1}. ${user.firstName} ${user.lastName} (${user.username}) - ${user.email}`);
      console.log(`   📅 ${user.createdAt}`);
    });
    
  
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('\n📁 المجموعات في قاعدة البيانات:');
    collections.forEach(collection => {
      console.log(`- ${collection.name}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('❌ خطأ في فحص قاعدة البيانات:', error);
    process.exit(1);
  }
}

checkDatabase();
