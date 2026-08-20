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
      {/* Dark Theme Executive Header Bar */}
      <div className="app-top-header-dark">
        {/* iOS Dynamic Island */}
        <DynamicIsland />

        {/* iOS Native Status Bar */}
        <header className="ios-status-bar">
          <span id="clockDisplay">{clock}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {/* Signal bars */}
            <svg width="15" height="11" viewBox="0 0 18 14" fill="currentColor">
              <rect x="0" y="10" width="3" height="4" rx="0.5" />
              <rect x="5" y="7" width="3" height="7" rx="0.5" />
              <rect x="10" y="4" width="3" height="10" rx="0.5" />
              <rect x="15" y="0" width="3" height="14" rx="0.5" />
            </svg>
            {/* Wifi */}
            <svg width="14" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
              <path d="M5 12.55a11 11 0 0 1 14.08 0" />
              <path d="M1.42 9a16 16 0 0 1 21.16 0" />
              <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
              <line x1="12" y1="20" x2="12.01" y2="20" strokeWidth="3" />
            </svg>
            {/* Battery */}
            <svg width="19" height="11" viewBox="0 0 24 14" fill="none" stroke="currentColor" strokeWidth="1.9">
              <rect x="1" y="1" width="18" height="12" rx="3" />
              <path d="M22 4.5v5" strokeLinecap="round" />
              <rect x="3" y="3" width="12" height="8" rx="1.5" fill="currentColor" />
            </svg>
          </div>
        </header>

        {/* Navigation Header */}
        <AppHeader />
      </div>

      {/* Toast Feedback */}
      <Toast />

      {/* Scrollable Viewport */}
      <div className="app-viewport" id="appViewport">
        {/* Analyzing banner */}
        {scenario === 'loading' && (
          <div className="exec-card" style={{ background: '#F0F7FC', borderColor: 'rgba(2, 132, 199, 0.25)', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--ada-blue)', animation: 'pulse-glow 1.5s infinite' }} />
            <span style={{ fontSize: '12.5px', color: 'var(--ada-navy)', fontWeight: 600 }}>{currentLang === 'ar' ? 'جاري تحليل المحادثة الأخيرة...' : 'Analyzing latest conversation...'}</span>
          </div>
        )}

        {scenario === 'error' && (
          <div className="exec-card accent-red" style={{ padding: '14px 16px', marginBottom: '14px' }}>
            <b style={{ color: 'var(--ada-critical)', fontSize: '13px' }}>{t('commErrorTitle')}</b>
            <p style={{ fontSize: '12px', marginTop: '3px', color: 'var(--ada-slate)' }}>{t('commErrorDesc')}</p>
          </div>
        )}

        {scenario === 'denied' && (
          <div className="exec-card accent-amber" style={{ padding: '14px 16px', marginBottom: '14px' }}>
            <b style={{ color: 'var(--ada-attention)', fontSize: '13px' }}>{t('securityNoticeTitle')}</b>
            <p style={{ fontSize: '12px', marginTop: '3px', color: 'var(--ada-slate)' }}>{t('securityNoticeDesc')}</p>
          </div>
        )}

        {/* Active Screen View */}
        {children}
      </div>

      {/* Live Recording Bar */}
      {isRecording && (
        <div className="anees-live-recording-pill" id="liveRecordingPill">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div className="island-waveform" style={{ gap: '2px' }}>
              <span className="wave-bar" style={{ background: '#38BDF8' }} />
              <span className="wave-bar" style={{ background: '#38BDF8' }} />
              <span className="wave-bar" style={{ background: '#38BDF8' }} />
              <span className="wave-bar" style={{ background: '#38BDF8' }} />
              <span className="wave-bar" style={{ background: '#38BDF8' }} />
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
