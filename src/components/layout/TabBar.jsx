import React from 'react';
import { useApp } from '../../context/AppContext';

export const TabBar = () => {
  const { currentTab, switchTab, startRecording, isRecording } = useApp();

  return (
    <div className="anees-bottom-dock-wrapper">
      {/* Floating Black Navigation Dock */}
      <nav className="anees-black-dock">
        {/* Tab 1: Today / Home */}
        <button
          className={`dock-icon-btn ${currentTab === 'today' ? 'active' : ''}`}
          id="tabToday"
          onClick={() => switchTab('today')}
          title="Today / Home"
          type="button"
        >
          <svg viewBox="0 0 24 24" fill={currentTab === 'today' ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </button>

        {/* Tab 2: Meetings / Cards */}
        <button
          className={`dock-icon-btn ${['meetings', 'premeeting', 'meetingoutput'].includes(currentTab) ? 'active' : ''}`}
          id="tabMeetings"
          onClick={() => switchTab('meetings')}
          title="Meetings & Output"
          type="button"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          </svg>
        </button>

        {/* Tab 3: Ask / AI Sparkles */}
        <button
          className={`dock-icon-btn ${['ask', 'answer'].includes(currentTab) ? 'active' : ''}`}
          id="tabAsk"
          onClick={() => switchTab('ask')}
          title="Ask Elahi"
          type="button"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2l2.4 5.6L20 10l-5.6 2.4L12 18l-2.4-5.6L4 10l5.6-2.4z" />
            <path d="M19 17l1 2 2 1-2 1-1 2-1-2-2-1 2-1z" />
          </svg>
        </button>

        {/* Tab 4: Memory / Chat */}
        <button
          className={`dock-icon-btn ${currentTab === 'memory' ? 'active' : ''}`}
          id="tabMemory"
          onClick={() => switchTab('memory')}
          title="Memory & Records"
          type="button"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </button>

        {/* Tab 5: More / Settings */}
        <button
          className={`dock-icon-btn ${currentTab === 'more' ? 'active' : ''}`}
          id="tabMore"
          onClick={() => switchTab('more')}
          title="Executive Settings"
          type="button"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2l7 4v12l-7 4-7-4V6z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </button>
      </nav>

      {/* Floating Orange-Red Voice Recording Button */}
      {!isRecording && (
        <button
          className="anees-rec-action-btn"
          id="btnFloatingRecord"
          onClick={startRecording}
          title="Start Ambient Listening"
          type="button"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="6" y1="9" x2="6" y2="15" />
            <line x1="10" y1="5" x2="10" y2="19" />
            <line x1="14" y1="7" x2="14" y2="17" />
            <line x1="18" y1="10" x2="18" y2="14" />
          </svg>
        </button>
      )}
    </div>
  );
};
