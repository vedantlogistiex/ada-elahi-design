import React from 'react';
import { useApp } from '../../context/AppContext';

export const NotificationsSheet = () => {
  const { t, currentLang, activeSheet, closeSheet, addReminder, remindersList = [], toggleReminder } = useApp();
  const isOpen = activeSheet === 'notif';

  const alerts = [
    { type: 'err', title: t('notif1Title'), desc: t('notif1Desc'), time: '09:40' },
    { type: 'warn', title: t('notif2Title'), desc: t('notif2Desc'), time: '14:00 Deadline' },
    { type: 'blue', title: t('notif3Title'), desc: t('notif3Desc'), time: '09:35' },
  ];

  return (
    <>
      <div className={`sheet-overlay ${isOpen ? 'active' : ''}`} id="sheetOverlayNotif" onClick={closeSheet} />
      <div className={`bottom-sheet ${isOpen ? 'active' : ''}`} id="sheetNotifications">
        <div className="sheet-handle" onClick={closeSheet} />

        <div className="sheet-header">
          <div>
            <div className="sheet-title">{t('notifSheetTitle')}</div>
            <div className="sheet-sub">{t('notifSheetSub')}</div>
          </div>
          <button className="sheet-close" onClick={closeSheet} type="button">✕</button>
        </div>

        {/* Priority Alerts (Spaced-out Cards) */}
        <div className="section-label" style={{ marginTop: '8px', fontSize: '15px' }}>{t('notifSectionTitle')}</div>
        <div style={{ marginBottom: '18px' }}>
          {alerts.map((a, i) => (
            <div
              key={i}
              className="spaced-card"
              style={{ padding: '16px 18px', marginBottom: '10px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span className={`pill ${a.type}`}>{a.type === 'err' ? 'Critical' : a.type === 'warn' ? 'Attention' : 'Brief'}</span>
                <span style={{ fontSize: '12px', color: 'var(--ada-grey)', fontWeight: 600 }}>{a.time}</span>
              </div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--ada-navy)', margin: '4px 0 2px' }}>
                {a.title}
              </div>
              <div style={{ fontSize: '12.5px', color: 'var(--ada-slate)', lineHeight: 1.45 }}>
                {a.desc}
              </div>
            </div>
          ))}
        </div>

        {/* Executive Reminders */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
          <div className="section-label" style={{ margin: 0, fontSize: '15px' }}>{t('remindersSectionTitle')}</div>
          <button
            className="btn-link"
            style={{ fontSize: '13px', fontWeight: 700 }}
            onClick={() => addReminder(currentLang === 'ar' ? 'متابعة تقرير العمليات' : 'Follow-up with Operations')}
            type="button"
          >
            + {t('btnAddReminder')}
          </button>
        </div>

        <div>
          {remindersList.length === 0 && (
            <div style={{ padding: '20px 0', fontSize: '13px', color: 'var(--ada-grey)', textAlign: 'center' }}>
              {currentLang === 'ar' ? 'لا توجد تذكيرات مسجلة' : 'No active reminders'}
            </div>
          )}
          {remindersList.map((r) => (
            <div
              key={r.id}
              className="spaced-card"
              style={{
                padding: '14px 18px',
                marginBottom: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                opacity: r.done ? 0.45 : 1,
                cursor: 'pointer',
              }}
              onClick={() => toggleReminder(r.id)}
            >
              {/* Checkbox */}
              <div style={{
                width: '20px',
                height: '20px',
                border: `2px solid ${r.done ? 'var(--ada-navy)' : '#CBD5E1'}`,
                borderRadius: '6px',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: r.done ? 'var(--ada-navy)' : 'transparent',
                transition: 'all 0.15s ease',
              }}>
                {r.done && <span style={{ fontSize: '11px', color: '#FFFFFF', fontWeight: 800 }}>✓</span>}
              </div>
              {/* Text */}
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  color: 'var(--ada-navy)',
                  textDecoration: r.done ? 'line-through' : 'none',
                  lineHeight: 1.3,
                }}>
                  {r.customTitle || (r.titleKey ? t(r.titleKey) : '')}
                </div>
                <div style={{ fontSize: '11.5px', color: 'var(--ada-grey)', marginTop: '2px' }}>
                  {r.customTime || (r.timeKey ? t(r.timeKey) : '')}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
