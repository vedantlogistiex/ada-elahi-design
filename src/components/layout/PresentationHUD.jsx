import React from 'react';
import { useApp } from '../../context/AppContext';

export const PresentationHUD = () => {
  const { currentLang, toggleLanguage, togglePresentMode } = useApp();

  return (
    <div className="presentation-hud" id="presentationHud">
      <span style={{ fontSize: '12px', color: '#94A3B8' }}>Executive Presentation Mode</span>
      <button className="hud-btn" onClick={toggleLanguage}>
        🌐 <span>{currentLang === 'ar' ? 'English' : 'العربية'}</span>
      </button>
      <button className="hud-btn exit" onClick={togglePresentMode}>
        ✕ Exit Present (Esc)
      </button>
    </div>
  );
};
