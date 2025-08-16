#!/bin/bash

echo "🎨 تشغيل الواجهة الأمامية..."
echo "==============================="

# التحقق من وجود Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js غير مثبت. يرجى تثبيته أولاً."
    exit 1
fi

# التحقق من وجود npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm غير متوفر. يرجى تثبيت Node.js."
    exit 1
fi

echo "✅ Node.js متوفر: $(node --version)"
echo "✅ npm متوفر: $(npm --version)"

# تثبيت dependencies إذا لم تكن موجودة
if [ ! -d "node_modules" ]; then
    echo "📦 تثبيت dependencies..."
    npm install
fi

echo "🚀 تشغيل الواجهة الأمامية على المنفذ 3000..."
echo "🌐 ستفتح في المتصفح: http://localhost:3000"
echo ""
echo "⏹️  لإيقاف الخادم: اضغط Ctrl+C"
echo ""

# تشغيل خادم التطوير
npm run dev
