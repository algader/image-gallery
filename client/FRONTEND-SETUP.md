# 🚀 كيفية تشغيل الواجهة الأمامية

## الطرق المختلفة لتشغيل الواجهة:

### ⚡ الطريقة السريعة (مع فتح المتصفح تلقائياً):
```bash
./start-frontend-browser.sh
```

### 🔧 الطريقة اليدوية:
```bash
cd client
npm install
npm run dev
```

### 📱 فتح في المتصفح:
افتح المتصفح وانتقل إلى: http://localhost:3000

---

## 🔍 استكشاف الأخطاء:

### ❌ المشكلة: "المنفذ 3000 مستخدم"
**الحل:**
```bash
# إيقاف العملية على المنفذ 3000
lsof -ti:3000 | xargs kill -9

# أو استخدام منفذ آخر
npm run dev -- --port 3001
```

### ❌ المشكلة: "Module not found"
**الحل:**
```bash
cd client
rm -rf node_modules package-lock.json
npm install
```

### ❌ المشكلة: "API calls failing"
**الحل:**
```bash
# تأكد من تشغيل الخادم
cd server
npm run dev
```

---

## 📋 خطوات التشغيل الكاملة:

### 1. تشغيل قاعدة البيانات:
```bash
# تشغيل MongoDB
mongod
```

### 2. تشغيل الخادم (Terminal 1):
```bash
cd server
npm install
npm run dev
```

### 3. تشغيل الواجهة (Terminal 2):
```bash
cd client
npm install
npm run dev
```

### 4. فتح المتصفح:
```
http://localhost:3000
```

---

## 🌐 العناوين المهمة:

- **الواجهة الأمامية**: http://localhost:3000
- **API الخلفية**: http://localhost:5000
- **اختبار API**: http://localhost:5000/api/images

---

## 🎯 اختبار سريع للواجهة:

1. **افتح** http://localhost:3000
2. **انقر** "إنشاء حساب" لتسجيل مستخدم جديد
3. **سجل دخولك** بالبيانات الجديدة
4. **جرب** رفع صورة من صفحة "رفع صورة"
5. **تصفح** الصور في الصفحة الرئيسية

---

## 🆘 إذا لم تعمل الواجهة:

### تحقق من الأساسيات:
```bash
# تحقق من Node.js
node --version

# تحقق من npm
npm --version

# تحقق من المنافذ
lsof -i :3000
lsof -i :5000
```

### إعادة تثبيت Dependencies:
```bash
cd client
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

---

## 📞 تواصل للمساعدة:

إذا استمرت المشاكل، تأكد من:
- ✅ تثبيت Node.js (الإصدار 16 أو أحدث)
- ✅ تشغيل MongoDB
- ✅ عدم وجود تطبيقات أخرى على المنافذ 3000 و 5000
- ✅ أذونات الكتابة في مجلد المشروع
