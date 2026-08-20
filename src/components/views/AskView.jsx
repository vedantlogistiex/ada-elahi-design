import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const AskView = () => {
  const { t, executeAskQuery } = useApp();
  const [inputVal, setInputVal] = useState('What changed today?');

  const submitAsk = () => {
    if (inputVal.trim()) {
      executeAskQuery(inputVal);
    }
  };

  return (
    <section className="screen-view active" id="viewAsk">
      <h1 className="screen-title" data-i18n="askHeader">
        {t('askHeader')}
      </h1>
      <div className="screen-subtitle" data-i18n="askSubHeader">
        {t('askSubHeader')}
      </div>

      <div className="ask-container">
        {/* Large but compact Input */}
        <div className="ask-input-box">
          <textarea
            className="ask-textarea"
            id="askQueryInput"
            placeholder={t('inputAskPlaceholder')}
            data-i18n-placeholder="inputAskPlaceholder"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
          />
          <div className="ask-action-row">
            <span style={{ fontSize: '11px', color: 'var(--secondary-grey)' }} data-i18n="groundedNotice">
              {t('groundedNotice')}
            </span>
            <button className="ask-submit-btn" onClick={submitAsk}>
              <span data-i18n="askSubmit">{t('askSubmit')}</span>
              <span>→</span>
            </button>
          </div>
        </div>

        {/* Suggested Prompts */}
        <div className="section-kicker" data-i18n="suggestedPromptsKicker">
          {t('suggestedPromptsKicker')}
        </div>
        <div className="suggested-prompts-group">
          <div className="prompt-chip" onClick={() => executeAskQuery(t('prompt1'))}>
            <span data-i18n="prompt1">{t('prompt1')}</span>
            <span>→</span>
          </div>
          <div className="prompt-chip" onClick={() => executeAskQuery(t('prompt2'))}>
            <span data-i18n="prompt2">{t('prompt2')}</span>
            <span>→</span>
          </div>
          <div className="prompt-chip" onClick={() => executeAskQuery(t('prompt3'))}>
            <span data-i18n="prompt3">{t('prompt3')}</span>
            <span>→</span>
          </div>
          <div className="prompt-chip" onClick={() => executeAskQuery(t('prompt4'))}>
            <span data-i18n="prompt4">{t('prompt4')}</span>
            <span>→</span>
          </div>
          <div className="prompt-chip" onClick={() => executeAskQuery(t('prompt5'))}>
            <span data-i18n="prompt5">{t('prompt5')}</span>
            <span>→</span>
          </div>
        </div>

        {/* Recent Inquiries */}
        <div className="section-kicker" style={{ marginTop: '12px' }} data-i18n="recentQueriesKicker">
          {t('recentQueriesKicker')}
        </div>
        <div
          className="exec-card"
          style={{ padding: '10px 14px', cursor: 'pointer' }}
          onClick={() => executeAskQuery('Compare Terminal A retail yield vs Q2 benchmark')}
        >
          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--navy)' }}>
            Compare Terminal A retail yield vs Q2 benchmark (C8)
          </div>
          <div style={{ fontSize: '11px', color: 'var(--secondary-grey)', marginTop: '2px' }}>
            Yesterday 16:45 · 3 sources · Verified
          </div>
        </div>
      </div>
    </section>
  );
};
