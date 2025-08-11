#!/bin/bash

echo "🚀 نشر مشروع معرض الصور على GitHub"
echo "====================================="

# ألوان للنص
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# التحقق من وجود Git
if ! command -v git &> /dev/null; then
    echo -e "${RED}❌ Git غير مثبت. يرجى تثبيت Git أولاً${NC}"
    exit 1
fi

# التحقق من أن المجلد الحالي هو مجلد المشروع
if [ ! -f "README.md" ] || [ ! -d "client" ] || [ ! -d "server" ]; then
    echo -e "${RED}❌ يرجى تشغيل هذا النص من مجلد المشروع الرئيسي${NC}"
    exit 1
fi

echo -e "${BLUE}📋 إعداد المشروع للنشر...${NC}"

# إنشاء .gitkeep في مجلد uploads إذا لم يكن موجود
if [ ! -f "server/uploads/.gitkeep" ]; then
    mkdir -p server/uploads
    touch server/uploads/.gitkeep
    echo -e "${GREEN}✅ تم إنشاء server/uploads/.gitkeep${NC}"
fi

# تهيئة Git إذا لم يكن مهيأ
if [ ! -d ".git" ]; then
    echo -e "${BLUE}📦 تهيئة Git...${NC}"
    git init
    echo -e "${GREEN}✅ تم تهيئة Git${NC}"
fi

# إضافة جميع الملفات
echo -e "${BLUE}📁 إضافة الملفات...${NC}"
git add .

# إنشاء commit
echo -e "${BLUE}💾 إنشاء commit...${NC}"
git commit -m "🎉 Initial commit: Photo sharing platform with multilingual support

✨ المميزات:
- مشاركة الصور مع دعم PNG/JPEG/WebP
- نظام مصادقة آمن مع JWT
- دعم ثلاث لغات: العربية، الإنجليزية، الألمانية
- تصميم متجاوب وحديث
- بحث متقدم في الصور
- صفحة عنا شاملة مع معلومات الشركة
- أيقونات جميلة وتحسينات SEO

🛠️ التقنيات:
- Frontend: React.js + Vite
- Backend: Node.js + Express.js
- Database: MongoDB + Mongoose
- Authentication: JWT + bcryptjs
- File Upload: Multer
- Styling: CSS3 + Responsive Design"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ تم إنشاء commit بنجاح${NC}"
else
    echo -e "${YELLOW}⚠️  لا توجد تغييرات جديدة للcommit${NC}"
fi

# تعيين الفرع الرئيسي
git branch -M main

echo ""
echo -e "${YELLOW}📋 الخطوات التالية:${NC}"
echo "1. اذهب إلى https://github.com وأنشئ مستودع جديد"
echo "2. اسم المستودع: the-exhibition"
echo "3. الوصف: 🎨 معرض الصور - منصة مشاركة الإبداع العالمية"
echo "4. اجعله Public أو Private حسب اختيارك"
echo "5. لا تختر إضافة README أو .gitignore (لديك بالفعل)"
echo ""
echo -e "${BLUE}6. ثم شغّل هذه الأوامر:${NC}"
echo -e "${GREEN}git remote add origin https://github.com/YOUR_USERNAME/the-exhibition.git${NC}"
echo -e "${GREEN}git push -u origin main${NC}"
echo ""
echo -e "${YELLOW}💡 استبدل YOUR_USERNAME باسم المستخدم الخاص بك في GitHub${NC}"

echo ""
echo -e "${GREEN}🎉 المشروع جاهز للرفع على GitHub!${NC}"
echo -e "${BLUE}📊 إحصائيات المشروع:${NC}"
echo "- $(find . -name "*.js" -o -name "*.jsx" | wc -l | tr -d ' ') ملف JavaScript/JSX"
echo "- $(find . -name "*.css" | wc -l | tr -d ' ') ملف CSS"
echo "- $(find . -name "*.json" | wc -l | tr -d ' ') ملف JSON"
echo "- $(find . -name "*.md" | wc -l | tr -d ' ') ملف توثيق"
