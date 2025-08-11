import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          📸 {t('home.title')}
        </Link>

        <div className="nav-menu">
          <Link to="/" className="nav-link">
            {t('nav.home')}
          </Link>

          <Link to="/about" className="nav-link">
            {t('nav.about')}
          </Link>

          {user ? (
            <>
              <Link to="/upload" className="nav-link">
                {t('nav.upload')}
              </Link>
              
              <Link to="/my-images" className="nav-link">
                {t('nav.myImages')}
              </Link>
              
              <div className="user-menu">
                <span className="user-name">
                  {t('nav.welcome')}، {user.firstName}
                </span>
                
                <button onClick={handleLogout} className="logout-btn">
                  {t('nav.logout')}
                </button>
              </div>
            </>
          ) : (
            <div className="auth-links">
              <Link to="/login" className="nav-link">
                {t('nav.login')}
              </Link>
              
              <Link to="/register" className="nav-link register-link">
                {t('nav.register')}
              </Link>
            </div>
          )}
          
          {/* مبدل اللغة */}
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
