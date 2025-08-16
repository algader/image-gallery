import api from './api';

// Auth services
export const authService = {
  async register(userData) {
    try {
      const response = await api.post('/auth/register', userData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      console.error('Registration service error:', error);
      
      // إذا كان هناك رد من الخادم
      if (error.response?.data?.message) {
        throw { message: error.response.data.message };
      }
      
      // إذا كان خطأ في الشبكة
      if (error.message === 'Network Error') {
        throw { message: 'خطأ في الاتصال. تحقق من أن الخادم يعمل' };
      }
      
      // خطأ عام
      throw { message: error.message || 'فشل في إنشاء الحساب. حاول مرة أخرى' };
    }
  },

  async login(credentials) {
    try {
      const response = await api.post('/auth/login', credentials);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Login failed' };
    }
  },

  async getCurrentUser() {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to get user info' };
    }
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  isAuthenticated() {
    return !!localStorage.getItem('token');
  },

  getCurrentUserFromStorage() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
};

// Image services
export const imageService = {
  async getAllImages(page = 1, limit = 10) {
    try {
      const response = await api.get(`/images?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch images' };
    }
  },

  async getMyImages(page = 1, limit = 10) {
    try {
      const response = await api.get(`/images/my-images?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch your images' };
    }
  },

  async getImageById(id) {
    try {
      const response = await api.get(`/images/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch image' };
    }
  },

  async uploadImage(formData) {
    try {
      const response = await api.post('/images/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to upload image' };
    }
  },

  async likeImage(id) {
    try {
      const response = await api.post(`/images/${id}/like`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to like image' };
    }
  },

  async deleteImage(id) {
    try {
      const response = await api.delete(`/images/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete image' };
    }
  },

  async updateImage(id, updateData) {
    try {
      const response = await api.put(`/images/${id}`, updateData);
      return response.data.image;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update image' };
    }
  },

  async searchImages(query, page = 1, limit = 10) {
    try {
      const response = await api.get(`/images/search/${encodeURIComponent(query)}?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to search images' };
    }
  }
};
