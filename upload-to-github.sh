#!/bin/bash

echo "🚀 رفع المشروع على GitHub"
echo "============================"

# تأكد من وجود المستودع على GitHub أولاً!
echo "⚠️  تأكد من إنشاء المستودع على GitHub قبل المتابعة"
echo "📝 اسم المستودع المطلوب: the-exhibition"
echo ""

read -p "هل أنشأت المستودع على GitHub؟ (y/n): " answer
if [ "$answer" != "y" ]; then
    echo "❌ يرجى إنشاء المستودع أولاً ثم تشغيل هذا النص مرة أخرى"
    exit 1
fi

echo "📦 إضافة أي ملفات جديدة..."
git add .

if git diff --staged --quiet; then
    echo "✅ لا توجد تغييرات جديدة للرفع"
else
    echo "💾 إنشاء commit للتغييرات الجديدة..."
    git commit -m "📦 Update project files and structure"
fi

echo "🔗 ربط المستودع المحلي بـ GitHub..."
git remote add origin https://github.com/mohammadalsukkari/the-exhibition.git 2>/dev/null || echo "Remote already exists"

echo "🚀 رفع المشروع..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 تم رفع المشروع بنجاح!"
    echo "🌐 رابط المستودع: https://github.com/mohammadalsukkari/the-exhibition"
    echo ""
    echo "✨ يمكنك الآن:"
    echo "- مشاهدة الكود على GitHub"
    echo "- مشاركة الرابط مع الآخرين"
    echo "- إعداد GitHub Pages للنشر"
    echo "- دعوة مطورين آخرين للمساهمة"
else
    echo ""
    echo "❌ حدث خطأ في الرفع!"
    echo "🔧 حلول محتملة:"
    echo "1. تأكد من إنشاء المستودع على GitHub"
    echo "2. تأكد من اسم المستخدم الصحيح: mohammadalsukkari"
    echo "3. تأكد من اسم المستودع: the-exhibition"
    echo "4. تحقق من اتصال الإنترنت"
fi
