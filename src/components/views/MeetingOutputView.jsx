import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const MeetingOutputView = () => {
  const {
    t,
    currentLang,
    switchTab,
    currentMeetingData,
    outputStatus,
    approveCurrentMeeting,
    setActiveSheet,
    showToast
  } = useApp();
  const [segment, setSegment] = useState('decisions'); // 'decisions' | 'transcript'

  const isApproved = outputStatus === 'approved';

  return (
    <section className="screen-view active" id="viewMeetingOutput">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <button className="lang-toggle-btn" onClick={() => switchTab('meetings')}>
          <span data-i18n="backToMeetings">{t('backToMeetings')}</span>
        </button>
        <div id="outputStatusBadge" className={`output-state-badge ${isApproved ? 'approved' : 'draft'}`}>
          <span data-i18n={isApproved ? 'sealedRecordNotice' : 'aiDraftBadge'}>
            {isApproved ? (currentLang === 'ar' ? 'سجل معتمد' : 'Approved Record') : (currentLang === 'ar' ? 'مسودة ذكاء اصطناعي' : 'AI Draft')}
          </span>
        </div>
      </div>

      <h1 className="screen-title" data-i18n="mOutputTitle">
        {currentMeetingData.title[currentLang] || currentMeetingData.title.en}
      </h1>
      <div className="screen-subtitle" id="outputSubtitle">
        {currentMeetingData.subtitle[currentLang] || currentMeetingData.subtitle.en}
      </div>

      {/* Meeting Output Segment Switcher (AI Decisions & Actions vs Verbatim Transcript) */}
      <div className="output-segment-bar">
        <button
          className={`output-segment-btn ${segment === 'decisions' ? 'active' : ''}`}
          id="btnSegDecisions"
          onClick={() => setSegment('decisions')}
          data-i18n="segDecisions"
        >
          {t('segDecisions')}
        </button>
        <button
          className={`output-segment-btn ${segment === 'transcript' ? 'active' : ''}`}
          id="btnSegTranscript"
          onClick={() => setSegment('transcript')}
          data-i18n="segTranscript"
        >
          {t('segTranscript')}
        </button>
      </div>

      {/* TAB 1: AI DECISIONS & PENDING ACTIONS */}
      {segment === 'decisions' && (
        <div id="outputSegmentDecisions" className="brief-container">
          {/* Executive Summary */}
          <div className="brief-block">
            <h4 data-i18n="summaryKicker">{t('summaryKicker')}</h4>
            <p data-i18n="outputSummaryText">
              {currentMeetingData.summary[currentLang] || currentMeetingData.summary.en}
            </p>
          </div>

          {/* Decisions Agent Took Based on Meeting */}
          <div className="brief-block">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
              <h4 style={{ color: 'var(--airport-blue)', marginBottom: 0 }} data-i18n="agentDecisionsKicker">
                {t('agentDecisionsKicker')}
              </h4>
              <span className="trust-chip" style={{ marginTop: 0, fontSize: '10px', padding: '2px 8px' }} data-i18n="agentAutonomousBadge">
                {t('agentAutonomousBadge')}
              </span>
            </div>

            {currentMeetingData.decisions.map((dec, i) => (
              <div className="agent-decision-card" key={i}>
                <div className="agent-decision-title">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  <span>{dec.title[currentLang] || dec.title.en}</span>
                </div>
                <div className="agent-decision-desc">
                  {dec.desc[currentLang] || dec.desc.en}
                </div>
              </div>
            ))}
          </div>

          {/* Pending Actions & Executive Sign-offs */}
          <div className="brief-block">
            <h4 style={{ color: 'var(--critical)', marginBottom: '8px' }} data-i18n="pendingActionsKicker">
              {t('pendingActionsKicker')}
            </h4>

            {currentMeetingData.actions.map((act, i) => (
              <div className="pending-action-card" key={i} onClick={act.type === 'sign' ? () => setActiveSheet('approval') : undefined}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--navy)' }}>
                    {act.title[currentLang] || act.title.en}
                  </div>
                  <div style={{ fontSize: '11.5px', color: 'var(--secondary-grey)', marginTop: '2px' }}>
                    {act.meta[currentLang] || act.meta.en}
                  </div>
                </div>

                {act.type === 'sign' && (
                  <button className="btn-exec-primary" style={{ padding: '6px 12px', fontSize: '12px', whiteSpace: 'nowrap' }} data-i18n="pend1Action">
                    {t('pend1Action')}
                  </button>
                )}
                {act.type === 'ping' && (
                  <button
                    className="btn-exec-secondary"
                    style={{ padding: '6px 12px', fontSize: '12px', whiteSpace: 'nowrap' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      showToast(currentLang === 'ar' ? 'تم إرسال إشعار للمسؤول' : 'Ping notification dispatched to Lead');
                    }}
                    data-i18n="pend2Action"
                  >
                    {t('pend2Action')}
                  </button>
                )}
                {act.type === 'status' && (
                  <span className="priority-badge ver" data-i18n="pend3Status">
                    {t('pend3Status')}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Conditional Approval Action for AI Draft */}
          {!isApproved ? (
            <div id="draftApprovalSection" style={{ marginTop: '10px' }}>
              <div style={{ background: 'var(--attention-bg)', border: '1px solid rgba(201,135,35,0.25)', borderRadius: 'var(--radius-md)', padding: '12px', fontSize: '12.5px', color: '#8B540A', marginBottom: '12px' }} data-i18n="draftReviewNotice">
                {t('draftReviewNotice')}
              </div>
              <button className="btn-exec-primary" style={{ width: '100%' }} onClick={approveCurrentMeeting} data-i18n="approveRecordBtn">
                {t('approveRecordBtn')}
              </button>
            </div>
          ) : (
            <div id="approvedRecordSection" style={{ marginTop: '10px' }}>
              <div style={{ background: 'var(--success-bg)', border: '1px solid rgba(38,134,91,0.25)', borderRadius: 'var(--radius-md)', padding: '12px', fontSize: '12.5px', color: 'var(--success)' }} data-i18n="sealedRecordNotice">
                ✓ {currentLang === 'ar'
                  ? `سجل رسمي موثق ومختوم (رقم: ${currentMeetingData.id}). تم قيده في الذاكرة المؤسسية.`
                  : `Sealed official record (ID: ${currentMeetingData.id}). Registered in Institutional Memory.`}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: VERBATIM MEETING TRANSCRIPT */}
      {segment === 'transcript' && (
        <div id="outputSegmentTranscript" className="transcript-container" style={{ display: 'flex' }}>
          <div style={{ background: 'var(--sky-mist)', border: '1px solid rgba(23,105,170,0.18)', borderRadius: 'var(--radius-md)', padding: '10px 12px', fontSize: '12px', color: 'var(--slate)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
            <span>🎙 {currentLang === 'ar' ? 'التفريغ الصوتي متعدد المتحدثين (دقة 99.2%)' : 'Multi-Speaker Acoustic Diarization (99.2% confidence)'}</span>
            <b style={{ color: 'var(--airport-blue)' }}>45 mins audio</b>
          </div>

          {currentMeetingData.transcripts.map((tRow, i) => (
            <div
              key={i}
              className="transcript-row"
              style={
                tRow.isAi
                  ? { background: '#0B1F33', color: '#FFFFFF', borderColor: 'var(--aviation-teal)' }
                  : (i === 4 ? { background: 'var(--sky-mist)', borderColor: 'rgba(23,105,170,0.25)' } : {})
              }
            >
              <div className="transcript-speaker-meta">
                <span style={{ color: tRow.isAi ? 'var(--aviation-teal)' : 'var(--navy)', fontWeight: 750 }}>
                  {tRow.speaker}
                </span>
                <span className="time-tag" style={{ color: tRow.isAi ? '#94A3B8' : 'var(--secondary-grey)' }}>
                  {tRow.time}
                </span>
              </div>
              <div className="transcript-quote" style={{ color: tRow.isAi ? '#EAF3F8' : 'var(--slate)' }}>
                "{tRow.quote[currentLang] || tRow.quote.en}"
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
