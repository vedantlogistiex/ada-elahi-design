import React from 'react';
import { useApp } from '../../context/AppContext';

export const WhyThisAnswerSheet = () => {
  const { activeSheet, setActiveSheet, t } = useApp();

  if (activeSheet !== 'why') return null;

  return (
    <>
      <div className="sheet-overlay active" onClick={() => setActiveSheet(null)} />
      <div className="bottom-sheet active" id="whyBottomSheet">
        <div className="sheet-handle" onClick={() => setActiveSheet(null)} />

        <div className="sheet-header-row">
          <div>
            <div className="sheet-title">{t('whySheetTitle')}</div>
            <div style={{ fontSize: '12px', color: 'var(--secondary-grey)' }}>{t('whySheetSub')}</div>
          </div>
          <button className="sheet-close-btn" onClick={() => setActiveSheet(null)}>✕</button>
        </div>

        <div style={{ marginBottom: '14px' }}>
          <div style={{ fontSize: '11.5px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--aviation-teal)', letterSpacing: '0.5px', marginBottom: '8px' }}>
            {t('sourcesTitle')}
          </div>

          <div className="source-row">
            <div className="source-icon">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
            </div>
            <div>
              <div className="source-title">{t('src1Title')}</div>
              <div className="source-meta">{t('src1Meta')}</div>
            </div>
          </div>

          <div className="source-row">
            <div className="source-icon">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <div>
              <div className="source-title">{t('src2Title')}</div>
              <div className="source-meta">{t('src2Meta')}</div>
            </div>
          </div>

          <div className="source-row">
            <div className="source-icon">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            </div>
            <div>
              <div className="source-title">{t('src3Title')}</div>
              <div className="source-meta">{t('src3Meta')}</div>
            </div>
          </div>

          <div className="source-row">
            <div className="source-icon">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="20" x2="18" y2="10" />
                <line x1="12" y1="20" x2="12" y2="4" />
                <line x1="6" y1="20" x2="6" y2="14" />
              </svg>
            </div>
            <div>
              <div className="source-title">{t('src4Title')}</div>
              <div className="source-meta">{t('src4Meta')}</div>
            </div>
          </div>
        </div>

        {/* Material Limitation & Conflict Resolution */}
        <div className="limitation-box">
          <div style={{ fontWeight: 700, marginBottom: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>⚠️ {t('limitationTitle')}</span>
          </div>
          <div>{t('limitationText')}</div>
        </div>
      </div>
    </>
  );
};
