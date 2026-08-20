import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const AskView = () => {
  const { t, executeAskQuery } = useApp();
  const [localQuery, setLocalQuery] = useState('');

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (localQuery.trim()) {
      executeAskQuery(localQuery);
    }
  };

  return (
    <section className="screen-view" id="viewAsk">
      <div>
        <h2 className="screen-title">{t('askTitle')}</h2>
        <div className="screen-subtitle">{t('askSubtitle')}</div>
      </div>

      {/* Query Box */}
      <form onSubmit={handleSubmit} className="query-box-wrap">
        <textarea
          className="query-input-field"
          id="askQueryInput"
          rows={3}
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          placeholder={t('askInputPlaceholder')}
        />
        <div className="query-action-row">
          <span style={{ fontSize: '11.5px', color: 'var(--secondary-grey)' }}>
            🔒 Private & Sovereign · Air-Gapped
          </span>
          <button type="submit" className="ask-submit-btn">
            {t('btnSubmitQuery')}
          </button>
        </div>
      </form>

      {/* Suggested Executive Inquiry Chips */}
      <div className="section-kicker">
        <span>{t('suggestedChipsKicker')}</span>
      </div>

      <div className="prompt-chips-grid">
        <div className="prompt-chip" onClick={() => executeAskQuery(t('chip1'))}>
          <span>"{t('chip1')}"</span>
          <span style={{ color: 'var(--airport-blue)' }}>→</span>
        </div>
        <div className="prompt-chip" onClick={() => executeAskQuery(t('chip2'))}>
          <span>"{t('chip2')}"</span>
          <span style={{ color: 'var(--airport-blue)' }}>→</span>
        </div>
        <div className="prompt-chip" onClick={() => executeAskQuery(t('chip3'))}>
          <span>"{t('chip3')}"</span>
          <span style={{ color: 'var(--airport-blue)' }}>→</span>
        </div>
        <div className="prompt-chip" onClick={() => executeAskQuery(t('chip4'))}>
          <span>"{t('chip4')}"</span>
          <span style={{ color: 'var(--airport-blue)' }}>→</span>
        </div>
        <div className="prompt-chip" onClick={() => executeAskQuery(t('chip5'))}>
          <span>"{t('chip5')}"</span>
          <span style={{ color: 'var(--airport-blue)' }}>→</span>
        </div>
      </div>

      {/* Recent Inquiries */}
      <div className="section-kicker">
        <span>{t('recentQueriesKicker')}</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div className="priority-item" onClick={() => executeAskQuery(t('rec1'))}>
          <div className="priority-indicator verified" />
          <div className="priority-content">
            <div className="priority-title">{t('rec1')}</div>
            <div className="priority-desc">Ground Truth Verified · 09:38</div>
          </div>
          <span style={{ fontSize: '12px', color: 'var(--airport-blue)' }}>→</span>
        </div>
        <div className="priority-item" onClick={() => executeAskQuery(t('rec2'))}>
          <div className="priority-indicator verified" />
          <div className="priority-content">
            <div className="priority-title">{t('rec2')}</div>
            <div className="priority-desc">Board Resolution Sealed · 28 May</div>
          </div>
          <span style={{ fontSize: '12px', color: 'var(--airport-blue)' }}>→</span>
        </div>
      </div>
    </section>
  );
};
