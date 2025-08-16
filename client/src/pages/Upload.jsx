import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { imageService } from '../services';
import './Upload.css';

const Upload = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null
  });
  const [preview, setPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      // Validate file type
      if (!file.type.match(/^image\/(jpeg|png)$/)) {
        setError('يرجى اختيار صورة بصيغة PNG أو JPEG فقط');
        return;
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setError('حجم الصورة يجب أن يكون أقل من 5 ميجابايت');
        return;
      }

      setFormData(prev => ({
        ...prev,
        image: file
      }));

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result);
      };
      reader.readAsDataURL(file);
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.description.trim() || !formData.image) {
      setError('جميع الحقول مطلوبة');
      return;
    }

    setIsUploading(true);
    setError('');

    try {
      const uploadData = new FormData();
      uploadData.append('title', formData.title);
      uploadData.append('description', formData.description);
      uploadData.append('image', formData.image);

      await imageService.uploadImage(uploadData);
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        image: null
      });
      setPreview(null);
      
      // Redirect to home
      navigate('/');
    } catch (error) {
      setError(error.message || 'فشل في رفع الصورة');
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      image: null
    }));
    setPreview(null);
  };

  return (
    <div className="upload-container">
      <div className="upload-card">
        <h2>رفع صورة جديدة</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>عنوان الصورة</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="أدخل عنوان الصورة"
              disabled={isUploading}
            />
          </div>

          <div className="form-group">
            <label>وصف الصورة</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="أدخل وصف الصورة"
              rows="4"
              disabled={isUploading}
            ></textarea>
          </div>

          <div className="form-group">
            <label>الصورة (PNG أو JPEG فقط)</label>
            
            {!preview ? (
              <div className="file-upload-area">
                <input
                  type="file"
                  accept="image/png,image/jpeg"
                  onChange={handleFileChange}
                  disabled={isUploading}
                  className="file-input"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="file-upload-label">
                  <div className="upload-icon">📷</div>
                  <div className="upload-text">
                    <strong>اضغط لاختيار صورة</strong>
                    <span>أو اسحب الصورة هنا</span>
                  </div>
                  <div className="upload-info">
                    صيغ مدعومة: PNG, JPEG (حد أقصى 5MB)
                  </div>
                </label>
              </div>
            ) : (
              <div className="image-preview">
                <img src={preview} alt="Preview" />
                <button
                  type="button"
                  onClick={removeImage}
                  className="remove-image-btn"
                  disabled={isUploading}
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          <div className="form-actions">
            <button
              type="submit"
              disabled={isUploading || !formData.title || !formData.description || !formData.image}
              className="upload-btn"
            >
              {isUploading ? 'جاري الرفع...' : 'رفع الصورة'}
            </button>
            
            <button
              type="button"
              onClick={() => navigate('/')}
              className="cancel-btn"
              disabled={isUploading}
            >
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Upload;
