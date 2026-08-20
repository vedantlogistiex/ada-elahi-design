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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0 14px' }}>
        <button className="btn-link" onClick={() => switchTab('meetings')} type="button">
          <span style={{ fontSize: '18px', fontWeight: 800 }}>‹</span>
          <span style={{ marginInlineStart: '4px' }}>{t('backToMeetings')}</span>
        </button>
        <span className={`pill ${isApproved ? 'ok' : 'err'}`}>
          {isApproved
            ? (currentLang === 'ar' ? 'سجل رسمي مختوم' : 'Sealed')
            : (currentLang === 'ar' ? 'مسودة ذكية' : 'AI Draft')}
        </span>
      </div>

      {/* Meeting Title & Meta */}
      <h1 className="page-title" style={{ fontSize: '22px', marginBottom: '6px' }}>
        {currentMeetingData.title[currentLang] || currentMeetingData.title.en}
      </h1>
      <div className="page-sub" style={{ marginBottom: '14px' }}>
        {currentMeetingData.subtitle[currentLang] || currentMeetingData.subtitle.en}
      </div>

      {/* Synthesis Summary */}
      <div style={{ fontSize: '13.5px', color: 'var(--ada-slate)', lineHeight: 1.6, marginBottom: '20px' }}>
        {currentMeetingData.summary[currentLang] || currentMeetingData.summary.en}
      </div>

      {/* Anees-Style Segmented Control Switch */}
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

      {/* ─── TAB 1: DECISIONS & ACTIONS (Spaced-out Cards) ─── */}
      {seg === 'decisions' && (
        <div>
          <div className="section-label" style={{ marginTop: '12px' }}>
            {t('agentDecisionsKicker')}
          </div>
          {currentMeetingData.decisions.map((dec, i) => (
            <div className="spaced-card" key={i} style={{ marginBottom: '12px' }}>
              <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--ada-navy)', marginBottom: '5px' }}>
                {dec.title[currentLang] || dec.title.en}
              </div>
              <div style={{ fontSize: '13px', color: 'var(--ada-slate)', lineHeight: 1.5 }}>
                {dec.desc[currentLang] || dec.desc.en}
              </div>
            </div>
          ))}

          <div className="section-label" style={{ marginTop: '24px' }}>{t('pendingActionsKicker')}</div>
          {currentMeetingData.actions.map((act, i) => (
            <div
              className="spaced-card"
              key={i}
              style={{ marginBottom: '12px', cursor: act.type === 'sign' ? 'pointer' : 'default' }}
              onClick={act.type === 'sign' ? () => setActiveSheet('approval') : undefined}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--ada-navy)' }}>
                    {act.title[currentLang] || act.title.en}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--ada-grey)', marginTop: '4px' }}>
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

          <div style={{ marginTop: '20px' }}>
            {!isApproved ? (
              <button className="btn-primary" style={{ width: '100%' }} onClick={approveCurrentMeeting} type="button">
                {t('approveRecordBtn')}
              </button>
            ) : (
              <div style={{ textAlign: 'center', fontSize: '13.5px', color: 'var(--ada-success)', fontWeight: 700, padding: '14px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
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
            <div key={i} className={`transcript-bubble ${row.isAi ? 'ai' : ''}`}>
              <div className="transcript-speaker">
                {row.speaker}
                <span style={{ fontWeight: 500, marginInlineStart: '8px', color: 'var(--ada-grey)', fontSize: '11.5px' }}>
                  {row.time}
                </span>
              </div>
              "{row.quote[currentLang] || row.quote.en}"
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
