import React from 'react';
import { useApp } from './context/AppContext';
import { StudioBar } from './components/layout/StudioBar';
import { PresentationHUD } from './components/layout/PresentationHUD';
import { DeviceFrame } from './components/layout/DeviceFrame';
import { Toast } from './components/layout/Toast';

import { NotificationsSheet } from './components/sheets/NotificationsSheet';
import { WhyThisAnswerSheet } from './components/sheets/WhyThisAnswerSheet';
import { ApprovalModal } from './components/sheets/ApprovalModal';

import { TodayView } from './components/views/TodayView';
import { AskView } from './components/views/AskView';
import { AnswerView } from './components/views/AnswerView';
import { MeetingsView } from './components/views/MeetingsView';
import { PreMeetingBriefView } from './components/views/PreMeetingBriefView';
import { MeetingOutputView } from './components/views/MeetingOutputView';
import { MemoryView } from './components/views/MemoryView';
import { MoreView } from './components/views/MoreView';

export const App = () => {
  const { currentTab, isRecording, stopRecording, scenario, t, currentLang } = useApp();

  const renderActiveView = () => {
    switch (currentTab) {
      case 'today':
        return <TodayView />;
      case 'ask':
        return <AskView />;
      case 'answer':
        return <AnswerView />;
      case 'meetings':
        return <MeetingsView />;
      case 'premeeting':
        return <PreMeetingBriefView />;
      case 'meetingoutput':
        return <MeetingOutputView />;
      case 'memory':
        return <MemoryView />;
      case 'more':
        return <MoreView />;
      default:
        return <TodayView />;
    }
  };

  return (
    <>
      {/* Studio Bar for executive scenario & language testing */}
      <StudioBar />

      {/* Main App Workspace */}
      <main className="app-workspace">
        <DeviceFrame>
          {/* Universal State Simulation Banners */}
          {scenario === 'loading' && (
            <div className="state-banner loading">
              <div className="ios-spinner" />
              <span>Elahi is querying 14 enterprise databases and running compliance verification...</span>
            </div>
          )}

          {scenario === 'denied' && (
            <div className="state-banner denied">
              <b>🔒 Clearance Required: </b>
              <span>Access restricted to Level 1 Executive Leadership (Board & COO).</span>
            </div>
          )}

          {/* Sticky Live Recording Status Bar */}
          {isRecording && (
            <div className="live-recording-bar active">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="island-rec-dot" />
                <span style={{ fontSize: '12px', fontWeight: 600 }}>
                  {t('elahiListeningTitle')}
                </span>
              </div>
              <button className="btn-rec-stop" onClick={stopRecording}>
                {t('stopRecBtn')}
              </button>
            </div>
          )}

          {/* Dynamic Active Screen View */}
          {renderActiveView()}
        </DeviceFrame>
      </main>

      {/* Bottom Sheets and Modals */}
      <NotificationsSheet />
      <WhyThisAnswerSheet />
      <ApprovalModal />

      {/* Floating Presentation HUD (Active when is-presenting) */}
      <PresentationHUD />

      {/* Action Confirmation Toast */}
      <Toast />
    </>
  );
};
