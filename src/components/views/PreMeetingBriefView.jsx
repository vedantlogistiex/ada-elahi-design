import React from 'react';
import { useApp } from '../../context/AppContext';

export const PreMeetingBriefView = () => {
  const { t, switchTab, startRecording, openMeetingOutput, currentLang } = useApp();

  return (
    <section className="screen-view active" id="viewPreMeetingBrief">
      {/* Navigation */}
      <div style={{ padding: '6px 0 14px' }}>
        <button className="btn-link" onClick={() => switchTab('meetings')} type="button">
          <span style={{ fontSize: '18px', fontWeight: 800 }}>‹</span>
          <span style={{ marginInlineStart: '4px' }}>{t('backToMeetings')}</span>
        </button>
      </div>

      <div className="page-eyebrow">10:30 AM · 45 min · Executive Leadership Team</div>
      <h1 className="page-title" style={{ marginBottom: '16px' }}>{t('briefScreenTitle')}</h1>

      {/* Hero Recording Action Banner */}
      <div
        className="elahi-hero-banner"
        onClick={startRecording}
        role="button"
        tabIndex={0}
        style={{ marginBottom: '18px' }}
      >
        <div className="banner-left">
          <div className="banner-icon-box">🎙️</div>
          <div>
            <div className="banner-title">{t('heroRecTitle')}</div>
            <div className="banner-sub">Acoustic Diarization · Sovereign Action Extraction</div>
          </div>
        </div>
        <span className="banner-pill">{t('heroRecBtn')}</span>
      </div>

      {/* Brief Card Container */}
      <div className="anees-highlight-card" style={{ cursor: 'default', marginBottom: '18px' }}>
        {/* Purpose */}
        <div className="brief-section">
          <div className="brief-kicker">{t('briefPurposeTitle')}</div>
          <div className="brief-body">{t('briefPurposeText')}</div>
        </div>

        <div style={{ height: '1px', background: 'var(--border-subtle)', margin: '12px 0' }} />

        {/* What Changed */}
        <div className="brief-section">
          <div className="brief-kicker" style={{ color: 'var(--ada-attention)' }}>{t('briefChangedTitle')}</div>
          <ul className="brief-list">
            <li style={{ marginBottom: '5px' }}>{t('briefChanged1')}</li>
            <li>{t('briefChanged2')}</li>
          </ul>
        </div>

        <div style={{ height: '1px', background: 'var(--border-subtle)', margin: '12px 0' }} />

        {/* Suggested Questions */}
        <div className="brief-section" style={{ marginBottom: 0 }}>
          <div className="brief-kicker" style={{ color: 'var(--ada-blue)' }}>{t('briefQuestionsTitle')}</div>
          <ol className="brief-list">
            <li style={{ marginBottom: '5px' }}>{t('briefQ1')}</li>
            <li>{t('briefQ2')}</li>
          </ol>
        </div>
      </div>

      {/* Primary Action Button */}
      <button
        className="btn-primary"
        style={{ width: '100%' }}
        onClick={() => openMeetingOutput('ops', 'draft')}
        type="button"
      >
        {t('enterMeetingBtn')}
      </button>
    </section>
  );
};
