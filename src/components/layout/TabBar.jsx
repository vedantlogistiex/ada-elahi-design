import React from 'react';
import { useApp } from '../../context/AppContext';

export const TabBar = () => {
  const { currentTab, switchTab, t } = useApp();

  return (
    <nav className="app-tab-bar">
      {/* Tab 1: Today */}
      <button
        className={`tab-item ${currentTab === 'today' ? 'active' : ''}`}
        id="tabToday"
        onClick={() => switchTab('today')}
        type="button"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        <span>{t('tabToday')}</span>
      </button>

      {/* Tab 2: Ask */}
      <button
        className={`tab-item ${['ask', 'answer'].includes(currentTab) ? 'active' : ''}`}
        id="tabAsk"
        onClick={() => switchTab('ask')}
        type="button"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <span>{t('tabAsk')}</span>
      </button>

      {/* Tab 3: Meetings */}
      <button
        className={`tab-item ${['meetings', 'premeeting', 'meetingoutput'].includes(currentTab) ? 'active' : ''}`}
        id="tabMeetings"
        onClick={() => switchTab('meetings')}
        type="button"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
        <span>{t('tabMeetings')}</span>
      </button>

      {/* Tab 4: Memory */}
      <button
        className={`tab-item ${currentTab === 'memory' ? 'active' : ''}`}
        id="tabMemory"
        onClick={() => switchTab('memory')}
        type="button"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <polyline points="21 8 21 21 3 21 3 8" />
          <rect x="1" y="3" width="22" height="5" />
          <line x1="10" y1="12" x2="14" y2="12" />
        </svg>
        <span>{t('tabMemory')}</span>
      </button>

      {/* Tab 5: More */}
      <button
        className={`tab-item ${currentTab === 'more' ? 'active' : ''}`}
        id="tabMore"
        onClick={() => switchTab('more')}
        type="button"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="1" />
          <circle cx="19" cy="12" r="1" />
          <circle cx="5" cy="12" r="1" />
        </svg>
        <span>{t('tabMore')}</span>
      </button>
    </nav>
  );
};
