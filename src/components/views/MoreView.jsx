import React from 'react';
import { useApp } from '../../context/AppContext';

export const MoreView = () => {
  const { t, currentLang, toggleLanguage, setActiveSheet } = useApp();

  return (
    <section className="screen-view active" id="viewMore">
      <h1 className="screen-title" data-i18n="moreTitle">
        {t('moreTitle')}
      </h1>
      <div className="screen-subtitle" data-i18n="moreSubtitle">
        {t('moreSubtitle')}
      </div>

      {/* Executive Profile Card */}
      <div className="exec-card" style={{ padding: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'var(--navy)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '16px' }}>
            AUH
          </div>
          <div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--navy)' }} data-i18n="execName">
              {t('execName')}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--secondary-grey)' }} data-i18n="execOrg">
              {t('execOrg')}
            </div>
          </div>
        </div>
        <div style={{ background: 'var(--app-bg)', padding: '8px 12px', borderRadius: 'var(--radius-sm)', fontSize: '12px', display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--secondary-grey)' }} data-i18n="clearanceLabel">
            {t('clearanceLabel')}
          </span>
          <b style={{ color: 'var(--aviation-teal)' }} data-i18n="clearanceValue">
            {t('clearanceValue')}
          </b>
        </div>
      </div>

      {/* Settings Items */}
      <div className="section-kicker" data-i18n="prefsKicker">
        {t('prefsKicker')}
      </div>
      <div className="exec-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div
          style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', cursor: 'pointer' }}
          onClick={toggleLanguage}
        >
          <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--navy)' }} data-i18n="langPrefTitle">
            {t('langPrefTitle')}
          </span>
          <span style={{ fontSize: '13px', color: 'var(--airport-blue)', fontWeight: 600 }} id="moreLangValue">
            {currentLang === 'ar' ? 'العربية (الإمارات)' : 'English (US)'}
          </span>
        </div>

        <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)' }}>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--navy)' }} data-i18n="notifPrefTitle">
              {t('notifPrefTitle')}
            </div>
            <div style={{ fontSize: '11.5px', color: 'var(--secondary-grey)' }} data-i18n="notifPrefDesc">
              {t('notifPrefDesc')}
            </div>
          </div>
          <input type="checkbox" defaultChecked style={{ accentColor: 'var(--airport-blue)', width: '18px', height: '18px' }} />
        </div>

        <div
          style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
          onClick={() => setActiveSheet('why')}
        >
          <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--navy)' }} data-i18n="auditLogTitle">
            {t('auditLogTitle')}
          </span>
          <span style={{ color: 'var(--secondary-grey)' }}>→</span>
        </div>
      </div>

      {/* Trust & Compliance Note */}
      <div style={{ textAlign: 'center', padding: '16px', fontSize: '11.5px', color: 'var(--secondary-grey)', lineHeight: 1.4 }}>
        <span data-i18n="complianceNote">
          {t('complianceNote')}
        </span>
      </div>
    </section>
  );
};
