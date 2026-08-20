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

        <div className="section-label" style={{ marginTop: '12px' }}>{t('approvedSourcesKicker')}</div>

        <div className="card" style={{ padding: '6px 18px', marginBottom: '18px' }}>
          {sources.map((s, i) => (
            <div key={i} className="source-row" style={{ borderBottom: i < sources.length - 1 ? '1px solid var(--border-glass)' : 'none', padding: '14px 0' }}>
              <div className="source-icon" style={{ fontSize: '15px' }}>{s.icon}</div>
              <div>
                <div className="source-title">{t(s.titleKey)}</div>
                <div className="source-meta">{t(s.metaKey)}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="limit-box">
          <strong style={{ color: 'var(--accent-gold)' }}>{t('limitationTitle')}</strong>
          <div style={{ marginTop: '4px', fontSize: '12.5px' }}>{t('limitationDesc')}</div>
        </div>
      </div>
    </>
  );
};
