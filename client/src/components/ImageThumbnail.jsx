import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './ImageThumbnail.css';

const ImageThumbnail = ({ image, onLike }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [likeError, setLikeError] = useState('');
  const { user, isAuthenticated } = useAuth();

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      setIsModalOpen(false);
    }
  };

  const handleLike = async (e) => {
    e.stopPropagation(); // منع فتح المودال عند الضغط على الإعجاب
    
    if (!isAuthenticated) {
      alert('يجب تسجيل الدخول أولاً للإعجاب بالصور');
      return;
    }

    if (isLiking) return;

    try {
      setIsLiking(true);
      setLikeError('');
      await onLike(image._id);
    } catch (error) {
      console.error('Error liking image:', error);
      setLikeError('فشل في تسجيل الإعجاب. حاول مرة أخرى.');
      // إخفاء رسالة الخطأ بعد 3 ثواني
      setTimeout(() => setLikeError(''), 3000);
    } finally {
      setIsLiking(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isLikedByCurrentUser = user && image.likes && image.likes.includes(user._id || user.id);

  return (
    <>
      {/* مصغرة الصورة */}
      <div className="image-thumbnail" onClick={handleImageClick}>
        <div className="thumbnail-image-container">
          <img 
            src={`http://localhost:5001/${image.path}`}
            alt={image.title}
            className="thumbnail-image"
          />
          
          {/* طبقة المعلومات */}
          <div className="thumbnail-overlay">
            <div className="thumbnail-info">
              <h3 className="thumbnail-title">{image.title}</h3>
              <div className="thumbnail-stats">
                <span className="stat-item">
                  👁️ {image.views || 0}
                </span>
                <span className="stat-item">
                  ❤️ {image.likes?.length || 0}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* زر الإعجاب للمسجلين فقط */}
        {isAuthenticated && (
          <button
            onClick={handleLike}
            disabled={isLiking}
            className={`like-button ${isLikedByCurrentUser ? 'liked' : ''} ${isLiking ? 'loading' : ''}`}
            title={isLikedByCurrentUser ? 'إلغاء الإعجاب' : 'أعجبني'}
          >
            <span className="heart-icon">
              {isLiking ? '⏳' : (isLikedByCurrentUser ? '❤️' : '🤍')}
            </span>
            <span className="like-count">{image.likes?.length || 0}</span>
          </button>
        )}

        {/* عرض عدد الإعجابات للضيوف */}
        {!isAuthenticated && (
          <div className="guest-likes">
            <span className="heart-icon">❤️</span>
            <span className="like-count">{image.likes?.length || 0}</span>
          </div>
        )}
      </div>

      {/* مودال لعرض الصورة بالحجم الكامل */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content">
            <button 
              className="modal-close" 
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>
            
            <div className="modal-image-container">
              <img 
                src={`http://localhost:5001/${image.path}`}
                alt={image.title}
                className="modal-image"
              />
            </div>
            
            <div className="modal-info">
              <h2 className="modal-title">{image.title}</h2>
              <p className="modal-description">{image.description}</p>
              
              <div className="modal-meta">
                <div className="uploader-info">
                  <span className="uploader-name">
                    بواسطة: {image.uploadedBy?.firstName} {image.uploadedBy?.lastName}
                  </span>
                  <span className="upload-date">
                    {formatDate(image.createdAt)}
                  </span>
                </div>
                
                <div className="modal-stats">
                  <div className="stat-item">
                    <span className="stat-icon">👁️</span>
                    <span className="stat-value">{image.views || 0}</span>
                    <span className="stat-label">مشاهدة</span>
                  </div>
                  
                  <div className="stat-item">
                    <span className="stat-icon">❤️</span>
                    <span className="stat-value">{image.likes?.length || 0}</span>
                    <span className="stat-label">إعجاب</span>
                  </div>
                </div>
              </div>

              {/* زر الإعجاب في المودال */}
              {isAuthenticated && (
                <button
                  onClick={handleLike}
                  disabled={isLiking}
                  className={`modal-like-button ${isLikedByCurrentUser ? 'liked' : ''}`}
                >
                  <span className="heart-icon">
                    {isLikedByCurrentUser ? '❤️' : '🤍'}
                  </span>
                  <span>{isLikedByCurrentUser ? 'تم الإعجاب' : 'أعجبني'}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageThumbnail;
