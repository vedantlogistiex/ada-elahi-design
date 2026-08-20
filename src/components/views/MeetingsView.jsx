import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { meetingsData } from '../../i18n/meetingsData';

export const MeetingsView = () => {
  const { t, currentLang, switchTab, openMeetingOutput } = useApp();
  const [meetingTab, setMeetingTab] = useState('schedule'); // 'schedule' | 'history'

  const isAr = currentLang === 'ar';

  return (
    <section className="screen-view" id="viewMeetings">
      <div>
        <h2 className="screen-title">{t('meetingsTitle')}</h2>
        <div className="screen-subtitle">{t('meetingsSubtitle')}</div>
      </div>

      {/* Sub-Segment Switcher: Upcoming Schedule vs Recorded History */}
      <div className="output-segment-bar" style={{ marginBottom: '12px' }}>
        <button
          className={`output-segment-btn ${meetingTab === 'schedule' ? 'active' : ''}`}
          onClick={() => setMeetingTab('schedule')}
        >
          {t('tabMtgSchedule')}
        </button>
        <button
          className={`output-segment-btn ${meetingTab === 'history' ? 'active' : ''}`}
          onClick={() => setMeetingTab('history')}
        >
          {t('tabMtgHistory')}
        </button>
      </div>

      {/* Schedule Tab */}
      {meetingTab === 'schedule' && (
        <div id="secMeetingSchedule" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* Meeting 1: ELT Review */}
          <div className="meeting-item-card" onClick={() => switchTab('premeeting')}>
            <div className="meeting-badge-row">
              <span className="priority-badge att">10:30 AM · In 48 mins</span>
              <span className="priority-badge ver">{t('briefReady')}</span>
            </div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--navy)', marginBottom: '4px' }}>
              {t('m1Title')}
            </div>
            <div style={{ fontSize: '12.5px', color: 'var(--secondary-grey)', marginBottom: '8px' }}>
              {t('m1Desc')}
            </div>
            <div style={{ fontSize: '13px', fontWeight: 650, color: 'var(--airport-blue)' }}>
              {t('open60sBrief')}
            </div>
          </div>

          {/* Meeting 2: Retail Concessionaire */}
          <div className="meeting-item-card" onClick={() => openMeetingOutput('retail', 'approved')}>
            <div className="meeting-badge-row">
              <span className="priority-badge ver">02:00 PM</span>
              <span className="priority-badge att">{t('aiDraftPending')}</span>
            </div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--navy)', marginBottom: '4px' }}>
              {t('m2Title')}
            </div>
            <div style={{ fontSize: '12.5px', color: 'var(--secondary-grey)', marginBottom: '8px' }}>
              {t('m2Desc')}
            </div>
            <div style={{ fontSize: '13px', fontWeight: 650, color: 'var(--airport-blue)' }}>
              {t('viewOutputBtn')}
            </div>
          </div>

          {/* Meeting 3: Security & Border Control */}
          <div className="meeting-item-card">
            <div className="meeting-badge-row">
              <span className="priority-badge ver">04:30 PM</span>
              <span className="priority-badge ver">Scheduled</span>
            </div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--navy)', marginBottom: '4px' }}>
              {t('m3Title')}
            </div>
            <div style={{ fontSize: '12.5px', color: 'var(--secondary-grey)' }}>
              {t('m3Desc')}
            </div>
          </div>
        </div>
      )}

      {/* Recorded History Tab */}
      {meetingTab === 'history' && (
        <div id="secMeetingHistory" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {/* History Item 1: Ops Review */}
          <div className="rec-meeting-card" onClick={() => openMeetingOutput('ops', 'draft')}>
            <div className="rec-meeting-badge-row">
              <span className="rec-tag-pill draft">
                <span>⏱</span>
                <span>{t('rec1Badge')}</span>
              </span>
              <span style={{ fontSize: '11px', color: 'var(--secondary-grey)', fontWeight: 600 }}>
                {meetingsData.ops.subtitle[currentLang] || meetingsData.ops.subtitle.en}
              </span>
            </div>
            <div style={{ fontSize: '15px', fontWeight: 750, color: 'var(--navy)', marginBottom: '4px' }}>
              {meetingsData.ops.title[currentLang] || meetingsData.ops.title.en}
            </div>
            <div style={{ fontSize: '12.5px', color: 'var(--slate)', lineHeight: 1.4 }}>
              {t('rec1Desc')}
            </div>
            <div className="rec-meeting-chips">
              <span className="rec-meta-chip">🎙 45m Audio</span>
              <span className="rec-meta-chip">🤖 3 AI Decisions</span>
              <span className="rec-meta-chip" style={{ color: 'var(--critical)' }}>⚠️ 3 Pending Actions</span>
              <span className="rec-meta-chip" style={{ color: 'var(--aviation-teal)' }}>Ref: ADA-ELT-2026-08-042</span>
            </div>
            <div style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--airport-blue)', marginTop: '10px' }}>
              {t('viewTranscriptDecisions')}
            </div>
          </div>

          {/* History Item 2: Retail Strategy */}
          <div className="rec-meeting-card" onClick={() => openMeetingOutput('retail', 'approved')}>
            <div className="rec-meeting-badge-row">
              <span className="rec-tag-pill sealed">
                <span>✓</span>
                <span>{t('rec2Badge')}</span>
              </span>
              <span style={{ fontSize: '11px', color: 'var(--secondary-grey)', fontWeight: 600 }}>
                {meetingsData.retail.subtitle[currentLang] || meetingsData.retail.subtitle.en}
              </span>
            </div>
            <div style={{ fontSize: '15px', fontWeight: 750, color: 'var(--navy)', marginBottom: '4px' }}>
              {meetingsData.retail.title[currentLang] || meetingsData.retail.title.en}
            </div>
            <div style={{ fontSize: '12.5px', color: 'var(--slate)', lineHeight: 1.4 }}>
              {t('rec2Desc')}
            </div>
            <div className="rec-meeting-chips">
              <span className="rec-meta-chip">🎙 32m Audio</span>
              <span className="rec-meta-chip">🤖 2 AI Decisions</span>
              <span className="rec-meta-chip" style={{ color: 'var(--success)' }}>✓ 3 Ratified Actions</span>
              <span className="rec-meta-chip" style={{ color: 'var(--aviation-teal)' }}>Ref: ADA-COM-2026-08-039</span>
            </div>
            <div style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--airport-blue)', marginTop: '10px' }}>
              {t('viewTranscriptDecisions')}
            </div>
          </div>

          {/* History Item 3: Runway Capacity & Noise */}
          <div className="rec-meeting-card" onClick={() => openMeetingOutput('runway', 'approved')}>
            <div className="rec-meeting-badge-row">
              <span className="rec-tag-pill sealed">
                <span>✓</span>
                <span>{t('rec3Badge')}</span>
              </span>
              <span style={{ fontSize: '11px', color: 'var(--secondary-grey)', fontWeight: 600 }}>
                {meetingsData.runway.subtitle[currentLang] || meetingsData.runway.subtitle.en}
              </span>
            </div>
            <div style={{ fontSize: '15px', fontWeight: 750, color: 'var(--navy)', marginBottom: '4px' }}>
              {meetingsData.runway.title[currentLang] || meetingsData.runway.title.en}
            </div>
            <div style={{ fontSize: '12.5px', color: 'var(--slate)', lineHeight: 1.4 }}>
              {t('rec3Desc')}
            </div>
            <div className="rec-meeting-chips">
              <span className="rec-meta-chip">🎙 48m Audio</span>
              <span className="rec-meta-chip">🤖 2 AI Decisions</span>
              <span className="rec-meta-chip" style={{ color: 'var(--success)' }}>✓ GCAA Ratified</span>
              <span className="rec-meta-chip" style={{ color: 'var(--aviation-teal)' }}>Ref: ADA-GCAA-2026-08-035</span>
            </div>
            <div style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--airport-blue)', marginTop: '10px' }}>
              {t('viewTranscriptDecisions')}
            </div>
          </div>

          {/* History Item 4: Etihad Joint Operations */}
          <div className="rec-meeting-card" onClick={() => openMeetingOutput('etihad', 'approved')}>
            <div className="rec-meeting-badge-row">
              <span className="rec-tag-pill sealed">
                <span>✓</span>
                <span>{t('rec4Badge')}</span>
              </span>
              <span style={{ fontSize: '11px', color: 'var(--secondary-grey)', fontWeight: 600 }}>
                {meetingsData.etihad.subtitle[currentLang] || meetingsData.etihad.subtitle.en}
              </span>
            </div>
            <div style={{ fontSize: '15px', fontWeight: 750, color: 'var(--navy)', marginBottom: '4px' }}>
              {meetingsData.etihad.title[currentLang] || meetingsData.etihad.title.en}
            </div>
            <div style={{ fontSize: '12.5px', color: 'var(--slate)', lineHeight: 1.4 }}>
              {t('rec4Desc')}
            </div>
            <div className="rec-meeting-chips">
              <span className="rec-meta-chip">🎙 38m Audio</span>
              <span className="rec-meta-chip">🤖 2 AI Decisions</span>
              <span className="rec-meta-chip" style={{ color: 'var(--success)' }}>✓ Bilateral Signed</span>
              <span className="rec-meta-chip" style={{ color: 'var(--aviation-teal)' }}>Ref: ADA-EY-2026-08-028</span>
            </div>
            <div style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--airport-blue)', marginTop: '10px' }}>
              {t('viewTranscriptDecisions')}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
