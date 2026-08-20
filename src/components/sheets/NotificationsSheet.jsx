import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const NotificationsSheet = () => {
  const { activeSheet, setActiveSheet, t, currentLang, remindersList, toggleReminder, addReminder } = useApp();
  const [newReminderText, setNewReminderText] = useState('');

  if (activeSheet !== 'notif') return null;

  const handleAdd = (e) => {
    e.preventDefault();
    if (newReminderText.trim()) {
      addReminder(newReminderText);
      setNewReminderText('');
    }
  };

  return (
    <>
      <div className="sheet-overlay active" onClick={() => setActiveSheet(null)} />
      <div className="bottom-sheet active" id="notifBottomSheet">
        <div className="sheet-handle" onClick={() => setActiveSheet(null)} />

        <div className="sheet-header-row">
          <div>
            <div className="sheet-title">{t('notifSheetTitle')}</div>
            <div style={{ fontSize: '12px', color: 'var(--secondary-grey)' }}>{t('notifSheetSub')}</div>
          </div>
          <button className="sheet-close-btn" onClick={() => setActiveSheet(null)}>✕</button>
        </div>

        {/* Priority Alerts Section */}
        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '11.5px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--critical)', letterSpacing: '0.5px', marginBottom: '8px' }}>
            {t('notifSectionTitle')}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ background: 'var(--attention-bg)', border: '1px solid rgba(201,135,35,0.3)', borderRadius: 'var(--radius-md)', padding: '10px 12px' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#8B540A' }}>{t('notif1Title')}</div>
              <div style={{ fontSize: '11.5px', color: '#7D4F08', marginTop: '2px' }}>{t('notif1Desc')}</div>
            </div>

            <div style={{ background: 'var(--critical-bg)', border: '1px solid rgba(185,67,67,0.3)', borderRadius: 'var(--radius-md)', padding: '10px 12px' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--critical)' }}>{t('notif2Title')}</div>
              <div style={{ fontSize: '11.5px', color: '#7E2525', marginTop: '2px' }}>{t('notif2Desc')}</div>
            </div>

            <div style={{ background: 'var(--teal-light)', border: '1px solid rgba(22,125,131,0.3)', borderRadius: 'var(--radius-md)', padding: '10px 12px' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--aviation-teal)' }}>{t('notif3Title')}</div>
              <div style={{ fontSize: '11.5px', color: 'var(--slate)', marginTop: '2px' }}>{t('notif3Desc')}</div>
            </div>
          </div>
        </div>

        {/* Executive Reminders Section */}
        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '11.5px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--navy)', letterSpacing: '0.5px', marginBottom: '8px' }}>
            {t('remindersSectionTitle')}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {remindersList.map((rem) => (
              <div
                key={rem.id}
                onClick={() => toggleReminder(rem.id)}
                style={{
                  background: rem.done ? 'var(--app-bg)' : 'var(--white-surface)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '9px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  cursor: 'pointer',
                  opacity: rem.done ? 0.6 : 1
                }}
              >
                <input
                  type="checkbox"
                  checked={rem.done}
                  onChange={() => {}}
                  style={{ width: '16px', height: '16px', accentColor: 'var(--airport-blue)', cursor: 'pointer' }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--navy)', textDecoration: rem.done ? 'line-through' : 'none' }}>
                    {currentLang === 'ar' ? rem.titleAr : rem.title}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--secondary-grey)' }}>
                    {currentLang === 'ar' ? rem.timeAr : rem.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Reminder Form */}
        <div>
          <div style={{ fontSize: '11.5px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--secondary-grey)', letterSpacing: '0.5px', marginBottom: '6px' }}>
            {t('addReminderTitle')}
          </div>
          <form onSubmit={handleAdd} style={{ display: 'flex', gap: '6px' }}>
            <input
              type="text"
              value={newReminderText}
              onChange={(e) => setNewReminderText(e.target.value)}
              placeholder={t('addReminderPlaceholder')}
              style={{
                flex: 1,
                padding: '8px 12px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-strong)',
                fontSize: '13px',
                fontFamily: 'inherit',
                outline: 'none'
              }}
            />
            <button
              type="submit"
              style={{
                background: 'var(--airport-blue)',
                color: '#FFFFFF',
                border: 'none',
                padding: '8px 14px',
                borderRadius: 'var(--radius-md)',
                fontSize: '12.5px',
                fontWeight: 700,
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {t('btnAddReminder')}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
