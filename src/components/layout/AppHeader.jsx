import React from 'react';
import { useApp } from '../../context/AppContext';
import logoImg from '../../assets/logo.png';

export const AppHeader = () => {
  const { setActiveSheet } = useApp();

  return (
    <header className="app-nav-header">
      <div className="header-brand-row">
        <img src={logoImg} alt="Abu Dhabi Airports" className="brand-logo-img" />
      </div>

      <div className="header-actions">
        <button
          className="header-btn"
          id="btnHeaderNotif"
          onClick={() => setActiveSheet('notif')}
          title="Notifications & Reminders"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span className="notif-badge-count">3</span>
        </button>
      </div>
    </header>
  );
};
