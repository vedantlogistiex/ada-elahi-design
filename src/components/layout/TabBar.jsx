import React from 'react';
import { useApp } from '../../context/AppContext';

export const TabBar = () => {
  const { currentTab, switchTab, currentLang } = useApp();

  const isAr = currentLang === 'ar';

  return (
    <nav className="app-tab-bar">
      <div
        className={`tab-item ${currentTab === 'today' ? 'active' : ''}`}
        onClick={() => switchTab('today')}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
        <span>{isAr ? 'اليوم' : 'Today'}</span>
      </div>

      <div
        className={`tab-item ${currentTab === 'ask' || currentTab === 'answer' ? 'active' : ''}`}
        onClick={() => switchTab('ask')}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
        <span>{isAr ? 'اسأل' : 'Ask'}</span>
      </div>

      <div
        className={`tab-item ${['meetings', 'premeeting', 'meetingoutput'].includes(currentTab) ? 'active' : ''}`}
        onClick={() => switchTab('meetings')}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        <span>{isAr ? 'الاجتماعات' : 'Meetings'}</span>
      </div>

      <div
        className={`tab-item ${currentTab === 'memory' ? 'active' : ''}`}
        onClick={() => switchTab('memory')}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
        <span>{isAr ? 'الذاكرة' : 'Memory'}</span>
      </div>

      <div
        className={`tab-item ${currentTab === 'more' ? 'active' : ''}`}
        onClick={() => switchTab('more')}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="1" />
          <circle cx="19" cy="12" r="1" />
          <circle cx="5" cy="12" r="1" />
        </svg>
        <span>{isAr ? 'المزيد' : 'More'}</span>
      </div>
    </nav>
  );
};
