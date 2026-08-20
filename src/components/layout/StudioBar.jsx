import React from 'react';
import { useApp } from '../../context/AppContext';

export const StudioBar = () => {
  const { scenario, setScenario, currentLang, toggleLanguage, togglePresentMode } = useApp();

  return (
    <aside className="studio-bar">
      <div className="studio-brand-tag">
        <span className="companion-pulse-orb" />
        <span>Abu Dhabi Airports</span>
        <span className="badge">Elahi AI</span>
      </div>

      <div className="studio-scenarios">
        <span style={{ fontSize: '11px', color: 'var(--ada-grey)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.4px' }}>
          Simulate:
        </span>
        <button
          className={`studio-btn ${scenario === 'normal' ? 'active' : ''}`}
          id="btnSceneNormal"
          onClick={() => setScenario('normal')}
          type="button"
        >
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--ada-success)' }} />
          Normal
        </button>
        <button
          className={`studio-btn ${scenario === 'conflict' ? 'active' : ''}`}
          id="btnSceneConflict"
          onClick={() => setScenario('conflict')}
          type="button"
        >
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--ada-attention)' }} />
          Conflict
        </button>
        <button
          className={`studio-btn ${scenario === 'denied' ? 'active' : ''}`}
          id="btnSceneDenied"
          onClick={() => setScenario('denied')}
          type="button"
        >
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--ada-critical)' }} />
          Denied
        </button>
        <button
          className={`studio-btn ${scenario === 'loading' ? 'active' : ''}`}
          id="btnSceneLoading"
          onClick={() => setScenario('loading')}
          type="button"
        >
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--ada-blue)' }} />
          AI Loading
        </button>
        <button className="studio-btn" onClick={toggleLanguage} type="button">
          🌐 <span id="studioLangText">{currentLang === 'en' ? 'العربية RTL' : 'English LTR'}</span>
        </button>
        <button className="studio-btn" id="btnPresentMode" onClick={togglePresentMode} type="button">
          📽 Present
        </button>
      </div>
    </aside>
  );
};
