import React from 'react';
import { useApp } from '../../context/AppContext';

export const PreMeetingBriefView = () => {
  const { t, switchTab, startRecording, openMeetingOutput, currentLang } = useApp();

  return (
    <section className="screen-view active" id="viewPreMeetingBrief">
      {/* Navigation */}
      <div style={{ padding: '10px 0 16px' }}>
        <button className="btn-link" onClick={() => switchTab('meetings')} type="button">
          {t('backToMeetings')}
        </button>
      </div>

      <div className="page-eyebrow">10:30 AM · 45 min · Executive Leadership Team</div>
      <h1 className="page-title" style={{ marginBottom: '20px' }}>{t('briefScreenTitle')}</h1>

      {/* Hero Ambient Companion Recorder */}
      <button className="btn-record" style={{ marginBottom: '24px' }} onClick={startRecording} type="button">
        <span className="rec-dot-live" />
        <div style={{ flex: 1, textAlign: currentLang === 'ar' ? 'right' : 'left' }}>
          <div style={{ fontSize: '14.5px', fontWeight: 700, color: 'var(--ink)' }}>{t('heroRecTitle')}</div>
          <div style={{ fontSize: '12px', color: 'var(--ink-secondary)', marginTop: '2px' }}>
            Acoustic Diarization · Sovereign Action Extraction
          </div>
        </div>
        <span className="pill blue">{t('heroRecBtn')}</span>
      </button>

      {/* Brief Card Container */}
      <div className="card" style={{ padding: '22px 24px', marginBottom: '20px' }}>
        {/* Purpose */}
        <div className="brief-section">
          <div className="brief-kicker">{t('briefPurposeTitle')}</div>
          <div className="brief-body">{t('briefPurposeText')}</div>
        </div>

        <div style={{ height: '1px', background: 'var(--border-glass)', margin: '18px 0' }} />

        {/* What Changed */}
        <div className="brief-section">
          <div className="brief-kicker" style={{ color: 'var(--accent-gold)' }}>{t('briefChangedTitle')}</div>
          <ul className="brief-list">
            <li style={{ marginBottom: '6px' }}>{t('briefChanged1')}</li>
            <li>{t('briefChanged2')}</li>
          </ul>
        </div>

        <div style={{ height: '1px', background: 'var(--border-glass)', margin: '18px 0' }} />

        {/* Suggested Questions */}
        <div className="brief-section" style={{ marginBottom: 0 }}>
          <div className="brief-kicker" style={{ color: 'var(--accent-cyan)' }}>{t('briefQuestionsTitle')}</div>
          <ol className="brief-list">
            <li style={{ marginBottom: '6px' }}>{t('briefQ1')}</li>
            <li>{t('briefQ2')}</li>
          </ol>
        </div>
      </div>

      {/* Primary CTA */}
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
