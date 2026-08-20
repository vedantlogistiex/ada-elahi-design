import React from 'react';
import { useApp } from '../../context/AppContext';

export const AnswerView = () => {
  const { t, switchTab, setActiveSheet } = useApp();

  return (
    <section className="screen-view" id="viewAnswer">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button
          className="studio-btn"
          style={{ background: 'var(--white-surface)', color: 'var(--navy)', borderColor: 'var(--border-subtle)' }}
          onClick={() => switchTab('ask')}
        >
          ← {t('askTitle')}
        </button>
        <span className="priority-badge ver">Verified Ground Truth</span>
      </div>

      <div>
        <h2 className="screen-title">{t('ansTitle')}</h2>
        <div className="screen-subtitle">{t('ansSubtitle')}</div>
      </div>

      {/* Answer 3-Part Executive Card */}
      <div className="answer-card">
        {/* 1. Direct Executive Answer */}
        <div className="answer-section">
          <div className="answer-label">{t('directAnswerLabel')}</div>
          <div className="answer-headline">{t('directAnswerHeadline')}</div>
        </div>

        {/* 2. Operational & Commercial Implication */}
        <div className="answer-section">
          <div className="answer-label">{t('implicationLabel')}</div>
          <div className="implication-box">{t('implicationText')}</div>
        </div>

        {/* 3. Recommended Executive Action */}
        <div className="answer-section">
          <div className="answer-label">{t('actionLabel')}</div>
          <div className="action-box">{t('actionText')}</div>
        </div>

        {/* Evidence & Provenance Bar */}
        <button className="evidence-bar-btn" onClick={() => setActiveSheet('why')}>
          <span>{t('whyThisAnswerBtn')}</span>
          <span>→</span>
        </button>
      </div>

      {/* Follow-up Action Buttons */}
      <div style={{ display: 'flex', gap: '10px' }}>
        <button className="btn-exec-primary" onClick={() => setActiveSheet('approval')}>
          {t('openApprovalQuick')} →
        </button>
        <button className="btn-exec-secondary" onClick={() => switchTab('premeeting')}>
          {t('open60sBrief')}
        </button>
      </div>
    </section>
  );
};
