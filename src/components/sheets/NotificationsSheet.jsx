import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const NotificationsSheet = () => {
  const {
    t,
    currentLang,
    activeSheet,
    closeSheet,
    switchTab,
    openApprovalModal,
    remindersList,
    toggleReminder,
    addReminder
  } = useApp();

  const [newTitle, setNewTitle] = useState('');
  const [selectedTime, setSelectedTime] = useState('Today 16:00');

  const isOpen = activeSheet === 'notif';

  const handleAdd = () => {
    if (newTitle.trim()) {
      addReminder(newTitle.trim(), selectedTime);
      setNewTitle('');
    }
  };

  return (
    <>
      <div
        className={`sheet-overlay ${isOpen ? 'active' : ''}`}
        id="sheetOverlayNotif"
        onClick={closeSheet}
      />
      <div
        className={`bottom-sheet ${isOpen ? 'active' : ''}`}
        id="sheetReminders"
      >
        <div className="sheet-handle" onClick={closeSheet} />
        <div className="sheet-header-row">
          <div>
            <div className="sheet-title" data-i18n="notifSheetTitle">
              {t('notifSheetTitle')}
            </div>
            <div style={{ fontSize: '11.5px', color: 'var(--secondary-grey)' }} data-i18n="notifSheetSub">
              {t('notifSheetSub')}
            </div>
          </div>
          <button className="sheet-close-btn" onClick={closeSheet}>✕</button>
        </div>

        {/* Section 1: Priority Notifications */}
        <div className="section-kicker" data-i18n="notifSectionTitle">
          {t('notifSectionTitle')}
        </div>

        <div
          className="notif-item-row"
          onClick={() => {
            closeSheet();
            switchTab('answer');
          }}
        >
          <div className="priority-indicator attention" style={{ marginTop: '4px' }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '13.5px', fontWeight: 650, color: 'var(--navy)' }} data-i18n="notif1Title">
              {t('notif1Title')}
            </div>
            <div style={{ fontSize: '11.5px', color: 'var(--secondary-grey)', marginTop: '2px' }} data-i18n="notif1Desc">
              {t('notif1Desc')}
            </div>
          </div>
          <span style={{ fontSize: '11px', color: 'var(--airport-blue)', fontWeight: 600 }}>
            {currentLang === 'ar' ? 'عرض ←' : 'View →'}
          </span>
        </div>

        <div
          className="notif-item-row"
          onClick={() => {
            closeSheet();
            openApprovalModal();
          }}
        >
          <div className="priority-indicator action" style={{ marginTop: '4px' }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '13.5px', fontWeight: 650, color: 'var(--navy)' }} data-i18n="notif2Title">
              {t('notif2Title')}
            </div>
            <div style={{ fontSize: '11.5px', color: 'var(--secondary-grey)', marginTop: '2px' }} data-i18n="notif2Desc">
              {t('notif2Desc')}
            </div>
          </div>
          <span style={{ fontSize: '11px', color: 'var(--airport-blue)', fontWeight: 600 }}>
            {currentLang === 'ar' ? 'توقيع ←' : 'Sign →'}
          </span>
        </div>

        <div
          className="notif-item-row"
          onClick={() => {
            closeSheet();
            switchTab('premeeting');
          }}
        >
          <div className="priority-indicator verified" style={{ marginTop: '4px' }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '13.5px', fontWeight: 650, color: 'var(--navy)' }} data-i18n="notif3Title">
              {t('notif3Title')}
            </div>
            <div style={{ fontSize: '11.5px', color: 'var(--secondary-grey)', marginTop: '2px' }} data-i18n="notif3Desc">
              {t('notif3Desc')}
            </div>
          </div>
          <span style={{ fontSize: '11px', color: 'var(--airport-blue)', fontWeight: 600 }}>
            {currentLang === 'ar' ? 'إيجاز ←' : 'Brief →'}
          </span>
        </div>

        {/* Section 2: Executive Reminders */}
        <div className="section-kicker" style={{ marginTop: '16px' }} data-i18n="remindersSectionTitle">
          {t('remindersSectionTitle')}
        </div>
        <div id="remindersList">
          {remindersList.map((item) => (
            <div className="reminder-item-row" key={item.id}>
              <button
                className={`reminder-check-btn ${item.done ? 'checked' : ''}`}
                onClick={() => toggleReminder(item.id)}
              >
                ✓
              </button>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: '13.5px',
                    fontWeight: 600,
                    color: 'var(--navy)',
                    textDecoration: item.done ? 'line-through' : 'none',
                    opacity: item.done ? 0.6 : 1
                  }}
                  data-i18n={item.titleKey || undefined}
                >
                  {item.titleKey ? t(item.titleKey) : item.customTitle}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--secondary-grey)' }} data-i18n={item.timeKey || undefined}>
                  {item.timeKey ? t(item.timeKey) : item.customTime}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Section 3: Add Reminder Form */}
        <div className="add-reminder-form">
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--navy)', textTransform: 'uppercase', letterSpacing: '0.4px' }} data-i18n="addReminderTitle">
            {t('addReminderTitle')}
          </div>
          <input
            type="text"
            id="newReminderInput"
            placeholder={t('addReminderPlaceholder')}
            data-i18n-placeholder="addReminderPlaceholder"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            style={{ width: '100%', marginTop: '8px', padding: '8px 12px', border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-sm)', fontFamily: 'inherit', fontSize: '13.5px', outline: 'none', background: '#FFFFFF' }}
          />

          <div className="reminder-time-pills">
            {['Today 16:00', 'Before ELT', 'Tomorrow 09:00'].map((timeStr) => (
              <button
                key={timeStr}
                className={`time-pill-btn ${selectedTime === timeStr ? 'active' : ''}`}
                onClick={() => setSelectedTime(timeStr)}
              >
                {timeStr}
              </button>
            ))}
          </div>

          <button
            className="btn-exec-primary"
            style={{ width: '100%', padding: '9px 14px', fontSize: '13px' }}
            onClick={handleAdd}
            data-i18n="btnAddReminder"
          >
            {t('btnAddReminder')}
          </button>
        </div>
      </div>
    </>
  );
};
