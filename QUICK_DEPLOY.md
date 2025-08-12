# Quick Deploy Commands

## للرفع السريع على Railway:

1. **أنشئ حساب على Railway:**
   https://railway.app

2. **أنشئ MongoDB Atlas:**
   https://www.mongodb.com/atlas/database

3. **ارفع التحديثات على GitHub:**
   ```bash
   git add .
   git commit -m "Added deployment configuration for Railway"
   git push origin main
   ```

4. **في Railway Dashboard:**
   - New Project → Deploy from GitHub
   - اختر repository: algader/image-gallery
   - أضف Variables:
     - MONGODB_URI=mongodb+srv://...
     - JWT_SECRET=your-secret-key
     - NODE_ENV=production

5. **انتظر Deploy وستحصل على رابط مثل:**
   https://your-app.up.railway.app

## متغيرات البيئة المطلوبة:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRET=super-secret-key-make-it-long-and-random
NODE_ENV=production
PORT=(Railway يضبطه تلقائياً)
```
