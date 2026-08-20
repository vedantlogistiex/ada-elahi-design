import React from 'react';
import { useApp } from '../../context/AppContext';

export const NotificationsSheet = () => {
  const { t, currentLang, activeSheet, closeSheet, addReminder, remindersList = [], toggleReminder } = useApp();
  const isOpen = activeSheet === 'notif';

  const alerts = [
    { type: 'err', title: t('notif1Title'), desc: t('notif1Desc') },
    { type: 'warn', title: t('notif2Title'), desc: t('notif2Desc') },
    { type: 'blue', title: t('notif3Title'), desc: t('notif3Desc') },
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

        {/* Priority Alerts */}
        <div className="section-label" style={{ marginTop: '12px' }}>{t('notifSectionTitle')}</div>
        <div className="card" style={{ padding: '6px 18px', marginBottom: '22px' }}>
          {alerts.map((a, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                padding: '14px 0',
                borderBottom: i < alerts.length - 1 ? '1px solid var(--border-glass)' : 'none',
              }}
            >
              <span className={`pill ${a.type}`} style={{ flexShrink: 0, marginTop: '2px', padding: '3px 8px' }}>!</span>
              <div>
                <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.35 }}>
                  {a.title}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--ink-secondary)', marginTop: '3px', lineHeight: 1.45 }}>
                  {a.desc}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Executive Reminders */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
          <div className="section-label" style={{ margin: 0 }}>{t('remindersSectionTitle')}</div>
          <button
            className="btn-link"
            style={{ fontSize: '12.5px', fontWeight: 700 }}
            onClick={() => addReminder(currentLang === 'ar' ? 'متابعة تقرير العمليات' : 'Follow-up with Operations')}
            type="button"
          >
            + {t('btnAddReminder')}
          </button>
        </div>

        <div className="card" style={{ padding: '6px 18px' }}>
          {remindersList.length === 0 && (
            <div style={{ padding: '18px 0', fontSize: '13px', color: 'var(--ink-muted)', textAlign: 'center' }}>
              {currentLang === 'ar' ? 'لا توجد تذكيرات مسجلة' : 'No active reminders'}
            </div>
          )}
          {remindersList.map((r, i) => (
            <div
              key={r.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '14px 0',
                borderBottom: i < remindersList.length - 1 ? '1px solid var(--border-glass)' : 'none',
                opacity: r.done ? 0.4 : 1,
                cursor: 'pointer',
                transition: 'opacity 0.2s ease',
              }}
              onClick={() => toggleReminder(r.id)}
            >
              {/* Checkbox */}
              <div style={{
                width: '20px',
                height: '20px',
                border: `1.5px solid ${r.done ? 'var(--accent-ok)' : 'rgba(255,255,255,0.25)'}`,
                borderRadius: '6px',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: r.done ? 'var(--accent-ok)' : 'transparent',
                boxShadow: r.done ? '0 0 8px var(--accent-ok)' : 'none',
                transition: 'all 0.18s cubic-bezier(0.16, 1, 0.3, 1)',
              }}>
                {r.done && <span style={{ fontSize: '11px', color: '#040914', fontWeight: 800 }}>✓</span>}
              </div>
              {/* Text */}
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '13.5px',
                  fontWeight: 600,
                  color: '#FFFFFF',
                  textDecoration: r.done ? 'line-through' : 'none',
                  lineHeight: 1.35,
                }}>
                  {r.customTitle || (r.titleKey ? t(r.titleKey) : '')}
                </div>
                <div style={{ fontSize: '11.5px', color: 'var(--ink-muted)', marginTop: '2px' }}>
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
