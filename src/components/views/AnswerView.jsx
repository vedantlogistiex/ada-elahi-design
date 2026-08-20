import React from 'react';
import { useApp } from '../../context/AppContext';

export const AnswerView = () => {
  const { t, switchTab, setActiveSheet } = useApp();

  return (
    <section className="screen-view active" id="viewAnswer">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <button className="lang-toggle-btn" onClick={() => switchTab('ask')}>
          <span data-i18n="backToAsk">{t('backToAsk')}</span>
        </button>
        <span style={{ fontSize: '11px', color: 'var(--secondary-grey)' }} data-i18n="queryTimestamp">
          {t('queryTimestamp')}
        </span>
      </div>

      <div className="answer-card">
        {/* 1. Executive Answer */}
        <div className="answer-section">
          <div className="answer-label" data-i18n="ansExecutiveLabel">
            {t('ansExecutiveLabel')}
          </div>
          <h2 className="answer-headline" id="ansHeadline" data-i18n="ansHeadlineText">
            {t('ansHeadlineText')}
          </h2>
        </div>

        {/* 2. Implication */}
        <div className="answer-section">
          <div className="answer-label" data-i18n="ansImplicationLabel">
            {t('ansImplicationLabel')}
          </div>
          <div className="implication-box" id="ansImplication" data-i18n="ansImplicationText">
            {t('ansImplicationText')}
          </div>
        </div>

        {/* 3. Recommended Action */}
        <div className="answer-section">
          <div className="answer-label" data-i18n="ansActionLabel">
            {t('ansActionLabel')}
          </div>
          <div className="action-box" id="ansAction" data-i18n="ansActionText">
            {t('ansActionText')}
          </div>
        </div>

        {/* Trust Bar & Trigger to Why This Answer? */}
        <button className="evidence-bar-btn" onClick={() => setActiveSheet('why')}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            <span data-i18n="ansSourcesSummary">{t('ansSourcesSummary')}</span>
          </div>
          <span style={{ fontWeight: 700 }} data-i18n="whyThisAnswerBtn">
            {t('whyThisAnswerBtn')}
          </span>
        </button>
      </div>

      {/* Quick Secondary Executive Actions */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <button className="btn-exec-primary" onClick={() => setActiveSheet('approval')} data-i18n="actionAuthorize">
          {t('actionAuthorize')}
        </button>
        <button className="btn-exec-secondary" onClick={() => switchTab('premeeting')} data-i18n="actionAttachToBrief">
          {t('actionAttachToBrief')}
        </button>
      </div>
    </section>
  );
};
