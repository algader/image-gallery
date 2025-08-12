# 🚀 دليل رفع المشروع على Railway

## 📋 الخطوات المطلوبة

### 1. إعداد MongoDB Atlas (قاعدة البيانات المجانية)

1. **إنشاء حساب MongoDB Atlas**
   - اذهب إلى: https://www.mongodb.com/atlas/database
   - انقر على "Try Free"
   - أنشئ حساب جديد

2. **إنشاء Cluster مجاني**
   - اختر "M0 Sandbox" (مجاني)
   - اختر منطقة جغرافية قريبة
   - اضغط "Create Cluster"

3. **إعداد المستخدم وقاعدة البيانات**
   ```
   Database User: admin
   Password: (إنشاء كلمة مرور قوية)
   Database Name: photoapp
   ```

4. **الحصول على Connection String**
   - انقر على "Connect"
   - اختر "Connect your application"
   - انسخ الرابط ويبدو مثل:
   ```
   mongodb+srv://admin:<password>@cluster0.xxxxx.mongodb.net/photoapp?retryWrites=true&w=majority
   ```

### 2. إعداد Railway

1. **إنشاء حساب Railway**
   - اذهب إلى: https://railway.app
   - سجل دخول باستخدام GitHub

2. **ربط المشروع**
   - انقر على "New Project"
   - اختر "Deploy from GitHub repo"
   - اختر مستودع: `algader/image-gallery`

3. **إعداد متغيرات البيئة**
   في Railway Dashboard، اذهب إلى Variables وأضف:
   ```
   MONGODB_URI=mongodb+srv://admin:<password>@cluster0.xxxxx.mongodb.net/photoapp?retryWrites=true&w=majority
   JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random
   NODE_ENV=production
   ```

### 3. تعديل إعدادات المشروع

أضف ملف `railway.json` في المجلد الجذر:
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "cd server && npm start",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### 4. تحديث package.json في server

تأكد من وجود:
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

## 🌐 البدائل الأخرى

### **Render** (بديل ممتاز)
1. اذهب إلى: https://render.com
2. ربط GitHub repository
3. اختر "Web Service"
4. Build Command: `cd server && npm install`
5. Start Command: `cd server && npm start`

### **Cyclic** (سهل الاستخدام)
1. اذهب إلى: https://www.cyclic.sh
2. ربط GitHub repository
3. رفع تلقائي

## 🎯 التوصية النهائية

**للمبتدئين:** Railway (الأسهل والأوثق)
**للمحترفين:** Render (مرونة أكبر)
**للاختبار:** Cyclic (سرعة في الإعداد)

## 📞 الدعم
إذا واجهت مشاكل، المنصات الثلاث لديها دعم فني ممتاز عبر Discord.
