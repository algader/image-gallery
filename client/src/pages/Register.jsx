import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const { register, isAuthenticated, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();

  // إعادة توجيه المستخدم المسجل دخوله إلى الصفحة الرئيسية
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // إذا كان التطبيق يتحقق من حالة المصادقة، أظهر شاشة التحميل
  if (authLoading) {
    return <LoadingSpinner />;
  }

  // إذا كان المستخدم مسجل دخوله، لا تظهر شيئاً (سيتم إعادة التوجيه)
  if (isAuthenticated) {
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // إزالة رسالة الخطأ عند بدء الكتابة
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
    
    // التحقق من الاسم الأول
    if (!formData.firstName.trim()) {
      errors.firstName = 'الاسم الأول مطلوب';
    } else if (formData.firstName.trim().length < 2) {
      errors.firstName = 'الاسم الأول يجب أن يكون حرفين على الأقل';
    }
    
    // التحقق من الاسم الأخير
    if (!formData.lastName.trim()) {
      errors.lastName = 'الاسم الأخير مطلوب';
    } else if (formData.lastName.trim().length < 2) {
      errors.lastName = 'الاسم الأخير يجب أن يكون حرفين على الأقل';
    }
    
    // التحقق من اسم المستخدم
    if (!formData.username.trim()) {
      errors.username = 'اسم المستخدم مطلوب';
    } else if (formData.username.trim().length < 3) {
      errors.username = 'اسم المستخدم يجب أن يكون 3 أحرف على الأقل';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      errors.username = 'اسم المستخدم يجب أن يحتوي على أحرف وأرقام فقط';
    }
    
    // التحقق من البريد الإلكتروني
    if (!formData.email) {
      errors.email = 'البريد الإلكتروني مطلوب';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'البريد الإلكتروني غير صالح';
    }
    
    // التحقق من كلمة المرور
    if (!formData.password) {
      errors.password = 'كلمة المرور مطلوبة';
    } else if (formData.password.length < 6) {
      errors.password = 'كلمة المرور يجب أن تكون 6 أحرف على الأقل';
    }
    
    // التحقق من تأكيد كلمة المرور
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'تأكيد كلمة المرور مطلوب';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'كلمتا المرور غير متطابقتان';
    }
    
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const getErrorMessage = (error) => {
    console.log('Registration error details:', error);
    
    // ترجمة رسائل الخطأ الشائعة
    if (typeof error === 'string') {
      if (error.includes('already exists') || error.includes('duplicate') || error.includes('مسجل مسبقاً')) {
        return 'البريد الإلكتروني أو اسم المستخدم مسجل مسبقاً';
      }
      if (error.includes('Invalid email') || error.includes('غير صالح')) {
        return 'البريد الإلكتروني غير صالح';
      }
      if (error.includes('Password too weak')) {
        return 'كلمة المرور ضعيفة جداً';
      }
      if (error.includes('Network Error') || error.includes('خطأ في الاتصال')) {
        return 'خطأ في الاتصال. تحقق من أن الخادم يعمل على المنفذ 5001';
      }
      return error;
    }
    
    // إذا كان الخطأ كائن
    if (error && error.message) {
      return error.message;
    }
    
    return 'فشل في إنشاء الحساب. تحقق من أن الخادم يعمل';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // التحقق من صحة النموذج
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const { confirmPassword, ...dataToSend } = formData;
      await register(dataToSend);
      // تسجيل الدخول تلقائياً بعد إنشاء الحساب - يتم في AuthContext
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Registration error:', error);
      setError(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>إنشاء حساب جديد</h2>
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">الاسم الأول</label>
              <input
                id="firstName"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                placeholder="الاسم الأول"
                className={fieldErrors.firstName ? 'error' : ''}
                autoComplete="given-name"
              />
              {fieldErrors.firstName && (
                <span className="field-error">{fieldErrors.firstName}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="lastName">الاسم الأخير</label>
              <input
                id="lastName"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                placeholder="الاسم الأخير"
                className={fieldErrors.lastName ? 'error' : ''}
                autoComplete="family-name"
              />
              {fieldErrors.lastName && (
                <span className="field-error">{fieldErrors.lastName}</span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="username">اسم المستخدم</label>
            <input
              id="username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="اسم المستخدم"
              className={fieldErrors.username ? 'error' : ''}
              autoComplete="username"
            />
            {fieldErrors.username && (
              <span className="field-error">{fieldErrors.username}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">البريد الإلكتروني</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="البريد الإلكتروني"
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
              placeholder="كلمة المرور (6 أحرف على الأقل)"
              className={fieldErrors.password ? 'error' : ''}
              autoComplete="new-password"
            />
            {fieldErrors.password && (
              <span className="field-error">{fieldErrors.password}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">تأكيد كلمة المرور</label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="تأكيد كلمة المرور"
              className={fieldErrors.confirmPassword ? 'error' : ''}
              autoComplete="new-password"
            />
            {fieldErrors.confirmPassword && (
              <span className="field-error">{fieldErrors.confirmPassword}</span>
            )}
          </div>

          <button 
            type="submit" 
            disabled={isLoading || Object.keys(fieldErrors).some(key => fieldErrors[key])} 
            className="auth-button"
          >
            {isLoading ? 'جاري إنشاء الحساب...' : 'إنشاء حساب'}
          </button>
        </form>

        <p className="auth-link">
          لديك حساب بالفعل؟ <Link to="/login">سجل دخولك</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
