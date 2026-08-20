import React, { useState, useEffect } from 'react';
import { DynamicIsland } from './DynamicIsland';
import { AppHeader } from './AppHeader';
import { TabBar } from './TabBar';
import { Toast } from './Toast';
import { NotificationsSheet } from '../sheets/NotificationsSheet';
import { WhyThisAnswerSheet } from '../sheets/WhyThisAnswerSheet';
import { ApprovalModal } from '../sheets/ApprovalModal';
import { useApp } from '../../context/AppContext';

export const DeviceFrame = ({ children }) => {
  const { isRecording, stopRecording, recSeconds, scenario, t, currentLang } = useApp();
  const [clock, setClock] = useState('10:01');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      let minutes = now.getMinutes();
      if (hours < 10) hours = '0' + hours;
      if (minutes < 10) minutes = '0' + minutes;
      setClock(`${hours}:${minutes}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 30000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n) => String(n).padStart(2, '0');
  const timerDisplay = `${pad(Math.floor(recSeconds / 60))}:${pad(recSeconds % 60)}`;

  return (
    <div className="device-frame" id="deviceFrame">
      {/* iOS Dynamic Island */}
      <DynamicIsland />

      {/* iOS Native Status Bar */}
      <header className="ios-status-bar">
        <span id="clockDisplay">{clock}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {/* Signal bars */}
          <svg width="15" height="12" viewBox="0 0 18 14" fill="currentColor">
            <rect x="0" y="10" width="3" height="4" rx="0.5" />
            <rect x="5" y="7" width="3" height="7" rx="0.5" />
            <rect x="10" y="4" width="3" height="10" rx="0.5" />
            <rect x="15" y="0" width="3" height="14" rx="0.5" />
          </svg>
          {/* Wifi */}
          <svg width="15" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12.55a11 11 0 0 1 14.08 0" />
            <path d="M1.42 9a16 16 0 0 1 21.16 0" />
            <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
            <line x1="12" y1="20" x2="12.01" y2="20" strokeWidth="3" />
          </svg>
          {/* Battery */}
          <svg width="20" height="12" viewBox="0 0 24 14" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="1" y="1" width="18" height="12" rx="3" />
            <path d="M22 4.5v5" strokeLinecap="round" />
            <rect x="3" y="3" width="12" height="8" rx="1.5" fill="currentColor" />
          </svg>
        </div>
      </header>

      {/* Navigation Header */}
      <AppHeader />

      {/* Toast Feedback */}
      <Toast />

      {/* Scrollable Viewport */}
      <div className="app-viewport" id="appViewport">
        {/* Analyzing banner matching Anees Image 3 */}
        {scenario === 'loading' && (
          <div className="anees-analyzing-pill" id="stateBannerLoading">
            <div className="analyzing-spinner" />
            <span>{currentLang === 'ar' ? 'جاري تحليل المحادثة الأخيرة...' : 'Analyzing latest conversation...'}</span>
          </div>
        )}

        {scenario === 'error' && (
          <div className="card" style={{ borderLeft: '4px solid var(--accent-red)', padding: '14px 16px', marginBottom: '14px' }}>
            <b style={{ color: 'var(--accent-red)', fontSize: '13px' }}>{t('commErrorTitle')}</b>
            <p style={{ fontSize: '12px', marginTop: '3px', color: 'var(--ink-secondary)' }}>{t('commErrorDesc')}</p>
          </div>
        )}

        {scenario === 'denied' && (
          <div className="card" style={{ borderLeft: '4px solid var(--accent-amber)', padding: '14px 16px', marginBottom: '14px' }}>
            <b style={{ color: 'var(--accent-amber)', fontSize: '13px' }}>{t('securityNoticeTitle')}</b>
            <p style={{ fontSize: '12px', marginTop: '3px', color: 'var(--ink-secondary)' }}>{t('securityNoticeDesc')}</p>
          </div>
        )}

        {/* Active Screen View */}
        {children}
      </div>

      {/* Anees Live Recording Bar (Matching Image 2: 2_anees_home_recording) */}
      {isRecording && (
        <div className="anees-live-recording-pill" id="liveRecordingPill">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div className="island-waveform" style={{ gap: '2.5px' }}>
              <span className="wave-bar" />
              <span className="wave-bar" />
              <span className="wave-bar" />
              <span className="wave-bar" />
              <span className="wave-bar" />
            </div>
            <span className="live-rec-timer">{timerDisplay}</span>
          </div>

          <div className="live-rec-mode">
            <span>{currentLang === 'ar' ? 'افتراضي' : 'Default'}</span>
            <span>›</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button className="live-rec-stop-btn" onClick={stopRecording} title="Stop & Analyze" type="button">
              <span className="live-rec-stop-square" />
            </button>
            <button className="live-rec-cancel-btn" onClick={stopRecording} title="Cancel" type="button">
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Floating Bottom Tab Bar Dock */}
      <TabBar />

      {/* Modals & Sheets */}
      <NotificationsSheet />
      <WhyThisAnswerSheet />
      <ApprovalModal />
    </div>
  );
};
