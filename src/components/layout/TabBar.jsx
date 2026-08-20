import React from 'react';
import { useApp } from '../../context/AppContext';

export const TabBar = () => {
  const { currentTab, switchTab, startRecording, isRecording, currentLang } = useApp();

  const isMeetings = ['meetings', 'premeeting', 'meetingoutput'].includes(currentTab);
  const isAsk = ['ask', 'answer'].includes(currentTab);

  const tabs = [
    {
      id: 'today',
      active: currentTab === 'today',
      label: currentLang === 'ar' ? 'اليوم' : 'Today',
      onClick: () => switchTab('today'),
      icon: (isActive) => (
        <svg viewBox="0 0 24 24" fill={isActive ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={isActive ? '1.5' : '1.8'}>
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
    },
    {
      id: 'meetings',
      active: isMeetings,
      label: currentLang === 'ar' ? 'الاجتماعات' : 'Meetings',
      onClick: () => switchTab('meetings'),
      icon: (isActive) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={isActive ? '2.2' : '1.8'}>
          <rect x="3" y="4" width="18" height="18" rx="3" ry="3" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
    },
    {
      id: 'ask',
      active: isAsk,
      label: currentLang === 'ar' ? 'اسأل إلهي' : 'Ask AI',
      onClick: () => switchTab('ask'),
      icon: (isActive) => (
        <svg viewBox="0 0 24 24" fill={isActive ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={isActive ? '1.5' : '1.8'}>
          <path d="M12 2l2.4 5.6L20 10l-5.6 2.4L12 18l-2.4-5.6L4 10l5.6-2.4z" />
          <path d="M19 17l1 2 2 1-2 1-1 2-1-2-2-1 2-1z" />
        </svg>
      ),
    },
    {
      id: 'memory',
      active: currentTab === 'memory',
      label: currentLang === 'ar' ? 'الذاكرة' : 'Memory',
      onClick: () => switchTab('memory'),
      icon: (isActive) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={isActive ? '2.2' : '1.8'}>
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
    },
    {
      id: 'more',
      active: currentTab === 'more',
      label: currentLang === 'ar' ? 'التنفيذي' : 'Executive',
      onClick: () => switchTab('more'),
      icon: (isActive) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={isActive ? '2.2' : '1.8'}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="new-bottom-bar-container">
      {/* Floating Modern Executive Dock */}
      <nav className="executive-nav-dock">
        {tabs.map((t) => (
          <button
            key={t.id}
            className={`nav-tab-item ${t.active ? 'active' : ''}`}
            id={`tab_${t.id}`}
            onClick={t.onClick}
            title={t.label}
            type="button"
          >
            <div className="tab-icon-wrap">
              {t.icon(t.active)}
            </div>
            <span className="tab-label">{t.label}</span>
          </button>
        ))}
      </nav>

      {/* Floating Voice Companion Trigger */}
      {!isRecording && (
        <button
          className="floating-voice-orb"
          id="btnFloatingRecord"
          onClick={startRecording}
          title={currentLang === 'ar' ? 'تسجيل ذكي مع إلهي' : 'Live Meeting Intelligence'}
          type="button"
        >
          <div className="orb-soundwave-icon">
            <span className="orb-bar bar-1" />
            <span className="orb-bar bar-2" />
            <span className="orb-bar bar-3" />
            <span className="orb-bar bar-4" />
          </div>
          <span className="orb-ring-pulse" />
        </button>
      )}
    </div>
  );
};
