#!/bin/bash

echo "🚀 مساعد رفع المشروع على GitHub"
echo "================================="
echo ""

# قائمة بأسماء المستودعات المقترحة
REPO_NAMES=(
    "the-exhibition"
    "photo-gallery" 
    "image-gallery"
    "creative-gallery"
    "exhibition-app"
    "photo-sharing-platform"
    "visual-gallery"
    "digital-exhibition"
)

echo "📝 أسماء المستودعات المقترحة:"
for i in "${!REPO_NAMES[@]}"; do
    echo "$(($i + 1)). ${REPO_NAMES[$i]}"
done

echo ""
echo "🎯 خطوات الحل:"
echo "1. اختر اسماً من القائمة أعلاه"
echo "2. انسخ الرابط التالي واذهب إليه:"
echo "   🔗 https://github.com/new"
echo ""
echo "3. في النموذج:"
echo "   📝 Repository name: [الاسم المختار]"
echo "   📖 Description: 🎨 معرض الصور - منصة مشاركة الإبداع العالمية"
echo "   🌍 Public: ✅"
echo "   📄 README: ❌ لا تختر"
echo "   📁 .gitignore: ❌ لا تختر"  
echo "   ⚖️ License: ❌ لا تختر"
echo ""
echo "4. انقر 'Create repository'"
echo ""
echo "5. بعد إنشاء المستودع، شغل هذا الأمر:"

read -p "أدخل اسم المستودع الذي ستنشئه: " repo_name

if [ -z "$repo_name" ]; then
    repo_name="the-exhibition"
    echo "📝 سيتم استخدام الاسم الافتراضي: $repo_name"
fi

echo ""
echo "📋 الأوامر للنسخ واللصق بعد إنشاء المستودع:"
echo "=================================================="
echo "git remote remove origin"
echo "git remote add origin https://github.com/mohammadalsukkari/$repo_name.git"
echo "git push -u origin main"
echo ""
echo "🔗 رابط المستودع بعد الإنشاء:"
echo "https://github.com/mohammadalsukkari/$repo_name"
echo ""
echo "✨ بعد الانتهاء ستحصل على:"
echo "- مستودع عام على GitHub"
echo "- رابط لمشاركة المشروع"
echo "- إمكانية التعاون مع مطورين آخرين"
echo "- نسخة احتياطية سحابية من الكود"
