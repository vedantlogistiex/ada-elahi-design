import React from 'react';
import { useApp } from '../../context/AppContext';

export const MoreView = () => {
  const { t, currentLang, toggleLanguage } = useApp();

  return (
    <section className="screen-view active" id="viewMore">
      <div className="greeting">
        <h1 className="page-title">{t('moreTitle')}</h1>
        <div className="page-sub">{t('moreSubtitle')}</div>
      </div>

      {/* Executive Profile Card */}
      <div className="profile-row">
        <div className="profile-avatar">AUH</div>
        <div>
          <div className="profile-name">{t('execName')}</div>
          <div className="profile-role">Abu Dhabi Airports Group · Executive Office</div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid var(--border-subtle)' }}>
        <span style={{ fontSize: '13px', color: 'var(--ada-slate)', fontWeight: 600 }}>
          {currentLang === 'ar' ? 'مستوى التصريح' : 'Clearance Level'}
        </span>
        <span className="pill ok">Level 1 · Sovereign AI</span>
      </div>

      {/* Preferences Section */}
      <div className="section-label" style={{ marginTop: '20px' }}>{t('prefsKicker')}</div>

      <div className="card" style={{ padding: '4px 0' }}>
        <div className="card-row" style={{ cursor: 'pointer' }} onClick={toggleLanguage}>
          <span style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--ada-navy)' }}>{t('langPrefTitle')}</span>
          <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--ada-blue)' }}>
            {currentLang === 'ar' ? 'العربية (RTL) →' : 'English (LTR) →'}
          </span>
        </div>
        <div className="card-row" style={{ cursor: 'pointer' }}>
          <span style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--ada-navy)' }}>{t('auditLogTitle')}</span>
          <span style={{ fontWeight: 700, color: 'var(--ada-blue)' }}>→</span>
        </div>
      </div>

      {/* Sovereign AI Governance Footer */}
      <div style={{ textAlign: 'center', padding: '32px 0 16px', fontSize: '12px', color: 'var(--ada-grey)', lineHeight: 1.6 }}>
        <div style={{ fontWeight: 700, color: 'var(--ada-navy)', marginBottom: '3px' }}>
          Private Sovereign AI Architecture
        </div>
        On-premise air-gapped execution · Department of Government Enablement
      </div>
    </section>
  );
};
