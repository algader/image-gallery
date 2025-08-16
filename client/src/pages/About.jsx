import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import './About.css';

const About = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: '🎨',
      titleKey: 'about.features.sharing.title',
      descKey: 'about.features.sharing.desc'
    },
    {
      icon: '🔒',
      titleKey: 'about.features.security.title',
      descKey: 'about.features.security.desc'
    },
    {
      icon: '🌍',
      titleKey: 'about.features.multilingual.title',
      descKey: 'about.features.multilingual.desc'
    },
    {
      icon: '📱',
      titleKey: 'about.features.responsive.title',
      descKey: 'about.features.responsive.desc'
    },
    {
      icon: '⚡',
      titleKey: 'about.features.fast.title',
      descKey: 'about.features.fast.desc'
    },
    {
      icon: '👥',
      titleKey: 'about.features.community.title',
      descKey: 'about.features.community.desc'
    }
  ];

  const team = [
    {
      name: 'د. أحمد محمد السكري',
      role: 'about.team.founder.role',
      image: '👨‍💻',
      bio: 'about.team.founder.bio'
    },
    {
      name: 'المهندسة سارة أحمد الزهراني',
      role: 'about.team.designer.role',
      image: '👩‍🎨',
      bio: 'about.team.designer.bio'
    },
    {
      name: 'المهندس محمد علي القحطاني',
      role: 'about.team.developer.role',
      image: '👨‍💼',
      bio: 'about.team.developer.bio'
    }
  ];

  const stats = [
    { numberKey: 'about.stats.users.number', labelKey: 'about.stats.users.label' },
    { numberKey: 'about.stats.photos.number', labelKey: 'about.stats.photos.label' },
    { numberKey: 'about.stats.countries.number', labelKey: 'about.stats.countries.label' },
    { numberKey: 'about.stats.languages.number', labelKey: 'about.stats.languages.label' }
  ];

  const achievements = [
    {
      icon: '🏆',
      titleKey: 'about.achievements.tech.title',
      descKey: 'about.achievements.tech.desc'
    },
    {
      icon: '⭐',
      titleKey: 'about.achievements.users.title',
      descKey: 'about.achievements.users.desc'
    },
    {
      icon: '🚀',
      titleKey: 'about.achievements.growth.title',
      descKey: 'about.achievements.growth.desc'
    },
    {
      icon: '🌍',
      titleKey: 'about.achievements.global.title',
      descKey: 'about.achievements.global.desc'
    }
  ];

  const services = [
    {
      icon: '🖼️',
      titleKey: 'about.services.platform.title',
      descKey: 'about.services.platform.desc'
    },
    {
      icon: '🔧',
      titleKey: 'about.services.api.title',
      descKey: 'about.services.api.desc'
    },
    {
      icon: '📊',
      titleKey: 'about.services.analytics.title',
      descKey: 'about.services.analytics.desc'
    },
    {
      icon: '🛡️',
      titleKey: 'about.services.security.title',
      descKey: 'about.services.security.desc'
    }
  ];

  return (
    <div className="about-container">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-content">
          <h1 className="hero-title">{t('about.hero.title')}</h1>
          <p className="hero-subtitle">{t('about.hero.subtitle')}</p>
          <div className="hero-stats">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <span className="stat-number">{t(stat.numberKey)}</span>
                <span className="stat-label">{t(stat.labelKey)}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="hero-image">
          <div className="hero-gallery">
            <div className="gallery-item">📸</div>
            <div className="gallery-item">🖼️</div>
            <div className="gallery-item">🎨</div>
            <div className="gallery-item">📷</div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="about-story">
        <div className="container">
          <h2 className="section-title">{t('about.story.title')}</h2>
          <div className="story-content">
            <div className="story-text">
              <p className="story-paragraph">{t('about.story.paragraph1')}</p>
              <p className="story-paragraph">{t('about.story.paragraph2')}</p>
              <p className="story-paragraph">{t('about.story.paragraph3')}</p>
            </div>
            <div className="story-timeline">
              <div className="timeline-item">
                <div className="timeline-year">2020</div>
                <div className="timeline-event">{t('about.timeline.2020')}</div>
              </div>
              <div className="timeline-item">
                <div className="timeline-year">2022</div>
                <div className="timeline-event">{t('about.timeline.2022')}</div>
              </div>
              <div className="timeline-item">
                <div className="timeline-year">2023</div>
                <div className="timeline-event">{t('about.timeline.2023')}</div>
              </div>
              <div className="timeline-item">
                <div className="timeline-year">2025</div>
                <div className="timeline-event">{t('about.timeline.2025')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="about-features">
        <div className="container">
          <h2 className="section-title">{t('about.features.title')}</h2>
          <p className="section-subtitle">{t('about.features.subtitle')}</p>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{t(feature.titleKey)}</h3>
                <p className="feature-description">{t(feature.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="about-mission">
        <div className="container">
          <div className="mission-grid">
            <div className="mission-item">
              <h3 className="mission-title">{t('about.mission.title')}</h3>
              <p className="mission-text">{t('about.mission.content')}</p>
            </div>
            <div className="mission-item">
              <h3 className="mission-title">{t('about.vision.title')}</h3>
              <p className="mission-text">{t('about.vision.content')}</p>
            </div>
            <div className="mission-item">
              <h3 className="mission-title">{t('about.values.title')}</h3>
              <p className="mission-text">{t('about.values.content')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="about-achievements">
        <div className="container">
          <h2 className="section-title">{t('about.achievements.title')}</h2>
          <p className="section-subtitle">{t('about.achievements.subtitle')}</p>
          <div className="achievements-grid">
            {achievements.map((achievement, index) => (
              <div key={index} className="achievement-card">
                <div className="achievement-icon">{achievement.icon}</div>
                <h3 className="achievement-title">{t(achievement.titleKey)}</h3>
                <p className="achievement-description">{t(achievement.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="about-services">
        <div className="container">
          <h2 className="section-title">{t('about.services.title')}</h2>
          <p className="section-subtitle">{t('about.services.subtitle')}</p>
          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card">
                <div className="service-icon">{service.icon}</div>
                <h3 className="service-title">{t(service.titleKey)}</h3>
                <p className="service-description">{t(service.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="about-team">
        <div className="container">
          <h2 className="section-title">{t('about.team.title')}</h2>
          <p className="section-subtitle">{t('about.team.subtitle')}</p>
          <div className="team-grid">
            {team.map((member, index) => (
              <div key={index} className="team-card">
                <div className="team-avatar">{member.image}</div>
                <h3 className="team-name">{member.name}</h3>
                <p className="team-role">{t(member.role)}</p>
                <p className="team-bio">{t(member.bio)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="about-contact">
        <div className="container">
          <h2 className="section-title">{t('about.contact.title')}</h2>
          <div className="contact-content">
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-icon">📧</span>
                <span className="contact-text">info@theexhibition.com</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📱</span>
                <span className="contact-text">+966 50 123 4567</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <span className="contact-text">{t('about.contact.address')}</span>
              </div>
            </div>
            <div className="contact-social">
              <h4>{t('about.contact.followUs')}</h4>
              <div className="social-links">
                <a href="#" className="social-link">📘 Facebook</a>
                <a href="#" className="social-link">📷 Instagram</a>
                <a href="#" className="social-link">🐦 Twitter</a>
                <a href="#" className="social-link">💼 LinkedIn</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
