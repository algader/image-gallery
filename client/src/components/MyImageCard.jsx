import React, { useState } from 'react';
import api from '../services/api';
import './MyImageCard.css';

const MyImageCard = ({ image, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editData, setEditData] = useState({
    title: image.title,
    description: image.description
  });
  const [fieldErrors, setFieldErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    
    if (!editData.title.trim()) {
      errors.title = 'العنوان مطلوب';
    } else if (editData.title.trim().length < 2) {
      errors.title = 'العنوان يجب أن يكون حرفين على الأقل';
    } else if (editData.title.trim().length > 100) {
      errors.title = 'العنوان لا يجب أن يتجاوز 100 حرف';
    }
    
    if (!editData.description.trim()) {
      errors.description = 'الوصف مطلوب';
    } else if (editData.description.trim().length < 5) {
      errors.description = 'الوصف يجب أن يكون 5 أحرف على الأقل';
    } else if (editData.description.trim().length > 500) {
      errors.description = 'الوصف لا يجب أن يتجاوز 500 حرف';
    }
    
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({
      title: image.title,
      description: image.description
    });
    setFieldErrors({});
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditData({
      title: image.title,
      description: image.description
    });
    setFieldErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: value
    });
    
    // إزالة رسالة الخطأ عند بدء الكتابة
    if (fieldErrors[name]) {
      setFieldErrors({
        ...fieldErrors,
        [name]: ''
      });
    }
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const updatedImage = await api.updateImage(image.id, {
        title: editData.title.trim(),
        description: editData.description.trim()
      });
      
      onUpdate(image.id, updatedImage.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating image:', error);
      alert('فشل في تحديث الصورة. حاول مرة أخرى');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await api.deleteImage(image.id);
      onDelete(image.id);
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('فشل في حذف الصورة. حاول مرة أخرى');
      setIsDeleting(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="my-image-card">
      <div className="image-container">
        <img 
          src={image.imageUrl} 
          alt={image.title}
          className="image"
        />
        
        <div className="image-overlay">
          <div className="image-actions">
            <button 
              onClick={handleEdit}
              className="action-btn edit-btn"
              disabled={isEditing}
              title="تعديل معلومات الصورة"
            >
              ✏️
            </button>
            <button 
              onClick={() => setShowDeleteConfirm(true)}
              className="action-btn delete-btn"
              disabled={isDeleting}
              title="حذف الصورة"
            >
              🗑️
            </button>
          </div>
        </div>
      </div>

      <div className="image-content">
        {isEditing ? (
          <div className="edit-form">
            <div className="form-group">
              <label htmlFor={`title-${image.id}`}>العنوان</label>
              <input
                id={`title-${image.id}`}
                type="text"
                name="title"
                value={editData.title}
                onChange={handleInputChange}
                className={fieldErrors.title ? 'error' : ''}
                placeholder="عنوان الصورة"
                maxLength="100"
              />
              {fieldErrors.title && (
                <span className="field-error">{fieldErrors.title}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor={`description-${image.id}`}>الوصف</label>
              <textarea
                id={`description-${image.id}`}
                name="description"
                value={editData.description}
                onChange={handleInputChange}
                className={fieldErrors.description ? 'error' : ''}
                placeholder="وصف الصورة"
                rows="3"
                maxLength="500"
              />
              {fieldErrors.description && (
                <span className="field-error">{fieldErrors.description}</span>
              )}
              <div className="char-count">
                {editData.description.length}/500
              </div>
            </div>

            <div className="edit-actions">
              <button 
                onClick={handleSave}
                disabled={isLoading}
                className="save-btn"
              >
                {isLoading ? 'جاري الحفظ...' : 'حفظ'}
              </button>
              <button 
                onClick={handleCancelEdit}
                disabled={isLoading}
                className="cancel-btn"
              >
                إلغاء
              </button>
            </div>
          </div>
        ) : (
          <div className="image-info">
            <h3 className="image-title">{image.title}</h3>
            <p className="image-description">{image.description}</p>
            
            <div className="image-stats">
              <div className="stat">
                <span className="stat-icon">👁️</span>
                <span className="stat-value">{image.views || 0}</span>
                <span className="stat-label">مشاهدة</span>
              </div>
              <div className="stat">
                <span className="stat-icon">❤️</span>
                <span className="stat-value">{image.likes?.length || 0}</span>
                <span className="stat-label">إعجاب</span>
              </div>
            </div>
            
            <div className="upload-date">
              تم الرفع: {formatDate(image.createdAt)}
            </div>
          </div>
        )}
      </div>

      {/* مودال تأكيد الحذف */}
      {showDeleteConfirm && (
        <div className="delete-modal-overlay">
          <div className="delete-modal">
            <div className="delete-modal-content">
              <h3>تأكيد الحذف</h3>
              <p>هل أنت متأكد من حذف هذه الصورة؟</p>
              <p className="warning-text">لا يمكن التراجع عن هذا الإجراء</p>
              
              <div className="delete-modal-actions">
                <button 
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="confirm-delete-btn"
                >
                  {isDeleting ? 'جاري الحذف...' : 'نعم، احذف'}
                </button>
                <button 
                  onClick={() => setShowDeleteConfirm(false)}
                  disabled={isDeleting}
                  className="cancel-delete-btn"
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyImageCard;
