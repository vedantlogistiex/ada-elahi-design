import React from 'react';
import { useApp } from '../../context/AppContext';

export const PreMeetingBriefView = () => {
  const { t, switchTab, startRecording, openMeetingOutput } = useApp();

  return (
    <section className="screen-view" id="viewPreMeetingBrief">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button
          className="studio-btn"
          style={{ background: 'var(--white-surface)', color: 'var(--navy)', borderColor: 'var(--border-subtle)' }}
          onClick={() => switchTab('meetings')}
        >
          {t('backToMeetings')}
        </button>
        <span className="priority-badge ver">{t('briefVerifiedBadge')}</span>
      </div>

      <div>
        <h2 className="screen-title">{t('briefScreenTitle')}</h2>
        <div className="screen-subtitle">10:30 AM · Boardroom A & Video · 45 mins</div>
      </div>

      {/* Prominent Hero Record Button inside Pre-Meeting Brief */}
      <button className="hero-record-btn" onClick={startRecording} id="btnStartRecHero">
        <div className="hero-record-left">
          <div className="hero-record-icon-wrap">
            <span className="live-rec-dot-beacon" />
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="23" />
              <line x1="8" y1="23" x2="16" y2="23" />
            </svg>
          </div>
          <div className="hero-record-text">
            <span className="hero-record-title">
              <span>{t('heroRecTitle')}</span>
            </span>
            <span className="hero-record-sub">{t('heroRecSub')}</span>
          </div>
        </div>
        <span className="hero-record-cta-badge">
          <span>{t('recNowBtn')}</span>
        </span>
      </button>

      {/* Scannable 60-Second Briefing Structure */}
      <div className="brief-container">
        {/* Purpose */}
        <div className="brief-block">
          <h4>{t('briefPurposeTitle')}</h4>
          <p>{t('briefPurposeText')}</p>
        </div>

        {/* What Changed */}
        <div className="brief-block">
          <h4>{t('briefChangedTitle')}</h4>
          <ul>
            <li>{t('briefChanged1')}</li>
            <li>{t('briefChanged2')}</li>
          </ul>
        </div>

        {/* Prior Commitments */}
        <div className="brief-block">
          <h4>{t('briefCommitmentsTitle')}</h4>
          <ul>
            <li>{t('briefCommit1')}</li>
            <li>{t('briefCommit2')}</li>
          </ul>
        </div>

        {/* Open Issues */}
        <div className="brief-block">
          <h4>{t('briefOpenIssuesTitle')}</h4>
          <p>{t('briefOpenIssuesText')}</p>
        </div>

        {/* Suggested Executive Questions */}
        <div className="brief-block" style={{ borderLeft: '3px solid var(--airport-blue)' }}>
          <h4 style={{ color: 'var(--airport-blue)' }}>{t('briefQuestionsTitle')}</h4>
          <ul style={{ listStyleType: 'none', paddingLeft: 0, paddingRight: 0 }}>
            <li style={{ marginBottom: '8px', fontStyle: 'italic' }}>{t('briefQ1')}</li>
            <li style={{ fontStyle: 'italic' }}>{t('briefQ2')}</li>
          </ul>
        </div>
      </div>

      <div className="brief-action-bar">
        <button className="btn-exec-secondary" style={{ flex: 1 }} onClick={() => openMeetingOutput('ops', 'draft')}>
          {t('enterMeetingBtn')}
        </button>
      </div>
    </section>
  );
};
