#!/bin/bash

echo "🔍 البحث عن اسم مستودع متاح على GitHub"
echo "============================================"

# قائمة بأسماء المستودعات المقترحة
REPO_NAMES=(
    "the-exhibition" 
    "photo-gallery" 
    "image-gallery" 
    "creative-gallery" 
    "photo-sharing-app"
    "exhibition-platform"
    "digital-gallery"
    "art-gallery"
    "photo-collection"
    "visual-gallery"
)

USERNAME="mohammadalsukkari"

echo "👤 اسم المستخدم: $USERNAME"
echo "📝 أسماء المستودعات المقترحة:"
echo ""

for i in "${!REPO_NAMES[@]}"; do
    repo="${REPO_NAMES[$i]}"
    url="https://github.com/$USERNAME/$repo.git"
    
    echo "$(($i + 1)). $repo"
    echo "   $url"
    
    # اختبار إذا كان المستودع موجود
    git ls-remote "$url" >/dev/null 2>&1
    if [ $? -eq 0 ]; then
        echo "   ✅ موجود ومتاح للاستخدام"
    else
        echo "   ❌ غير موجود - يحتاج إنشاء"
    fi
    echo ""
done

echo "🎯 لاختيار اسم مستودع:"
echo "1. اختر اسماً من القائمة أعلاه"
echo "2. أنشئ مستودعاً بهذا الاسم على GitHub"
echo "3. شغل الأمر:"
echo "   git remote remove origin"
echo "   git remote add origin https://github.com/$USERNAME/[اسم-المستودع].git"
echo "   git push -u origin main"

echo ""
echo "🔗 رابط إنشاء مستودع جديد:"
echo "https://github.com/new"
