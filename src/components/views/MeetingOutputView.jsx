import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const MeetingOutputView = () => {
  const { t, currentLang, switchTab, currentMeetingData, outputStatus, approveCurrentMeeting, setActiveSheet } = useApp();
  const [segment, setSegment] = useState('decisions'); // 'decisions' | 'transcript'

  const isAr = currentLang === 'ar';
  const isApproved = outputStatus === 'approved';

  return (
    <section className="screen-view" id="viewMeetingOutput">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button
          className="studio-btn"
          style={{ background: 'var(--white-surface)', color: 'var(--navy)', borderColor: 'var(--border-subtle)' }}
          onClick={() => switchTab('meetings')}
        >
          {t('backToMeetings')}
        </button>
        <span className={`output-state-badge ${isApproved ? 'approved' : 'draft'}`} id="outputStatusBadge">
          {isApproved ? (isAr ? 'سجل معتمد' : 'Approved Record') : (isAr ? 'مسودة ذكاء اصطناعي' : 'AI Draft')}
        </span>
      </div>

      <div>
        <h2 className="screen-title" id="outputMeetingTitle">
          {currentMeetingData.title[currentLang] || currentMeetingData.title.en}
        </h2>
        <div className="screen-subtitle" id="outputSubtitle">
          {currentMeetingData.subtitle[currentLang] || currentMeetingData.subtitle.en}
        </div>
      </div>

      {/* Dual Segment Switcher: AI Decisions vs Verbatim Transcript */}
      <div className="output-segment-bar">
        <button
          className={`output-segment-btn ${segment === 'decisions' ? 'active' : ''}`}
          id="btnSegDecisions"
          onClick={() => setSegment('decisions')}
        >
          {t('segDecisions')}
        </button>
        <button
          className={`output-segment-btn ${segment === 'transcript' ? 'active' : ''}`}
          id="btnSegTranscript"
          onClick={() => setSegment('transcript')}
        >
          {t('segTranscript')} ({currentMeetingData.transcripts.length})
        </button>
      </div>

      {/* Segment 1: AI Decisions & Pending Actions */}
      {segment === 'decisions' && (
        <div id="outputSegmentDecisions" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* Executive Summary */}
          <div className="brief-block">
            <h4>{t('summaryKicker')}</h4>
            <p>{currentMeetingData.summary[currentLang] || currentMeetingData.summary.en}</p>
          </div>

          {/* Decisions Taken by Elahi AI Agent */}
          <div className="brief-block">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
              <h4 style={{ color: 'var(--airport-blue)', marginBottom: 0 }}>
                {isAr
                  ? `القرارات المتخذة بواسطة وكيل الذكاء الاصطناعي (${currentMeetingData.decisions.length})`
                  : `Decisions Taken by Elahi AI Agent (${currentMeetingData.decisions.length})`}
              </h4>
              <span className="trust-chip" style={{ marginTop: 0, fontSize: '10px', padding: '2px 8px' }}>
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
            <h4 style={{ color: 'var(--critical)', marginBottom: '8px' }}>
              {isAr
                ? `الإجراءات المعلقة والتوقيعات التنفيذية (${currentMeetingData.actions.length})`
                : `Pending Actions & Executive Sign-offs (${currentMeetingData.actions.length})`}
            </h4>

            {currentMeetingData.actions.map((act, i) => (
              <div className="pending-action-card" key={i}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--navy)' }}>
                    {act.title[currentLang] || act.title.en}
                  </div>
                  <div style={{ fontSize: '11.5px', color: 'var(--secondary-grey)', marginTop: '2px' }}>
                    {act.meta[currentLang] || act.meta.en}
                  </div>
                </div>

                {act.type === 'sign' && (
                  <button
                    className="btn-exec-primary"
                    style={{ padding: '6px 12px', fontSize: '12px', whiteSpace: 'nowrap' }}
                    onClick={() => setActiveSheet('approval')}
                  >
                    {isAr ? 'توقيع وإرسال ←' : 'Sign & Dispatch →'}
                  </button>
                )}
                {act.type === 'ping' && (
                  <button
                    className="btn-exec-secondary"
                    style={{ padding: '6px 12px', fontSize: '12px', whiteSpace: 'nowrap' }}
                    onClick={() => alert(isAr ? 'تم إرسال إشعار للمسؤول' : 'Ping notification dispatched to Lead')}
                  >
                    {isAr ? 'تنبيه المسؤول' : 'Ping Lead'}
                  </button>
                )}
                {act.type === 'status' && (
                  <span className="priority-badge ver">
                    {isAr ? 'مكتمل / قيد المتابعة' : 'Logged / Active'}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Review & Approval CTA / Sealed Record Box */}
          {!isApproved ? (
            <div className="brief-block" style={{ background: 'var(--attention-bg)', borderColor: 'rgba(201,135,35,0.3)' }}>
              <div style={{ fontSize: '12px', color: '#7D4F08', marginBottom: '10px' }}>
                {t('draftReviewNotice')}
              </div>
              <button className="btn-exec-primary" style={{ width: '100%' }} onClick={approveCurrentMeeting}>
                {t('approveRecordBtn')}
              </button>
            </div>
          ) : (
            <div className="brief-block" style={{ background: 'var(--success-bg)', borderColor: 'rgba(38,134,91,0.25)' }}>
              <div style={{ fontSize: '12.5px', color: 'var(--success)', fontWeight: 600 }}>
                ✓ {isAr
                  ? `سجل رسمي موثق ومختوم (رقم: ${currentMeetingData.id}). تم قيده في الذاكرة المؤسسية.`
                  : `Sealed official record (ID: ${currentMeetingData.id}). Registered in Institutional Memory.`}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Segment 2: Verbatim Speaker-Diarized Transcript */}
      {segment === 'transcript' && (
        <div id="outputSegmentTranscript" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ background: 'var(--sky-mist)', border: '1px solid rgba(23,105,170,0.18)', borderRadius: 'var(--radius-md)', padding: '10px 12px', fontSize: '12px', color: 'var(--slate)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
            <span>🎙 {isAr ? 'التفريغ الصوتي عالي الدقة (دقة 99.2%)' : 'Multi-Speaker Acoustic Diarization (99.2% confidence)'}</span>
            <b style={{ color: 'var(--airport-blue)' }}>Audio Log</b>
          </div>

          {currentMeetingData.transcripts.map((tRow, i) => (
            <div
              key={i}
              className="transcript-row"
              style={
                tRow.isAi
                  ? { background: '#0B1F33', color: '#FFFFFF', borderColor: 'var(--aviation-teal)' }
                  : {}
              }
            >
              <div className="transcript-speaker-meta">
                <span style={{ color: tRow.isAi ? 'var(--aviation-teal)' : 'var(--navy)', fontWeight: 750 }}>
                  {tRow.speaker}
                </span>
                <span className="time-tag" style={{ color: tRow.isAi ? '#94A3B8' : 'var(--secondary-grey)', fontSize: '11px' }}>
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
