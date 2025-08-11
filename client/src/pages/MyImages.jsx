import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { imageService } from '../services';
import { useAuth } from '../context/AuthContext';
import MyImageCard from '../components/MyImageCard';
import LoadingSpinner from '../components/LoadingSpinner';
import './MyImages.css';

const MyImages = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { user } = useAuth();

  useEffect(() => {
    fetchMyImages();
  }, [currentPage]);

  const fetchMyImages = async () => {
    try {
      setLoading(true);
      const response = await imageService.getMyImages(currentPage);
      setImages(response.images);
      setTotalPages(response.totalPages);
      setError('');
    } catch (error) {
      setError(error.message || 'فشل في تحميل صورك');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleImageUpdate = (imageId, updatedImage) => {
    setImages(images.map(image => 
      image._id === imageId ? updatedImage : image
    ));
  };

  const handleImageDelete = (imageId) => {
    setImages(images.filter(image => image._id !== imageId));
  };

  if (loading && currentPage === 1) {
    return <LoadingSpinner />;
  }

  return (
    <div className="my-images-container">
      <div className="my-images-header">
        <h1>صوري</h1>
        <p>إدارة وعرض جميع الصور التي رفعتها</p>
        
        <Link to="/upload" className="upload-new-btn">
          + رفع صورة جديدة
        </Link>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {images.length === 0 && !loading ? (
        <div className="no-images-state">
          <div className="no-images-icon">📷</div>
          <h3>لا توجد صور بعد</h3>
          <p>لم تقم برفع أي صور حتى الآن</p>
          <Link to="/upload" className="upload-first-btn">
            رفع أول صورة
          </Link>
        </div>
      ) : (
        <>
          <div className="images-stats">
            <div className="stat-item">
              <span className="stat-number">{images.length}</span>
              <span className="stat-label">صورة</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">
                {images.reduce((total, img) => total + (img.likes?.length || 0), 0)}
              </span>
              <span className="stat-label">إعجاب</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">
                {images.reduce((total, img) => total + (img.views || 0), 0)}
              </span>
              <span className="stat-label">مشاهدة</span>
            </div>
          </div>

          <div className="images-grid">
            {images.map((image) => (
              <MyImageCard
                key={image._id}
                image={image}
                onUpdate={handleImageUpdate}
                onDelete={handleImageDelete}
              />
            ))}
          </div>
        </>
      )}

      {loading && currentPage > 1 && (
        <div className="loading-more">
          <LoadingSpinner />
        </div>
      )}

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="pagination-btn"
          >
            السابق
          </button>

          <div className="pagination-numbers">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`pagination-number ${currentPage === page ? 'active' : ''}`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="pagination-btn"
          >
            التالي
          </button>
        </div>
      )}
    </div>
  );
};

export default MyImages;
