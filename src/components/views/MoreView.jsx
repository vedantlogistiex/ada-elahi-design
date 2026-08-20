import React from 'react';
import { useApp } from '../../context/AppContext';

export const MoreView = () => {
  const { t, currentLang, toggleLanguage } = useApp();

  return (
    <section className="screen-view active" id="viewMore">
      <div className="greeting">
        <h1 className="page-title" data-i18n="moreTitle">{t('moreTitle')}</h1>
        <div className="page-sub">{t('moreSubtitle')}</div>
      </div>

      {/* Executive Profile */}
      <div className="profile-row">
        <div className="profile-avatar">AUH</div>
        <div>
          <div className="profile-name">{t('execName')}</div>
          <div className="profile-role">Abu Dhabi Airports Group · Executive Office</div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid var(--border-glass)' }}>
        <span style={{ fontSize: '13px', color: 'var(--ink-secondary)', fontWeight: 600 }}>Clearance Level</span>
        <span className="pill ok">Level 1 · Sovereign AI Clearance</span>
      </div>

      {/* Executive Preferences */}
      <div className="section-label">{t('prefsKicker')}</div>

      <div className="card" style={{ padding: '4px 0' }}>
        <div className="card-row" style={{ cursor: 'pointer' }} onClick={toggleLanguage}>
          <span style={{ fontSize: '14px', fontWeight: 600, color: '#FFFFFF' }}>{t('langPrefTitle')}</span>
          <button className="btn-link" style={{ fontSize: '13.5px', fontWeight: 700 }} type="button">
            {currentLang === 'ar' ? 'العربية (RTL) →' : 'English (LTR) →'}
          </button>
        </div>
        <div className="card-row" style={{ cursor: 'pointer' }}>
          <span style={{ fontSize: '14px', fontWeight: 600, color: '#FFFFFF' }}>{t('auditLogTitle')}</span>
          <span style={{ color: 'var(--accent-cyan)', fontWeight: 700 }}>→</span>
        </div>
      </div>

      {/* Sovereign AI Footer */}
      <div style={{ textAlign: 'center', padding: '36px 0 16px', fontSize: '12px', color: 'var(--ink-muted)', lineHeight: 1.65 }}>
        <div style={{ fontWeight: 700, color: '#94A3B8', marginBottom: '4px' }}>Private Sovereign AI Architecture</div>
        On-premise air-gapped execution · Department of Government Enablement
      </div>
    </section>
  );
};
