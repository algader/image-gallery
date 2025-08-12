import React, { useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import './ImageCard.css';

const ImageCard = ({ image, onLike, onDelete }) => {
  const { user } = useAuth();
  const [isLiking, setIsLiking] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleLike = async () => {
    if (!user) return;
    
    try {
      setIsLiking(true);
      const response = await api.toggleLike(image.id);
      onLike(image.id, response.data.likes.length, response.data.likes.includes(user.id));
    } catch (error) {
      console.error('Error liking image:', error);
    } finally {
      setIsLiking(false);
    }
  };

  const handleDelete = async () => {
    if (!user || image.userId !== user.id) return;
    
    if (!window.confirm('هل أنت متأكد من حذف هذه الصورة؟')) return;
    
    try {
      setIsDeleting(true);
      await api.deleteImage(image.id);
      onDelete(image.id);
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('فشل في حذف الصورة');
    } finally {
      setIsDeleting(false);
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

  return (
    <div className="image-card">
      <div className="image-container">
        <img 
          src={image.imageUrl}
          alt={image.title}
          className="image"
        />
        
        {user && (
          <div className="image-actions">
            <button
              onClick={handleLike}
              disabled={isLiking}
              className={`like-btn ${image.isLiked ? 'liked' : ''}`}
            >
              <span className="heart">❤️</span>
              <span className="like-count">{image.likes?.length || 0}</span>
            </button>
            
            {user.id === image.userId && (
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="delete-btn"
              >
                🗑️
              </button>
            )}
          </div>
        )}
      </div>
      
      <div className="image-info">
        <h3 className="image-title">{image.title}</h3>
        <p className="image-description">{image.description}</p>
        
        <div className="image-meta">
          <div className="uploader-info">
            <span className="uploader-name">
              {image.userName}
            </span>
            <span className="upload-date">{formatDate(image.createdAt)}</span>
          </div>
          
          <div className="image-stats">
            <span className="views">👁️ {image.views || 0}</span>
            <span className="likes">❤️ {image.likes?.length || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
