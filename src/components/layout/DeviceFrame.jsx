import React, { useState, useEffect } from 'react';
import { DynamicIsland } from './DynamicIsland';
import { AppHeader } from './AppHeader';
import { TabBar } from './TabBar';

export const DeviceFrame = ({ children }) => {
  const [clock, setClock] = useState('09:41');

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
      {/* iOS Dynamic Island */}
      <DynamicIsland />

      {/* iOS Status Bar */}
      <div className="ios-status-bar">
        <span>{clock}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {/* Signal */}
          <svg width="15" height="11" viewBox="0 0 17 11" fill="currentColor">
            <rect x="0" y="7" width="2.5" height="4" rx="0.5" />
            <rect x="4" y="5" width="2.5" height="6" rx="0.5" />
            <rect x="8" y="2.5" width="2.5" height="8.5" rx="0.5" />
            <rect x="12" y="0" width="2.5" height="11" rx="0.5" />
          </svg>
          {/* 5G */}
          <span style={{ fontSize: '11px', fontWeight: 700 }}>5G</span>
          {/* Battery */}
          <svg width="22" height="11" viewBox="0 0 25 12" fill="currentColor">
            <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" fill="none" stroke="currentColor" />
            <rect x="2" y="2" width="16" height="8" rx="2" />
            <path d="M23 4v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* App Header */}
      <AppHeader />

      {/* App Viewport for Screen Views */}
      <div className="app-viewport" id="appViewport">
        {children}
      </div>

      {/* iOS Native Tab Bar */}
      <TabBar />
    </div>
  );
};
