import React from 'react';
import { useApp } from '../../context/AppContext';

export const ApprovalModal = () => {
  const { t, currentLang, activeSheet, closeSheet, showToast } = useApp();
  const isOpen = activeSheet === 'approval';

  const handleConfirm = () => {
    closeSheet();
    showToast(currentLang === 'ar' ? 'تم الاعتماد وإرسال التوجيه للعمليات' : 'Approved · Dispatched to Operations');
  };

  return (
    <>
      <div className={`sheet-overlay ${isOpen ? 'active' : ''}`} id="sheetOverlayApproval" onClick={closeSheet} />
      <div className={`bottom-sheet ${isOpen ? 'active' : ''}`} id="sheetApproval">
        <div className="sheet-handle" onClick={closeSheet} />
        <div className="sheet-header">
          <div>
            <div className="sheet-title">{t('approvalSheetTitle')}</div>
            <div className="sheet-sub">{t('approvalSheetSub')}</div>
          </div>
          <button className="sheet-close" onClick={closeSheet} type="button">✕</button>
        </div>

        <div style={{ fontSize: '17px', fontWeight: 800, color: 'var(--ink)', marginBottom: '8px', lineHeight: 1.35 }}>
          {t('approvalQuestion')}
        </div>

        <div style={{ fontSize: '13.5px', color: 'var(--ink-secondary)', marginBottom: '16px', lineHeight: 1.55 }}>
          {currentLang === 'ar'
            ? <><strong>النطاق التنفيذي:</strong> 3 تعديلات على مواقف الطائرات 24–28 · 5 مدراء تشغيليين</>
            : <><strong>Executive Scope:</strong> 3 turnaround buffer modifications (Stands 24–28) · 5 operations leads</>}
        </div>

        <div className="consequence-box">
          <strong style={{ color: 'var(--accent-gold)' }}>{t('consequenceTitle')}</strong>
          <div style={{ marginTop: '4px', fontSize: '12.5px' }}>{t('consequenceDesc')}</div>
        </div>

        <div style={{ display: 'flex', gap: '12px', marginTop: '22px' }}>
          <button className="btn-ghost" style={{ flex: 1 }} onClick={closeSheet} type="button">
            {t('btnCancel')}
          </button>
          <button className="btn-primary" style={{ flex: 1.5 }} onClick={handleConfirm} type="button">
            {t('btnApprove')}
          </button>
        </div>
      </div>
    </>
  );
};
