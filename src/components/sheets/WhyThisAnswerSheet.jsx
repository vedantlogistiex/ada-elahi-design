import React from 'react';
import { useApp } from '../../context/AppContext';

export const WhyThisAnswerSheet = () => {
  const { t, activeSheet, closeSheet } = useApp();
  const isOpen = activeSheet === 'why';

  const sources = [
    { icon: '🛫', titleKey: 'src1Title', metaKey: 'src1Meta' },
    { icon: '📋', titleKey: 'src2Title', metaKey: 'src2Meta' },
    { icon: '📅', titleKey: 'src3Title', metaKey: 'src3Meta' },
    { icon: '📊', titleKey: 'src4Title', metaKey: 'src4Meta' },
  ];

  return (
    <>
      <div className={`sheet-overlay ${isOpen ? 'active' : ''}`} id="sheetOverlayWhy" onClick={closeSheet} />
      <div className={`bottom-sheet ${isOpen ? 'active' : ''}`} id="sheetWhyThisAnswer">
        <div className="sheet-handle" onClick={closeSheet} />
        <div className="sheet-header">
          <div>
            <div className="sheet-title">{t('whySheetTitle')}</div>
            <div className="sheet-sub">{t('whySheetSub')}</div>
          </div>
          <button className="sheet-close" onClick={closeSheet} type="button">✕</button>
        </div>

        <div className="section-label" style={{ marginTop: '8px', fontSize: '15px' }}>
          {t('approvedSourcesKicker')}
        </div>

        <div style={{ marginBottom: '16px' }}>
          {sources.map((s, i) => (
            <div
              key={i}
              className="spaced-card"
              style={{
                padding: '14px 18px',
                marginBottom: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
              }}
            >
              <div className="source-icon" style={{ flexShrink: 0 }}>{s.icon}</div>
              <div>
                <div className="source-title">{t(s.titleKey)}</div>
                <div className="source-meta" style={{ marginTop: '2px' }}>{t(s.metaKey)}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="limit-box">
          <strong style={{ color: 'var(--ada-attention)', fontSize: '13px' }}>{t('limitationTitle')}</strong>
          <div style={{ marginTop: '4px', fontSize: '12.5px', lineHeight: 1.48 }}>{t('limitationDesc')}</div>
        </div>
      </div>
    </>
  );
};
