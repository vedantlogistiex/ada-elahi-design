import React from 'react';
import { useApp } from '../../context/AppContext';

export const MoreView = () => {
  const { t, currentLang, toggleLanguage } = useApp();

  return (
    <section className="screen-view" id="viewMore">
      <div>
        <h2 className="screen-title">{t('moreTitle')}</h2>
        <div className="screen-subtitle">{t('moreSubtitle')}</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {/* Executive Clearance */}
        <div className="brief-block">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
            <h4 style={{ color: 'var(--aviation-teal)', margin: 0 }}>{t('secClearanceTitle')}</h4>
            <span className="priority-badge ver">Active</span>
          </div>
          <div style={{ fontSize: '14.5px', fontWeight: 700, color: 'var(--navy)', marginBottom: '4px' }}>
            {t('secClearanceLevel')}
          </div>
          <p style={{ fontSize: '12.5px', color: 'var(--slate)' }}>
            {t('secClearanceDesc')}
          </p>
        </div>

        {/* Data Sovereignty */}
        <div className="brief-block">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
            <h4 style={{ color: 'var(--navy)', margin: 0 }}>{t('secDataSovereignty')}</h4>
            <span className="priority-badge ver">100% UAE Air-Gapped</span>
          </div>
          <p style={{ fontSize: '12.5px', color: 'var(--slate)' }}>
            {t('secDataSovereigntyDesc')}
          </p>
        </div>

        {/* Language Selection */}
        <div className="brief-block" style={{ cursor: 'pointer' }} onClick={toggleLanguage}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h4 style={{ margin: 0 }}>{t('secLangTitle')}</h4>
              <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--navy)', marginTop: '2px' }}>
                {currentLang === 'ar' ? 'العربية (دولة الإمارات)' : 'English (US)'}
              </div>
            </div>
            <button className="btn-exec-secondary" style={{ padding: '6px 14px', fontSize: '12px' }}>
              {currentLang === 'ar' ? 'Switch to English' : 'التبديل للعربية'}
            </button>
          </div>
        </div>

        {/* Version info */}
        <div style={{ textAlign: 'center', padding: '12px 0', fontSize: '11.5px', color: 'var(--secondary-grey)' }}>
          {t('secVersion')}
        </div>
      </div>
    </section>
  );
};
