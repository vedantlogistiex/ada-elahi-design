import React from 'react';
import { useApp } from '../../context/AppContext';
import logoImg from '../../assets/logo.png';

export const AppHeader = () => {
  const { setActiveSheet, currentLang } = useApp();

  return (
    <nav className="app-nav-header">
      <div className="brand-meta-wrap">
        <img className="brand-logo-img" src={logoImg} alt="Abu Dhabi Airports" />
      </div>

      <div className="nav-actions">
        <button
          className="ios-notif-btn"
          onClick={() => setActiveSheet('notif')}
          title="Notifications & Executive Reminders"
          id="notifBellBtn"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span className="ios-notif-badge" id="notifBadgeCount">3</span>
        </button>
      </div>
    </nav>
  );
};
