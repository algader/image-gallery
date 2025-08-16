import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Upload from './pages/Upload';
import MyImages from './pages/MyImages';
import './App.css';

// مكون لتحديث عنوان الصفحة
const PageTitle = () => {
  const { t } = useLanguage();
  
  useEffect(() => {
    document.title = `🎨 ${t('nav.title')} - ${t('nav.subtitle')}`;
  }, [t]);
  
  return null;
};

function AppContent() {
  return (
    <AuthProvider>
      <Router>
        <PageTitle />
        <div className="App">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route 
                path="/upload" 
                element={
                  <ProtectedRoute>
                    <Upload />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/my-images" 
                element={
                  <ProtectedRoute>
                    <MyImages />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
