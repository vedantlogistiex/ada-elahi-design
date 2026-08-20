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

  const [seg, setSeg] = useState('decisions');
  const isApproved = outputStatus === 'approved';

  return (
    <section className="screen-view active" id="viewMeetingOutput">
      {/* Top Navigation & Status Badge */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0 16px' }}>
        <button className="btn-link" onClick={() => switchTab('meetings')} type="button">
          <span>{currentLang === 'ar' ? '→ العودة إلى الاجتماعات' : '← Back to Meetings'}</span>
        </button>
        <span className={`pill ${isApproved ? 'ok' : 'err'}`}>
          {isApproved
            ? (currentLang === 'ar' ? 'سجل رسمي مختوم' : 'Sealed Record')
            : (currentLang === 'ar' ? 'مسودة ذكية' : 'Draft Synthesis')}
        </span>
      </div>

      {/* Meeting Title & Meta */}
      <h1 className="page-title" style={{ fontSize: '20px', marginBottom: '4px' }}>
        {currentMeetingData.title[currentLang] || currentMeetingData.title.en}
      </h1>
      <div className="page-sub" style={{ marginBottom: '16px' }}>
        {currentMeetingData.subtitle[currentLang] || currentMeetingData.subtitle.en}
      </div>

      {/* Synthesis Summary */}
      <div className="exec-card" style={{ background: '#F8FAFC', marginBottom: '16px' }}>
        <div style={{ fontSize: '13px', color: 'var(--ada-slate)', lineHeight: 1.6 }}>
          {currentMeetingData.summary[currentLang] || currentMeetingData.summary.en}
        </div>
      </div>

      {/* Segmented Control Switch */}
      <div className="seg-bar">
        <button
          className={`seg-btn ${seg === 'decisions' ? 'active' : ''}`}
          onClick={() => setSeg('decisions')}
          type="button"
        >
          {t('segDecisions')}
        </button>
        <button
          className={`seg-btn ${seg === 'transcript' ? 'active' : ''}`}
          id="btnSegTranscript"
          onClick={() => setSeg('transcript')}
          type="button"
        >
          {t('segTranscript')}
        </button>
      </div>

      {/* ─── TAB 1: DECISIONS & ACTIONS ─── */}
      {seg === 'decisions' && (
        <div>
          <div className="section-label" style={{ marginTop: '12px' }}>
            {t('agentDecisionsKicker')}
          </div>
          {currentMeetingData.decisions.map((dec, i) => (
            <div className="exec-card accent-teal" key={i}>
              <div className="exec-card-title" style={{ fontSize: '14.5px' }}>
                {dec.title[currentLang] || dec.title.en}
              </div>
              <div className="exec-card-body" style={{ margin: 0 }}>
                {dec.desc[currentLang] || dec.desc.en}
              </div>
            </div>
          ))}

          <div className="section-label" style={{ marginTop: '24px' }}>{t('pendingActionsKicker')}</div>
          {currentMeetingData.actions.map((act, i) => (
            <div
              className={`exec-card ${act.type === 'sign' ? 'accent-red' : act.type === 'ping' ? 'accent-amber' : ''}`}
              key={i}
              style={{ cursor: act.type === 'sign' ? 'pointer' : 'default' }}
              onClick={act.type === 'sign' ? () => setActiveSheet('approval') : undefined}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
                <div style={{ flex: 1 }}>
                  <div className="exec-card-title" style={{ fontSize: '14.5px', marginBottom: '3px' }}>
                    {act.title[currentLang] || act.title.en}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--ada-grey)' }}>
                    {act.meta[currentLang] || act.meta.en}
                  </div>
                </div>

                {act.type === 'sign' && (
                  <button className="btn-primary btn-sm" type="button" style={{ flexShrink: 0 }}>
                    {t('pend1Action')}
                  </button>
                )}
                {act.type === 'ping' && (
                  <button
                    className="btn-ghost btn-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      showToast(currentLang === 'ar' ? 'تم الإرسال للمسؤول' : 'Ping Dispatched to Operations');
                    }}
                    type="button"
                    style={{ flexShrink: 0 }}
                  >
                    {t('pend2Action')}
                  </button>
                )}
                {act.type === 'status' && (
                  <span className="pill ok" style={{ flexShrink: 0 }}>{t('pend3Status')}</span>
                )}
              </div>
            </div>
          ))}

          <div style={{ marginTop: '22px' }}>
            {!isApproved ? (
              <button className="btn-primary" style={{ width: '100%' }} onClick={approveCurrentMeeting} type="button">
                {t('approveRecordBtn')}
              </button>
            ) : (
              <div style={{ textAlign: 'center', fontSize: '13px', color: 'var(--ada-success)', fontWeight: 600, padding: '14px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <span>✓</span> {currentLang === 'ar' ? 'سجل رسمي مختوم في الذاكرة المؤسسية' : 'Sealed in Institutional Sovereign Memory'}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─── TAB 2: TRANSCRIPT ─── */}
      {seg === 'transcript' && (
        <div style={{ paddingBottom: '16px' }}>
          {currentMeetingData.transcripts.map((row, i) => (
            <div key={i} className="exec-card" style={{ marginBottom: '10px', background: row.isAi ? '#F0F7FC' : '#FFFFFF' }}>
              <div className="exec-card-header" style={{ marginBottom: '4px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ada-navy)' }}>{row.speaker}</span>
                <span className="exec-card-time">{row.time}</span>
              </div>
              <div style={{ fontSize: '12.5px', color: 'var(--ada-slate)', lineHeight: 1.55 }}>
                "{row.quote[currentLang] || row.quote.en}"
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
