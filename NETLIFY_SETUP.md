# Netlify Configuration

## Build Settings

**Build Command:** `npm run build`
**Publish Directory:** `client/dist`
**Base Directory:** `client`

## Environment Variables (if needed)

```
VITE_APP_NAME=Photo Gallery
VITE_VERSION=1.0.0
```

## Deploy Settings

1. **Connect GitHub Repository:**
   - Repository: `algader/image-gallery`
   - Branch: `main`
   - Base directory: `client`

2. **Build Settings:**
   ```
   Build command: npm run build
   Publish directory: client/dist
   ```

3. **Advanced Settings:**
   - Node.js version: 18 or later
   - Package manager: npm

## Features Working:

✅ **Authentication** - تسجيل دخول وإنشاء حسابات
✅ **Image Upload** - رفع الصور (Base64 storage)
✅ **Image Gallery** - عرض الصور
✅ **Search** - البحث في الصور
✅ **Likes** - نظام الإعجاب
✅ **My Images** - صور المستخدم
✅ **Edit/Delete** - تعديل وحذف الصور
✅ **Multi-language** - دعم 3 لغات
✅ **Responsive Design** - تصميم متجاوب

## Data Storage:

- **Local Storage** - جميع البيانات محفوظة محلياً
- **No Server Required** - لا يحتاج خادم
- **Instant Loading** - تحميل فوري
- **Works Offline** - يعمل بدون انترنت

## Limitations:

- البيانات محلية (تُفقد عند مسح المتصفح)
- الصور محدودة بحجم Local Storage (~5-10MB)
- لا مشاركة بين الأجهزة

## Deploy URL:
بعد الرفع على Netlify ستحصل على رابط مثل:
`https://amazing-photo-gallery-12345.netlify.app`
