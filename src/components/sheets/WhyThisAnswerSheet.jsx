import React from 'react';
import { useApp } from '../../context/AppContext';

export const WhyThisAnswerSheet = () => {
  const { t, activeSheet, closeSheet } = useApp();
  const isOpen = activeSheet === 'why';

  return (
    <>
      <div
        className={`sheet-overlay ${isOpen ? 'active' : ''}`}
        id="sheetOverlayWhy"
        onClick={closeSheet}
      />
      <div
        className={`bottom-sheet ${isOpen ? 'active' : ''}`}
        id="sheetWhyThisAnswer"
      >
        <div className="sheet-handle" onClick={closeSheet} />
        <div className="sheet-header-row">
          <div>
            <div className="sheet-title" data-i18n="whySheetTitle">
              {t('whySheetTitle')}
            </div>
            <div style={{ fontSize: '11.5px', color: 'var(--secondary-grey)' }} data-i18n="whySheetSub">
              {t('whySheetSub')}
            </div>
          </div>
          <button className="sheet-close-btn" onClick={closeSheet}>✕</button>
        </div>

        <div className="section-kicker" data-i18n="approvedSourcesKicker">
          {t('approvedSourcesKicker')}
        </div>

        <div className="source-row">
          <div className="source-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <div className="source-title" data-i18n="src1Title">{t('src1Title')}</div>
            <div className="source-meta" data-i18n="src1Meta">{t('src1Meta')}</div>
          </div>
        </div>

        <div className="source-row">
          <div className="source-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <div className="source-title" data-i18n="src2Title">{t('src2Title')}</div>
            <div className="source-meta" data-i18n="src2Meta">{t('src2Meta')}</div>
          </div>
        </div>

        <div className="source-row">
          <div className="source-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" />
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <div className="source-title" data-i18n="src3Title">{t('src3Title')}</div>
            <div className="source-meta" data-i18n="src3Meta">{t('src3Meta')}</div>
          </div>
        </div>

        <div className="source-row">
          <div className="source-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <div className="source-title" data-i18n="src4Title">{t('src4Title')}</div>
            <div className="source-meta" data-i18n="src4Meta">{t('src4Meta')}</div>
          </div>
        </div>

        {/* Material Limitations & Conflict Handling */}
        <div className="limitation-box">
          <b data-i18n="limitationTitle">{t('limitationTitle')}</b>
          <p style={{ marginTop: '4px' }} data-i18n="limitationDesc">
            {t('limitationDesc')}
          </p>
        </div>
      </div>
    </>
  );
};
