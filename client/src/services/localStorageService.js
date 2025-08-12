// Local Storage Service - بديل عن API الخادم
class LocalStorageService {
  constructor() {
    this.USERS_KEY = 'photoapp_users';
    this.IMAGES_KEY = 'photoapp_images';
    this.CURRENT_USER_KEY = 'photoapp_current_user';
    this.initializeStorage();
  }

  initializeStorage() {
    if (!localStorage.getItem(this.USERS_KEY)) {
      localStorage.setItem(this.USERS_KEY, JSON.stringify([]));
    }
    if (!localStorage.getItem(this.IMAGES_KEY)) {
      localStorage.setItem(this.IMAGES_KEY, JSON.stringify([]));
    }
  }

  // ===== إدارة المستخدمين =====
  
  register(userData) {
    const users = this.getUsers();
    const existingUser = users.find(user => user.email === userData.email);
    
    if (existingUser) {
      throw new Error('البريد الإلكتروني مسجل مسبقاً');
    }

    const newUser = {
      id: Date.now().toString(),
      ...userData,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    
    return { user: newUser, token: this.generateToken(newUser) };
  }

  login(email, password) {
    const users = this.getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('بيانات الدخول غير صحيحة');
    }

    const token = this.generateToken(user);
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify({ user, token }));
    
    return { user, token };
  }

  logout() {
    localStorage.removeItem(this.CURRENT_USER_KEY);
  }

  getCurrentUser() {
    const userData = localStorage.getItem(this.CURRENT_USER_KEY);
    return userData ? JSON.parse(userData) : null;
  }

  getUsers() {
    return JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]');
  }

  // ===== إدارة الصور =====

  uploadImage(imageData) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) {
      throw new Error('يجب تسجيل الدخول أولاً');
    }

    const images = this.getImages();
    const newImage = {
      id: Date.now().toString(),
      ...imageData,
      userId: currentUser.user.id,
      userName: currentUser.user.name,
      likes: [],
      createdAt: new Date().toISOString()
    };

    images.push(newImage);
    localStorage.setItem(this.IMAGES_KEY, JSON.stringify(images));
    
    return newImage;
  }

  getImages() {
    return JSON.parse(localStorage.getItem(this.IMAGES_KEY) || '[]');
  }

  getUserImages(userId) {
    const images = this.getImages();
    return images.filter(img => img.userId === userId);
  }

  updateImage(imageId, updateData) {
    const images = this.getImages();
    const imageIndex = images.findIndex(img => img.id === imageId);
    
    if (imageIndex === -1) {
      throw new Error('الصورة غير موجودة');
    }

    images[imageIndex] = { ...images[imageIndex], ...updateData };
    localStorage.setItem(this.IMAGES_KEY, JSON.stringify(images));
    
    return images[imageIndex];
  }

  deleteImage(imageId) {
    const images = this.getImages();
    const filteredImages = images.filter(img => img.id !== imageId);
    localStorage.setItem(this.IMAGES_KEY, JSON.stringify(filteredImages));
  }

  toggleLike(imageId) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) {
      throw new Error('يجب تسجيل الدخول أولاً');
    }

    const images = this.getImages();
    const imageIndex = images.findIndex(img => img.id === imageId);
    
    if (imageIndex === -1) {
      throw new Error('الصورة غير موجودة');
    }

    const image = images[imageIndex];
    const userIndex = image.likes.indexOf(currentUser.user.id);
    
    if (userIndex > -1) {
      // إلغاء الإعجاب
      image.likes.splice(userIndex, 1);
    } else {
      // إضافة إعجاب
      image.likes.push(currentUser.user.id);
    }

    localStorage.setItem(this.IMAGES_KEY, JSON.stringify(images));
    return image;
  }

  searchImages(query) {
    const images = this.getImages();
    return images.filter(img => 
      img.title?.toLowerCase().includes(query.toLowerCase()) ||
      img.description?.toLowerCase().includes(query.toLowerCase())
    );
  }

  // ===== مساعدات =====

  generateToken(user) {
    return btoa(JSON.stringify({ userId: user.id, timestamp: Date.now() }));
  }

  // تحويل ملف إلى Base64 للتخزين المحلي
  async fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  // تصدير البيانات (للنسخ الاحتياطي)
  exportData() {
    return {
      users: this.getUsers(),
      images: this.getImages(),
      exportDate: new Date().toISOString()
    };
  }

  // استيراد البيانات
  importData(data) {
    if (data.users) {
      localStorage.setItem(this.USERS_KEY, JSON.stringify(data.users));
    }
    if (data.images) {
      localStorage.setItem(this.IMAGES_KEY, JSON.stringify(data.images));
    }
  }

  // مسح جميع البيانات
  clearAllData() {
    localStorage.removeItem(this.USERS_KEY);
    localStorage.removeItem(this.IMAGES_KEY);
    localStorage.removeItem(this.CURRENT_USER_KEY);
    this.initializeStorage();
  }
}

// إنشاء instance عالمي
const localStorageService = new LocalStorageService();

export default localStorageService;
