import React from 'react';
import { useApp } from '../../context/AppContext';

export const StudioBar = () => {
  const { scenario, setScenario, currentLang, toggleLanguage, togglePresentMode } = useApp();

  return (
    <aside className="studio-bar">
      <div className="studio-brand-tag">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
        <span>Abu Dhabi Airports</span>
        <span className="badge">Executive AI Agent</span>
      </div>

      <div className="studio-scenarios">
        <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase' }}>
          Quick State:
        </span>
        <button
          className={`studio-btn ${scenario === 'normal' ? 'active' : ''}`}
          id="btnSceneNormal"
          onClick={() => setScenario('normal')}
        >
          🟢 Normal (Happy)
        </button>
        <button
          className={`studio-btn ${scenario === 'conflict' ? 'active' : ''}`}
          id="btnSceneConflict"
          onClick={() => setScenario('conflict')}
        >
          ⚠️ Conflicting Evidence
        </button>
        <button
          className={`studio-btn ${scenario === 'denied' ? 'active' : ''}`}
          id="btnSceneDenied"
          onClick={() => setScenario('denied')}
        >
          🔒 Permission Denied
        </button>
        <button
          className={`studio-btn ${scenario === 'loading' ? 'active' : ''}`}
          id="btnSceneLoading"
          onClick={() => setScenario('loading')}
        >
          ⏳ AI Loading State
        </button>
        <button className="studio-btn" onClick={toggleLanguage}>
          🌐 Language (<span id="studioLangText">{currentLang === 'en' ? 'العربية RTL' : 'English LTR'}</span>)
        </button>
        <button className="studio-btn" id="btnPresentMode" onClick={togglePresentMode}>
          📽 Present
        </button>
      </div>
    </aside>
  );
};
