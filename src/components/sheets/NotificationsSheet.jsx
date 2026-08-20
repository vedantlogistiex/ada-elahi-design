import React from 'react';
import { useApp } from '../../context/AppContext';

export const NotificationsSheet = () => {
  const { t, currentLang, activeSheet, closeSheet, addReminder, remindersList = [], toggleReminder } = useApp();
  const isOpen = activeSheet === 'notif';

  const alerts = [
    { type: 'err', title: t('notif1Title'), desc: t('notif1Desc'), time: '09:40', tag: 'Critical Alert', accent: 'accent-red' },
    { type: 'warn', title: t('notif2Title'), desc: t('notif2Desc'), time: '14:00 Deadline', tag: 'Action Required', accent: 'accent-amber' },
    { type: 'blue', title: t('notif3Title'), desc: t('notif3Desc'), time: '09:35', tag: 'Briefing Ready', accent: 'accent-teal' },
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
        <div className="section-label" style={{ marginTop: '6px', fontSize: '14px' }}>{t('notifSectionTitle')}</div>
        <div style={{ marginBottom: '18px' }}>
          {alerts.map((a, i) => (
            <div
              key={i}
              className={`exec-card ${a.accent}`}
              style={{ marginBottom: '8px' }}
            >
              <div className="exec-card-header">
                <span className="exec-chip" style={{
                  color: a.type === 'err' ? 'var(--ada-critical)' : a.type === 'warn' ? 'var(--ada-attention)' : 'var(--ada-teal)',
                  background: a.type === 'err' ? '#FFF1F2' : a.type === 'warn' ? '#FFFBEB' : '#F0FDFA',
                  borderColor: a.type === 'err' ? '#FECDD3' : a.type === 'warn' ? '#FDE68A' : '#CCFBF1',
                }}>
                  {a.tag}
                </span>
                <span className="exec-card-time">{a.time}</span>
              </div>
              <div className="exec-card-title" style={{ fontSize: '13.5px', marginBottom: '3px' }}>
                {a.title}
              </div>
              <div className="exec-card-body" style={{ margin: 0 }}>
                {a.desc}
              </div>
            </div>
          ))}
        </div>

        {/* Executive Reminders */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
          <div className="section-label" style={{ margin: 0, fontSize: '14px' }}>{t('remindersSectionTitle')}</div>
          <button
            className="btn-link"
            style={{ fontSize: '12.5px', fontWeight: 600 }}
            onClick={() => addReminder(currentLang === 'ar' ? 'متابعة تقرير العمليات' : 'Follow-up with Operations')}
            type="button"
          >
            + {t('btnAddReminder')}
          </button>
        </div>

        <div>
          {remindersList.length === 0 && (
            <div style={{ padding: '20px 0', fontSize: '12.5px', color: 'var(--ada-grey)', textAlign: 'center' }}>
              {currentLang === 'ar' ? 'لا توجد تذكيرات مسجلة' : 'No active reminders'}
            </div>
          )}
          {remindersList.map((r) => (
            <div
              key={r.id}
              className="exec-card"
              style={{
                padding: '12px 14px',
                marginBottom: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                opacity: r.done ? 0.45 : 1,
                cursor: 'pointer',
              }}
              onClick={() => toggleReminder(r.id)}
            >
              {/* Checkbox */}
              <div style={{
                width: '18px',
                height: '18px',
                border: `1.5px solid ${r.done ? 'var(--ada-navy)' : '#CBD5E1'}`,
                borderRadius: '5px',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: r.done ? 'var(--ada-navy)' : 'transparent',
                transition: 'all 0.15s ease',
              }}>
                {r.done && <span style={{ fontSize: '10px', color: '#FFFFFF', fontWeight: 800 }}>✓</span>}
              </div>
              {/* Text */}
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'var(--ada-navy)',
                  textDecoration: r.done ? 'line-through' : 'none',
                  lineHeight: 1.3,
                }}>
                  {r.customTitle || (r.titleKey ? t(r.titleKey) : '')}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--ada-grey)', marginTop: '2px' }}>
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
