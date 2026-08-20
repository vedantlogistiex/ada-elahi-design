import React from 'react';
import { useApp } from '../../context/AppContext';

export const PreMeetingBriefView = () => {
  const { t, switchTab, startRecording, openMeetingOutput, currentLang } = useApp();

  return (
    <section className="screen-view active" id="viewPreMeetingBrief">
      {/* Navigation */}
      <div style={{ padding: '6px 0 16px' }}>
        <button className="btn-link" onClick={() => switchTab('meetings')} type="button">
          <span>{currentLang === 'ar' ? '→ العودة إلى الاجتماعات' : '← Back to Meetings'}</span>
        </button>
      </div>

      <div className="page-eyebrow">10:30 AM · 45 min · Executive Leadership Team</div>
      <h1 className="page-title" style={{ marginBottom: '16px' }}>{t('briefScreenTitle')}</h1>

      {/* Scribe Action Bar */}
      <div
        className="exec-scribe-bar"
        onClick={startRecording}
        role="button"
        tabIndex={0}
      >
        <div className="scribe-left">
          <div className="scribe-icon-ring">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="23" />
              <line x1="8" y1="23" x2="16" y2="23" />
            </svg>
          </div>
          <div>
            <div className="scribe-title">{t('heroRecTitle')}</div>
            <div className="scribe-sub">Acoustic Diarization · Sovereign Action Extraction</div>
          </div>
        </div>
        <button className="scribe-btn" type="button">
          {t('heroRecBtn')}
        </button>
      </div>

      {/* Structured Executive Brief Cards */}
      <div className="exec-card" style={{ marginBottom: '14px' }}>
        <div className="exec-card-header">
          <span className="exec-chip active-blue">{t('briefPurposeTitle')}</span>
          <span className="exec-card-time">Objective</span>
        </div>
        <div className="exec-card-body" style={{ margin: 0 }}>
          {t('briefPurposeText')}
        </div>
      </div>

      <div className="exec-card accent-amber" style={{ marginBottom: '14px' }}>
        <div className="exec-card-header">
          <span className="exec-chip" style={{ color: 'var(--ada-attention)', background: '#FFFBEB', borderColor: '#FDE68A' }}>
            {t('briefChangedTitle')}
          </span>
          <span className="exec-card-time">Since 08:00</span>
        </div>
        <ul className="brief-list" style={{ margin: 0, paddingInlineStart: '18px' }}>
          <li style={{ marginBottom: '6px', fontSize: '12.5px', color: 'var(--ada-slate)' }}>{t('briefChanged1')}</li>
          <li style={{ fontSize: '12.5px', color: 'var(--ada-slate)' }}>{t('briefChanged2')}</li>
        </ul>
      </div>

      <div className="exec-card" style={{ marginBottom: '18px' }}>
        <div className="exec-card-header">
          <span className="exec-chip active-blue">{t('briefQuestionsTitle')}</span>
          <span className="exec-card-time">Key Inquiries</span>
        </div>
        <ol className="brief-list" style={{ margin: 0, paddingInlineStart: '18px' }}>
          <li style={{ marginBottom: '6px', fontSize: '12.5px', color: 'var(--ada-slate)' }}>{t('briefQ1')}</li>
          <li style={{ fontSize: '12.5px', color: 'var(--ada-slate)' }}>{t('briefQ2')}</li>
        </ol>
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
