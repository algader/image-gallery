// API Service - Local Storage Only Version (for Netlify)

// مفاتيح التخزين المحلي
const STORAGE_KEYS = {
  USERS: 'photoapp_users',
  IMAGES: 'photoapp_images',
  CURRENT_USER: 'photoapp_current_user'
};

// تهيئة التخزين المحلي
const initializeStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify([]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.IMAGES)) {
    localStorage.setItem(STORAGE_KEYS.IMAGES, JSON.stringify([]));
  }
};

// تشغيل التهيئة
initializeStorage();

// مساعدات
const generateId = () => Date.now().toString();
const generateToken = (user) => btoa(JSON.stringify({ userId: user.id, timestamp: Date.now() }));

// تحويل ملف إلى Base64
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

// API Functions
const api = {
  // ===== المصادقة =====
  
  register: async (userData) => {
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
    const existingUser = users.find(user => user.email === userData.email);
    
    if (existingUser) {
      throw new Error('البريد الإلكتروني مسجل مسبقاً');
    }

    const newUser = {
      id: generateId(),
      ...userData,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    
    const token = generateToken(newUser);
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify({ user: newUser, token }));
    
    return { data: { user: newUser, token } };
  },

  login: async (credentials) => {
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
    const user = users.find(u => u.email === credentials.email && u.password === credentials.password);
    
    if (!user) {
      throw new Error('بيانات الدخول غير صحيحة');
    }

    const token = generateToken(user);
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify({ user, token }));
    
    return { data: { user, token } };
  },

  logout: async () => {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    return { data: { message: 'تم تسجيل الخروج بنجاح' } };
  },

  getCurrentUser: () => {
    const userData = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return userData ? JSON.parse(userData) : null;
  },

  // ===== الصور =====

  uploadImage: async (formData) => {
    const currentUser = api.getCurrentUser();
    if (!currentUser) {
      throw new Error('يجب تسجيل الدخول أولاً');
    }

    const images = JSON.parse(localStorage.getItem(STORAGE_KEYS.IMAGES) || '[]');
    
    // استخراج البيانات من FormData
    const title = formData.get('title');
    const description = formData.get('description');
    const imageFile = formData.get('image');
    
    // تحويل الصورة إلى Base64
    const imageBase64 = await fileToBase64(imageFile);
    
    const newImage = {
      id: generateId(),
      title,
      description,
      imageUrl: imageBase64,
      fileName: imageFile.name,
      userId: currentUser.user.id,
      userName: currentUser.user.name,
      likes: [],
      createdAt: new Date().toISOString()
    };

    images.push(newImage);
    localStorage.setItem(STORAGE_KEYS.IMAGES, JSON.stringify(images));
    
    return { data: newImage };
  },

  getImages: async () => {
    const images = JSON.parse(localStorage.getItem(STORAGE_KEYS.IMAGES) || '[]');
    return { data: images.reverse() }; // الأحدث أولاً
  },

  getUserImages: async () => {
    const currentUser = api.getCurrentUser();
    if (!currentUser) {
      throw new Error('يجب تسجيل الدخول أولاً');
    }

    const images = JSON.parse(localStorage.getItem(STORAGE_KEYS.IMAGES) || '[]');
    const userImages = images.filter(img => img.userId === currentUser.user.id);
    return { data: userImages.reverse() };
  },

  updateImage: async (imageId, updateData) => {
    const images = JSON.parse(localStorage.getItem(STORAGE_KEYS.IMAGES) || '[]');
    const imageIndex = images.findIndex(img => img.id === imageId);
    
    if (imageIndex === -1) {
      throw new Error('الصورة غير موجودة');
    }

    images[imageIndex] = { ...images[imageIndex], ...updateData };
    localStorage.setItem(STORAGE_KEYS.IMAGES, JSON.stringify(images));
    
    return { data: images[imageIndex] };
  },

  deleteImage: async (imageId) => {
    const images = JSON.parse(localStorage.getItem(STORAGE_KEYS.IMAGES) || '[]');
    const filteredImages = images.filter(img => img.id !== imageId);
    localStorage.setItem(STORAGE_KEYS.IMAGES, JSON.stringify(filteredImages));
    
    return { data: { message: 'تم حذف الصورة بنجاح' } };
  },

  toggleLike: async (imageId) => {
    const currentUser = api.getCurrentUser();
    if (!currentUser) {
      throw new Error('يجب تسجيل الدخول أولاً');
    }

    const images = JSON.parse(localStorage.getItem(STORAGE_KEYS.IMAGES) || '[]');
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

    localStorage.setItem(STORAGE_KEYS.IMAGES, JSON.stringify(images));
    return { data: image };
  },

  searchImages: async (query) => {
    const images = JSON.parse(localStorage.getItem(STORAGE_KEYS.IMAGES) || '[]');
    const filteredImages = images.filter(img => 
      img.title?.toLowerCase().includes(query.toLowerCase()) ||
      img.description?.toLowerCase().includes(query.toLowerCase())
    );
    return { data: filteredImages };
  }
};

export default api;
