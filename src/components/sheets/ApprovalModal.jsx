import React from 'react';
import { useApp } from '../../context/AppContext';

export const ApprovalModal = () => {
  const { activeSheet, setActiveSheet, t, approveCurrentMeeting } = useApp();

  if (activeSheet !== 'approval') return null;

  const handleApprove = () => {
    approveCurrentMeeting();
    setActiveSheet(null);
  };

  return (
    <>
      <div className="sheet-overlay active" onClick={() => setActiveSheet(null)} />
      <div className="bottom-sheet active" id="approvalModal">
        <div className="sheet-handle" onClick={() => setActiveSheet(null)} />

        <div className="sheet-header-row">
          <div>
            <div className="sheet-title">{t('approvalSheetTitle')}</div>
            <div style={{ fontSize: '12px', color: 'var(--secondary-grey)' }}>{t('approvalSheetSub')}</div>
          </div>
          <button className="sheet-close-btn" onClick={() => setActiveSheet(null)}>✕</button>
        </div>

        <div style={{ fontSize: '15.5px', fontWeight: 700, color: 'var(--navy)', marginBottom: '8px' }}>
          {t('approvalQuestion')}
        </div>

        <div style={{ fontSize: '13px', color: 'var(--secondary-grey)', marginBottom: '14px', lineHeight: 1.4 }}>
          {t('approvalScope')}
        </div>

        {/* Consequence Box */}
        <div className="consequence-box">
          <b style={{ color: 'var(--airport-blue)' }}>{t('consequenceTitle')} </b>
          <span>{t('consequenceDesc')}</span>
        </div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
          <button className="btn-exec-secondary" style={{ flex: 1 }} onClick={() => setActiveSheet(null)}>
            {t('btnCancel')}
          </button>
          <button className="btn-exec-primary" style={{ flex: 2 }} onClick={handleApprove}>
            {t('btnApprove')}
          </button>
        </div>
      </div>
    </>
  );
};
