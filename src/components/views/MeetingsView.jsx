import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const MeetingsView = () => {
  const { t, switchTab, openMeetingOutput } = useApp();
  const [activeSubTab, setActiveSubTab] = useState('schedule'); // 'schedule' | 'history'

  return (
    <section className="screen-view active" id="viewMeetings">
      <h1 className="screen-title" data-i18n="meetingsTitle">
        {t('meetingsTitle')}
      </h1>
      <div className="screen-subtitle" data-i18n="meetingsSubtitle">
        {t('meetingsSubtitle')}
      </div>

      {/* Schedule vs Recorded History Switcher */}
      <div className="output-segment-bar" style={{ marginBottom: '14px' }}>
        <button
          className={`output-segment-btn ${activeSubTab === 'schedule' ? 'active' : ''}`}
          id="btnMtgSchedule"
          onClick={() => setActiveSubTab('schedule')}
          data-i18n="tabMtgSchedule"
        >
          {t('tabMtgSchedule')}
        </button>
        <button
          className={`output-segment-btn ${activeSubTab === 'history' ? 'active' : ''}`}
          id="btnMtgHistory"
          onClick={() => setActiveSubTab('history')}
          data-i18n="tabMtgHistory"
        >
          {t('tabMtgHistory')}
        </button>
      </div>

      {/* VIEW 1: UPCOMING SCHEDULE */}
      {activeSubTab === 'schedule' && (
        <div id="secMeetingSchedule">
          {/* Meeting 1: Active Focus */}
          <div className="meeting-item-card" onClick={() => switchTab('premeeting')}>
            <div className="meeting-badge-row">
              <span className="priority-badge ver" data-i18n="briefReady">
                {t('briefReady')}
              </span>
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--navy)' }}>
                10:30 AM · 45 min
              </span>
            </div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--navy)', marginBottom: '4px' }} data-i18n="m1Title">
              {t('m1Title')}
            </div>
            <div style={{ fontSize: '13px', color: 'var(--secondary-grey)' }} data-i18n="m1Desc">
              {t('m1Desc')}
            </div>
            <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '12px', color: 'var(--airport-blue)', fontWeight: 600 }} data-i18n="open60sBrief">
                {t('open60sBrief')}
              </span>
              <span style={{ fontSize: '11px', color: 'var(--secondary-grey)' }}>3 prior commitments</span>
            </div>
          </div>

          {/* Meeting 2: Afternoon */}
          <div className="meeting-item-card" style={{ marginTop: '12px' }} onClick={() => openMeetingOutput('retail', 'draft')}>
            <div className="meeting-badge-row">
              <span className="priority-badge att" data-i18n="aiDraftPending">
                {t('aiDraftPending')}
              </span>
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--navy)' }}>
                02:00 PM · 30 min
              </span>
            </div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--navy)', marginBottom: '4px' }} data-i18n="m2Title">
              {t('m2Title')}
            </div>
            <div style={{ fontSize: '13px', color: 'var(--secondary-grey)' }} data-i18n="m2Desc">
              {t('m2Desc')}
            </div>
            <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '12px', color: 'var(--airport-blue)', fontWeight: 600 }} data-i18n="viewOutputBtn">
                {t('viewOutputBtn')}
              </span>
              <span style={{ fontSize: '11px', color: 'var(--secondary-grey)' }}>2 decisions · 3 actions</span>
            </div>
          </div>

          {/* Meeting 3: Evening Sync */}
          <div className="meeting-item-card" style={{ marginTop: '12px', opacity: 0.85 }}>
            <div className="meeting-badge-row">
              <span className="priority-badge ver">Scheduled</span>
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--navy)' }}>
                04:30 PM · 30 min
              </span>
            </div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--navy)', marginBottom: '4px' }} data-i18n="m3Title">
              {t('m3Title')}
            </div>
            <div style={{ fontSize: '13px', color: 'var(--secondary-grey)' }} data-i18n="m3Desc">
              {t('m3Desc')}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: RECORDED MEETINGS HISTORY WITH TRANSCRIPT, DECISIONS & ACTIONS */}
      {activeSubTab === 'history' && (
        <div id="secMeetingHistory">
          {/* Record 1: Operational Performance Review */}
          <div className="rec-meeting-card" onClick={() => openMeetingOutput('ops', 'draft')}>
            <div className="rec-meeting-badge-row">
              <span className="rec-tag-pill draft">
                <span className="live-pulse" style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#EF4444' }} />
                <span data-i18n="rec1Badge">{t('rec1Badge')}</span>
              </span>
              <span style={{ fontSize: '11.5px', color: 'var(--secondary-grey)' }}>Today 10:30 AM</span>
            </div>
            <div style={{ fontSize: '15.5px', fontWeight: 750, color: 'var(--navy)', marginBottom: '3px' }} data-i18n="rec1Title">
              {t('rec1Title')}
            </div>
            <div style={{ fontSize: '12.5px', color: 'var(--slate)', lineHeight: 1.35 }} data-i18n="rec1Desc">
              {t('rec1Desc')}
            </div>
            <div className="rec-meeting-chips">
              <span className="rec-meta-chip">🎙 45 min audio</span>
              <span className="rec-meta-chip" style={{ color: 'var(--airport-blue)' }}>⚡ 3 Agent Decisions</span>
              <span className="rec-meta-chip" style={{ color: 'var(--critical)' }}>⚠️ 3 Pending Actions</span>
            </div>
            <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-subtle)', paddingTop: '8px' }}>
              <span style={{ fontSize: '12px', color: 'var(--airport-blue)', fontWeight: 600 }} data-i18n="viewTranscriptDecisions">
                {t('viewTranscriptDecisions')}
              </span>
              <span style={{ fontSize: '10.5px', color: 'var(--secondary-grey)' }}>Ref: ADA-ELT-2026-08-042</span>
            </div>
          </div>

          {/* Record 2: Terminal A Concessionaire & Retail Strategy */}
          <div className="rec-meeting-card" style={{ marginTop: '10px' }} onClick={() => openMeetingOutput('retail', 'approved')}>
            <div className="rec-meeting-badge-row">
              <span className="rec-tag-pill sealed">
                <span>✓</span>
                <span data-i18n="rec2Badge">{t('rec2Badge')}</span>
              </span>
              <span style={{ fontSize: '11.5px', color: 'var(--secondary-grey)' }}>19 Aug 14:00</span>
            </div>
            <div style={{ fontSize: '15.5px', fontWeight: 750, color: 'var(--navy)', marginBottom: '3px' }} data-i18n="rec2Title">
              {t('rec2Title')}
            </div>
            <div style={{ fontSize: '12.5px', color: 'var(--slate)', lineHeight: 1.35 }} data-i18n="rec2Desc">
              {t('rec2Desc')}
            </div>
            <div className="rec-meeting-chips">
              <span className="rec-meta-chip">🎙 32 min audio</span>
              <span className="rec-meta-chip" style={{ color: 'var(--airport-blue)' }}>⚡ 2 Agent Decisions</span>
              <span className="rec-meta-chip" style={{ color: 'var(--success)' }}>✓ 3 Actions Assigned</span>
            </div>
            <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-subtle)', paddingTop: '8px' }}>
              <span style={{ fontSize: '12px', color: 'var(--airport-blue)', fontWeight: 600 }} data-i18n="viewTranscriptDecisions">
                {t('viewTranscriptDecisions')}
              </span>
              <span style={{ fontSize: '10.5px', color: 'var(--secondary-grey)' }}>Ref: ADA-COM-2026-08-039</span>
            </div>
          </div>

          {/* Record 3: Q3 Runway Capacity & Noise Abatement Verification */}
          <div className="rec-meeting-card" style={{ marginTop: '10px' }} onClick={() => openMeetingOutput('runway', 'approved')}>
            <div className="rec-meeting-badge-row">
              <span className="rec-tag-pill sealed">
                <span>✓</span>
                <span data-i18n="rec3Badge">{t('rec3Badge')}</span>
              </span>
              <span style={{ fontSize: '11.5px', color: 'var(--secondary-grey)' }}>18 Aug 09:00</span>
            </div>
            <div style={{ fontSize: '15.5px', fontWeight: 750, color: 'var(--navy)', marginBottom: '3px' }} data-i18n="rec3Title">
              {t('rec3Title')}
            </div>
            <div style={{ fontSize: '12.5px', color: 'var(--slate)', lineHeight: 1.35 }} data-i18n="rec3Desc">
              {t('rec3Desc')}
            </div>
            <div className="rec-meeting-chips">
              <span className="rec-meta-chip">🎙 48 min audio</span>
              <span className="rec-meta-chip" style={{ color: 'var(--airport-blue)' }}>⚡ 4 Agent Decisions</span>
              <span className="rec-meta-chip" style={{ color: 'var(--success)' }}>✓ 2 Actions Completed</span>
            </div>
            <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-subtle)', paddingTop: '8px' }}>
              <span style={{ fontSize: '12px', color: 'var(--airport-blue)', fontWeight: 600 }} data-i18n="viewTranscriptDecisions">
                {t('viewTranscriptDecisions')}
              </span>
              <span style={{ fontSize: '10.5px', color: 'var(--secondary-grey)' }}>Ref: ADA-GCAA-2026-08-035</span>
            </div>
          </div>

          {/* Record 4: Etihad Joint Operations SLA Alignment */}
          <div className="rec-meeting-card" style={{ marginTop: '10px' }} onClick={() => openMeetingOutput('etihad', 'approved')}>
            <div className="rec-meeting-badge-row">
              <span className="rec-tag-pill sealed">
                <span>✓</span>
                <span data-i18n="rec4Badge">{t('rec4Badge')}</span>
              </span>
              <span style={{ fontSize: '11.5px', color: 'var(--secondary-grey)' }}>15 Aug 11:15</span>
            </div>
            <div style={{ fontSize: '15.5px', fontWeight: 750, color: 'var(--navy)', marginBottom: '3px' }} data-i18n="rec4Title">
              {t('rec4Title')}
            </div>
            <div style={{ fontSize: '12.5px', color: 'var(--slate)', lineHeight: 1.35 }} data-i18n="rec4Desc">
              {t('rec4Desc')}
            </div>
            <div className="rec-meeting-chips">
              <span className="rec-meta-chip">🎙 38 min audio</span>
              <span className="rec-meta-chip" style={{ color: 'var(--airport-blue)' }}>⚡ 2 Agent Decisions</span>
              <span className="rec-meta-chip" style={{ color: 'var(--success)' }}>✓ 2 Actions In Progress</span>
            </div>
            <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-subtle)', paddingTop: '8px' }}>
              <span style={{ fontSize: '12px', color: 'var(--airport-blue)', fontWeight: 600 }} data-i18n="viewTranscriptDecisions">
                {t('viewTranscriptDecisions')}
              </span>
              <span style={{ fontSize: '10.5px', color: 'var(--secondary-grey)' }}>Ref: ADA-EY-2026-08-028</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
