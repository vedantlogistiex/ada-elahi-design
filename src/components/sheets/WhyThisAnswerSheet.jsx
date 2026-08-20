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

        <div className="section-label" style={{ marginTop: '6px', fontSize: '14px' }}>
          {t('approvedSourcesKicker')}
        </div>

        <div style={{ marginBottom: '16px' }}>
          {sources.map((s, i) => (
            <div
              key={i}
              className="exec-card"
              style={{
                padding: '12px 14px',
                marginBottom: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <div style={{ fontSize: '18px', flexShrink: 0 }}>{s.icon}</div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ada-navy)' }}>{t(s.titleKey)}</div>
                <div style={{ fontSize: '11px', color: 'var(--ada-grey)', marginTop: '2px' }}>{t(s.metaKey)}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="limit-box">
          <strong style={{ color: 'var(--ada-attention)', fontSize: '12px' }}>{t('limitationTitle')}</strong>
          <div style={{ marginTop: '3px', fontSize: '11.5px', lineHeight: 1.5, color: 'var(--ada-slate)' }}>{t('limitationDesc')}</div>
        </div>
      </div>
    </>
  );
};
