#!/bin/bash

echo "🚀 رفع المشروع على GitHub"
echo "=========================="

# إزالة remote السابق
git remote remove origin 2>/dev/null

# إضافة remote جديد (استبدل اسم المستودع إذا لزم الأمر)
echo "🔗 ربط المستودع..."
git remote add origin https://github.com/mohammadalsukkari/the-exhibition.git

# رفع المشروع
echo "📤 رفع الملفات..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 تم الرفع بنجاح!"
    echo "🌐 رابط المستودع: https://github.com/mohammadalsukkari/the-exhibition"
    echo ""
    echo "✨ الآن يمكنك:"
    echo "- مشاهدة الكود على GitHub"
    echo "- مشاركة الرابط"
    echo "- دعوة مطورين للمساهمة"
else
    echo ""
    echo "❌ فشل الرفع!"
    echo "💡 تأكد من إنشاء المستودع على GitHub أولاً"
    echo "🔗 https://github.com/new"
fi
