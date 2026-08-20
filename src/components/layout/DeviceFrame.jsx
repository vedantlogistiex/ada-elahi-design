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
  const { isRecording, stopRecording, scenario, t } = useApp();
  const [clock, setClock] = useState('09:42');

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

  return (
    <div className="device-frame" id="deviceFrame">
      {/* iOS Dynamic Island with Live Elahi Companion Active / Recording State */}
      <DynamicIsland />

      {/* iOS Native Status Bar */}
      <header className="ios-status-bar">
        <span id="clockDisplay">{clock}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#94A3B8' }}>5G</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="7" width="16" height="10" rx="2" />
            <line x1="22" y1="11" x2="22" y2="13" />
            <rect x="4" y="9" width="10" height="6" fill="currentColor" />
          </svg>
        </div>
      </header>

      {/* Executive Native Navigation Header */}
      <AppHeader />

      {/* Toast Feedback */}
      <Toast />

      {/* Scrollable Content Viewport */}
      <div className="app-viewport" id="appViewport">
        {/* Live Ambient Recording Banner */}
        {isRecording && (
          <div className="live-recording-bar" id="liveRecordingBar">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className="island-rec-dot" />
              <div>
                <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#FFFFFF' }}>
                  {t('elahiListeningTitle')}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--ink-secondary)' }}>
                  4 sovereign verified streams synced
                </div>
              </div>
            </div>
            <button className="btn-rec-stop" onClick={stopRecording} type="button">
              {t('stopRecBtn')}
            </button>
          </div>
        )}

        {/* Universal State Simulated Banners */}
        {scenario === 'loading' && (
          <div className="state-banner loading" id="stateBannerLoading">
            <div className="ios-spinner" />
            <span>{t('loadingSynthesizing')}</span>
          </div>
        )}

        {scenario === 'error' && (
          <div className="state-banner error" id="stateBannerError">
            <b style={{ color: '#F87171' }}>{t('commErrorTitle')}</b>
            <p style={{ fontSize: '12px', marginTop: '3px' }}>{t('commErrorDesc')}</p>
          </div>
        )}

        {scenario === 'denied' && (
          <div className="state-banner denied" id="stateBannerDenied">
            <b style={{ color: '#FCD34D' }}>{t('securityNoticeTitle')}</b>
            <p style={{ fontSize: '12px', marginTop: '3px' }}>{t('securityNoticeDesc')}</p>
          </div>
        )}

        {/* Active Screen View */}
        {children}
      </div>

      {/* Native Floating Glass Bottom Tab Bar */}
      <TabBar />

      {/* Modals & Bottom Sheets contained strictly inside Mobile Device Frame */}
      <NotificationsSheet />
      <WhyThisAnswerSheet />
      <ApprovalModal />
    </div>
  );
};
