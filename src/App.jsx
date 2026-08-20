import React, { useEffect } from 'react';
import { useApp } from './context/AppContext';
import { StudioBar } from './components/layout/StudioBar';
import { PresentationHUD } from './components/layout/PresentationHUD';
import { DeviceFrame } from './components/layout/DeviceFrame';

// Views
import { TodayView } from './components/views/TodayView';
import { AskView } from './components/views/AskView';
import { AnswerView } from './components/views/AnswerView';
import { MeetingsView } from './components/views/MeetingsView';
import { PreMeetingBriefView } from './components/views/PreMeetingBriefView';
import { MeetingOutputView } from './components/views/MeetingOutputView';
import { MemoryView } from './components/views/MemoryView';
import { MoreView } from './components/views/MoreView';

export const App = () => {
  const { currentTab, currentLang, isPresented } = useApp();

  useEffect(() => {
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLang;
  }, [currentLang]);

  useEffect(() => {
    if (isPresented) {
      document.body.classList.add('is-presenting');
    } else {
      document.body.classList.remove('is-presenting');
    }
  }, [isPresented]);

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
      {/* QA & Scenario Simulator Bar */}
      <StudioBar />

      {/* Floating HUD when in Presentation Mode */}
      {isPresented && <PresentationHUD />}

      {/* Main Workspace Frame */}
      <main className="app-workspace">
        <DeviceFrame>
          {renderActiveView()}
        </DeviceFrame>
      </main>
    </>
  );
};

export default App;
