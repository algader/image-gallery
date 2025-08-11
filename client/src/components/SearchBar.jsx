import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const { t } = useLanguage();
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div className="search-bar-container">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-group">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('home.searchPlaceholder')}
            className="search-input"
          />
          
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="clear-btn"
            >
              ✕
            </button>
          )}
          
          <button type="submit" className="search-btn">
            🔍
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
