import React from 'react';
import { useApp } from '../../context/AppContext';

export const PreMeetingBriefView = () => {
  const { t, switchTab, startRecording, openMeetingOutput, setActiveSheet } = useApp();

  return (
    <section className="screen-view active" id="viewPreMeetingBrief">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <button className="lang-toggle-btn" onClick={() => switchTab('meetings')}>
          <span data-i18n="backToMeetings">{t('backToMeetings')}</span>
        </button>
        <span className="priority-badge ver" data-i18n="briefVerifiedBadge">
          {t('briefVerifiedBadge')}
        </span>
      </div>

      <h1 className="screen-title" data-i18n="briefScreenTitle">
        {t('briefScreenTitle')}
      </h1>
      <div className="screen-subtitle">10:30 AM · Executive Leadership Team · 45 min</div>

      {/* Prominent Hero Record Button in Pre-Meeting Brief */}
      <button className="hero-record-btn" id="btnStartRecHero" onClick={startRecording}>
        <div className="hero-record-left">
          <div className="hero-record-icon-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="22" />
            </svg>
            <span className="live-rec-dot-beacon" />
          </div>
          <div className="hero-record-text">
            <div className="hero-record-title">
              <span data-i18n="heroRecTitle">{t('heroRecTitle')}</span>
            </div>
            <div className="hero-record-sub" data-i18n="heroRecSub">
              {t('heroRecSub')}
            </div>
          </div>
        </div>
        <div className="hero-record-cta-badge">
          <span className="live-pulse" style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#FFFFFF' }} />
          <span data-i18n="heroRecBtn">{t('heroRecBtn')}</span>
        </div>
      </button>

      <div className="brief-container">
        {/* Purpose */}
        <div className="brief-block">
          <h4 data-i18n="briefPurposeTitle">{t('briefPurposeTitle')}</h4>
          <p data-i18n="briefPurposeText">{t('briefPurposeText')}</p>
        </div>

        {/* What Changed */}
        <div className="brief-block">
          <h4 data-i18n="briefChangedTitle">{t('briefChangedTitle')}</h4>
          <ul>
            <li data-i18n="briefChanged1">{t('briefChanged1')}</li>
            <li data-i18n="briefChanged2">{t('briefChanged2')}</li>
          </ul>
        </div>

        {/* Prior Commitments */}
        <div className="brief-block">
          <h4 data-i18n="briefCommitmentsTitle">{t('briefCommitmentsTitle')}</h4>
          <ul>
            <li data-i18n="briefCommit1">{t('briefCommit1')}</li>
            <li data-i18n="briefCommit2">{t('briefCommit2')}</li>
          </ul>
        </div>

        {/* Open Issues */}
        <div className="brief-block">
          <h4 data-i18n="briefOpenIssuesTitle">{t('briefOpenIssuesTitle')}</h4>
          <p data-i18n="briefOpenIssuesText">{t('briefOpenIssuesText')}</p>
        </div>

        {/* Suggested Questions */}
        <div className="brief-block" style={{ background: 'var(--sky-mist)', borderColor: 'rgba(23, 105, 170, 0.2)' }}>
          <h4 style={{ color: 'var(--airport-blue)' }} data-i18n="briefQuestionsTitle">
            {t('briefQuestionsTitle')}
          </h4>
          <ol style={{ paddingLeft: '18px', paddingRight: '18px', fontSize: '13.5px', color: 'var(--navy)', lineHeight: 1.4 }}>
            <li style={{ marginBottom: '4px' }} data-i18n="briefQ1">{t('briefQ1')}</li>
            <li data-i18n="briefQ2">{t('briefQ2')}</li>
          </ol>
        </div>
      </div>

      <div className="brief-action-bar" style={{ marginTop: '14px' }}>
        <button className="btn-exec-primary" onClick={() => openMeetingOutput('ops', 'draft')} data-i18n="enterMeetingBtn">
          {t('enterMeetingBtn')}
        </button>
        <button className="btn-exec-secondary" onClick={() => setActiveSheet('approval')} data-i18n="openApprovalQuick">
          {t('openApprovalQuick')}
        </button>
      </div>
    </section>
  );
};
