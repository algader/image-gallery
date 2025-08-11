import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import './Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const { login, isAuthenticated, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();


  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

 
  if (authLoading) {
    return <LoadingSpinner />;
  }


  if (isAuthenticated) {
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    

    if (fieldErrors[name]) {
      setFieldErrors({
        ...fieldErrors,
        [name]: '',
      });
    }
    if (error) {
      setError('');
    }
  };

  const validateForm = () => {
    const errors = {};
    
  
    if (!formData.email) {
      errors.email = 'البريد الإلكتروني مطلوب';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'البريد الإلكتروني غير صالح';
    }
    
  
    if (!formData.password) {
      errors.password = 'كلمة المرور مطلوبة';
    } else if (formData.password.length < 6) {
      errors.password = 'كلمة المرور يجب أن تكون 6 أحرف على الأقل';
    }
    
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const getErrorMessage = (error) => {
  
    if (typeof error === 'string') {
      if (error.includes('Invalid credentials') || error.includes('Incorrect password')) {
        return 'البريد الإلكتروني أو كلمة المرور غير صحيحة';
      }
      if (error.includes('User not found')) {
        return 'لا يوجد حساب مرتبط بهذا البريد الإلكتروني';
      }
      if (error.includes('Account not verified')) {
        return 'يرجى تفعيل حسابك أولاً';
      }
      if (error.includes('Too many attempts')) {
        return 'تم تجاوز عدد المحاولات المسموحة. حاول لاحقاً';
      }
      if (error.includes('Network Error')) {
        return 'خطأ في الاتصال. تحقق من اتصالك بالإنترنت';
      }
    }
    
    return error.message || 'فشل في تسجيل الدخول. حاول مرة أخرى';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    

    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);

    try {
      await login(formData);
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Login error:', error);
      setError(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>تسجيل الدخول</h2>
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="email">البريد الإلكتروني</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="أدخل بريدك الإلكتروني"
              className={fieldErrors.email ? 'error' : ''}
              autoComplete="email"
            />
            {fieldErrors.email && (
              <span className="field-error">{fieldErrors.email}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">كلمة المرور</label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="أدخل كلمة المرور"
              className={fieldErrors.password ? 'error' : ''}
              autoComplete="current-password"
            />
            {fieldErrors.password && (
              <span className="field-error">{fieldErrors.password}</span>
            )}
          </div>

          <button 
            type="submit" 
            disabled={isLoading || Object.keys(fieldErrors).some(key => fieldErrors[key])} 
            className="auth-button"
          >
            {isLoading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
          </button>
        </form>

        <p className="auth-link">
          لا تملك حساب؟ <Link to="/register">أنشئ حساب جديد</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
