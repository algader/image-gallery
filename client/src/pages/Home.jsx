import React, { useState, useEffect } from 'react';
import { imageService } from '../services';
import { useLanguage } from '../context/LanguageContext';
import ImageThumbnail from '../components/ImageThumbnail';
import SearchBar from '../components/SearchBar';
import LoadingSpinner from '../components/LoadingSpinner';
import './Home.css';

const Home = () => {
  const { t } = useLanguage();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    fetchImages();
  }, [currentPage]);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await imageService.getAllImages(currentPage);
      setImages(response.images);
      setTotalPages(response.totalPages);
      setError('');
    } catch (error) {
      setError(error.message || t('home.loadError'));
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    console.log('🔍 البحث بدأ:', query);
    
    if (!query.trim()) {
      setSearchQuery('');
      setIsSearching(false);
      setCurrentPage(1);
      fetchImages();
      return;
    }

    try {
      setIsSearching(true);
      setLoading(true);
      setSearchQuery(query);
      console.log('📡 إرسال طلب البحث:', query);
      const response = await imageService.searchImages(query);
      console.log('📥 استلام نتائج البحث:', response);
      setImages(response.images);
      setTotalPages(response.totalPages);
      setCurrentPage(1);
      setError('');
    } catch (error) {
      console.error('❌ خطأ في البحث:', error);
      setError(error.message || t('home.searchError'));
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleImageLike = async (imageId) => {
    try {
      const response = await imageService.likeImage(imageId);
      
      // تحديث الصورة في القائمة
      setImages(images.map(image => 
        image._id === imageId 
          ? { 
              ...image, 
              likes: response.likes,
              isLiked: response.isLiked
            }
          : image
      ));
      
      return response;
    } catch (error) {
      console.error('Error liking image:', error);
      throw error;
    }
  };

  const handleImageDelete = (imageId) => {
    setImages(images.filter(image => image._id !== imageId));
  };

  if (loading && currentPage === 1) {
    return <LoadingSpinner />;
  }

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>{t('home.title')}</h1>
        <p>{t('home.subtitle')}</p>
      </div>

      <SearchBar onSearch={handleSearch} />

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {isSearching && (
        <div className="search-info">
          {t('home.searchResults')}: "{searchQuery}" - {t('home.foundImages')} {images.length} {t('myImages.images')}
        </div>
      )}

      {images.length === 0 && !loading ? (
        <div className="no-images">
          {isSearching ? 
            `${t('home.noImagesFound')}: "${searchQuery}"` : 
            t('home.noImages')
          }
          {isSearching && (
            <div style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
              {t('home.searchHint')}
            </div>
          )}
        </div>
      ) : (
        <div className="images-grid">
          {images.map((image) => (
            <ImageThumbnail
              key={image._id}
              image={image}
              onLike={handleImageLike}
            />
          ))}
        </div>
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
            {t('home.previous')}
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
            {t('home.next')}
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
