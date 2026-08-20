import React from 'react';
import { useApp } from '../../context/AppContext';

export const AnswerView = () => {
  const { t, currentLang, switchTab, setActiveSheet } = useApp();

  return (
    <section className="screen-view active" id="viewAnswer">

      {/* Navigation & Timestamp */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0 16px' }}>
        <button className="btn-link" onClick={() => switchTab('ask')} type="button">
          {t('backToAsk')}
        </button>
        <span style={{ fontSize: '12px', color: 'var(--ink-muted)', fontWeight: 600 }}>{t('queryTimestamp')}</span>
      </div>

      {/* Executive Answer Card */}
      <div className="answer-card">
        <div className="answer-headline">
          {t('ansHeadlineText')}
        </div>

        <div className="answer-bullets">
          <div className="answer-bullet">
            <span className="bullet-dot" />
            <span>
              <strong style={{ color: 'var(--ink)' }}>
                {currentLang === 'ar' ? 'الأثر التنفيذي: ' : 'Implication: '}
              </strong>
              {t('ansImplicationText')}
            </span>
          </div>
          <div className="answer-bullet">
            <span className="bullet-dot" />
            <span>
              <strong style={{ color: 'var(--ink)' }}>
                {currentLang === 'ar' ? 'الإجراء المقترح: ' : 'Action: '}
              </strong>
              {t('ansActionText')}
            </span>
          </div>
        </div>

        <div className="answer-footer">
          <span style={{ fontSize: '12px', color: 'var(--ink-muted)', fontWeight: 600 }}>{t('ansSourcesSummary')}</span>
          <button className="btn-link" style={{ fontSize: '12.5px', fontWeight: 700 }} onClick={() => setActiveSheet('why')} type="button">
            {t('whyThisAnswerBtn')}
          </button>
        </div>
      </div>

      {/* Executive Action Triggers */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px' }}>
        <button
          className="btn-primary"
          style={{ width: '100%' }}
          onClick={() => setActiveSheet('approval')}
          type="button"
        >
          {t('actionAuthorize')}
        </button>
        <button
          className="btn-ghost"
          style={{ width: '100%' }}
          onClick={() => switchTab('premeeting')}
          type="button"
        >
          {t('actionAttachToBrief')}
        </button>
      </div>

    </section>
  );
};
