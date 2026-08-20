import React from 'react';
import { useApp } from '../../context/AppContext';

export const ApprovalModal = () => {
  const { t, currentLang, activeSheet, closeSheet, showToast } = useApp();
  const isOpen = activeSheet === 'approval';

  const handleConfirm = () => {
    closeSheet();
    showToast(currentLang === 'ar' ? 'تم اعتماد وتثبيت خط الأساس التشغيلي' : 'Plan Approved · Dispatched to Operations');
  };

  return (
    <>
      <div
        className={`sheet-overlay ${isOpen ? 'active' : ''}`}
        id="sheetOverlayApproval"
        onClick={closeSheet}
      />
      <div
        className={`bottom-sheet ${isOpen ? 'active' : ''}`}
        id="sheetApproval"
      >
        <div className="sheet-handle" onClick={closeSheet} />
        <div className="sheet-header-row">
          <div>
            <div className="sheet-title" data-i18n="approvalSheetTitle">
              {t('approvalSheetTitle')}
            </div>
            <div style={{ fontSize: '11.5px', color: 'var(--secondary-grey)' }} data-i18n="approvalSheetSub">
              {t('approvalSheetSub')}
            </div>
          </div>
          <button className="sheet-close-btn" onClick={closeSheet}>✕</button>
        </div>

        <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--navy)', marginBottom: '6px' }} data-i18n="approvalQuestion">
          {t('approvalQuestion')}
        </div>

        <div style={{ fontSize: '13px', color: 'var(--slate)' }} data-i18n="approvalScope">
          {currentLang === 'ar' ? (
            <><b>النطاق:</b> 3 تعديلات على زمن استدارة المواقف (المواقف 24-28) · إخطار 5 مدراء تشغيليين.</>
          ) : (
            <><b>Scope:</b> 3 turnaround buffer modifications (Stands 24–28) · 5 recipient operational leads.</>
          )}
        </div>

        <div className="consequence-box">
          <b style={{ color: 'var(--navy)' }} data-i18n="consequenceTitle">
            {t('consequenceTitle')}
          </b>
          <p style={{ marginTop: '4px' }} data-i18n="consequenceDesc">
            {t('consequenceDesc')}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
          <button className="btn-exec-secondary" style={{ flex: 1 }} onClick={closeSheet} data-i18n="btnCancel">
            {t('btnCancel')}
          </button>
          <button className="btn-exec-primary" style={{ flex: 1.4 }} onClick={handleConfirm} data-i18n="btnApprove">
            {t('btnApprove')}
          </button>
        </div>
      </div>
    </>
  );
};
