#!/bin/bash

echo "🚀 اختبار رفع المشروع على GitHub"
echo "=================================="

# قائمة بأسماء المستودعات المحتملة
REPO_NAMES=("the-exhibition" "photo-gallery-app" "exhibition-platform" "creative-gallery" "image-sharing-app")

echo "📝 جاري اختبار أسماء المستودعات المتاحة..."
echo ""

for repo in "${REPO_NAMES[@]}"; do
    echo "🔗 اختبار: https://github.com/mohammadalsukkari/$repo"
    
    # إزالة remote السابق
    git remote remove origin 2>/dev/null
    
    # إضافة remote جديد
    git remote add origin https://github.com/mohammadalsukkari/$repo.git
    
    # محاولة الرفع
    git push -u origin main 2>/dev/null
    
    if [ $? -eq 0 ]; then
        echo "✅ نجح الرفع! المستودع: $repo"
        echo "🌐 الرابط: https://github.com/mohammadalsukkari/$repo"
        exit 0
    else
        echo "❌ فشل: $repo (ربما غير موجود)"
    fi
done

echo ""
echo "🔧 لم ينجح أي من الأسماء المقترحة."
echo "📋 يرجى:"
echo "1. إنشاء مستودع جديد على GitHub"
echo "2. تشغيل الأمر يدوياً:"
echo "   git remote add origin https://github.com/mohammadalsukkari/[اسم-المستودع].git"
echo "   git push -u origin main"
