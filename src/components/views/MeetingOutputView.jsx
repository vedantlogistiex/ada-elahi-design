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
      {/* Navigation + Status Badge */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0 16px' }}>
        <button className="btn-link" onClick={() => switchTab('meetings')} type="button">
          ← {t('backToMeetings')}
        </button>
        <span className={`pill ${isApproved ? 'ok' : 'err'}`}>
          {isApproved
            ? (currentLang === 'ar' ? 'سجل مختوم' : 'Sealed')
            : (currentLang === 'ar' ? 'مسودة ذكية' : 'AI Draft')}
        </span>
      </div>

      <h1 className="page-title" style={{ fontSize: '22px', marginBottom: '4px' }}>
        {currentMeetingData.title[currentLang] || currentMeetingData.title.en}
      </h1>
      <div className="page-sub" style={{ marginBottom: '16px' }}>
        {currentMeetingData.subtitle[currentLang] || currentMeetingData.subtitle.en}
      </div>

      {/* Synthesis Summary */}
      <div style={{ fontSize: '13.5px', color: 'var(--ink-secondary)', lineHeight: 1.6, marginBottom: '18px' }}>
        {currentMeetingData.summary[currentLang] || currentMeetingData.summary.en}
      </div>

      {/* Segmented Switch */}
      <div className="seg-bar">
        <button className={`seg-btn ${seg === 'decisions' ? 'active' : ''}`} onClick={() => setSeg('decisions')} type="button">
          {t('segDecisions')}
        </button>
        <button className={`seg-btn ${seg === 'transcript' ? 'active' : ''}`} id="btnSegTranscript" onClick={() => setSeg('transcript')} type="button">
          {t('segTranscript')}
        </button>
      </div>

      {/* DECISIONS & ACTIONS */}
      {seg === 'decisions' && (
        <div>
          <div className="section-label">{t('agentDecisionsKicker')}</div>
          <div className="card" style={{ padding: '6px 20px', marginBottom: '18px' }}>
            {currentMeetingData.decisions.map((dec, i) => (
              <div key={i} style={{ padding: '14px 0', borderBottom: i < currentMeetingData.decisions.length - 1 ? '1px solid var(--border-glass)' : 'none' }}>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#FFFFFF', marginBottom: '4px' }}>
                  {dec.title[currentLang] || dec.title.en}
                </div>
                <div style={{ fontSize: '13px', color: 'var(--ink-secondary)', lineHeight: 1.5 }}>
                  {dec.desc[currentLang] || dec.desc.en}
                </div>
              </div>
            ))}
          </div>

          <div className="section-label">{t('pendingActionsKicker')}</div>
          <div className="card" style={{ padding: '6px 20px', marginBottom: '20px' }}>
            {currentMeetingData.actions.map((act, i) => (
              <div
                key={i}
                style={{
                  padding: '14px 0',
                  borderBottom: i < currentMeetingData.actions.length - 1 ? '1px solid var(--border-glass)' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  cursor: act.type === 'sign' ? 'pointer' : 'default'
                }}
                onClick={act.type === 'sign' ? () => setActiveSheet('approval') : undefined}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#FFFFFF' }}>
                    {act.title[currentLang] || act.title.en}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--ink-muted)', marginTop: '2px' }}>
                    {act.meta[currentLang] || act.meta.en}
                  </div>
                </div>

                {act.type === 'sign' && (
                  <button className="btn-primary btn-sm" type="button">{t('pend1Action')}</button>
                )}
                {act.type === 'ping' && (
                  <button
                    className="btn-ghost btn-sm"
                    onClick={(e) => { e.stopPropagation(); showToast(currentLang === 'ar' ? 'تم الإرسال للمسؤول' : 'Ping Dispatched to Operations'); }}
                    type="button"
                  >
                    {t('pend2Action')}
                  </button>
                )}
                {act.type === 'status' && (
                  <span className="pill ok">{t('pend3Status')}</span>
                )}
              </div>
            ))}
          </div>

          {!isApproved ? (
            <button className="btn-primary" style={{ width: '100%' }} onClick={approveCurrentMeeting} type="button">
              {t('approveRecordBtn')}
            </button>
          ) : (
            <div style={{ textAlign: 'center', fontSize: '13.5px', color: 'var(--accent-ok)', fontWeight: 700, padding: '12px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <span>✓</span> {currentLang === 'ar' ? 'سجل رسمي مختوم في الذاكرة المؤسسية' : 'Sealed in Institutional Sovereign Memory'}
            </div>
          )}
        </div>
      )}

      {/* TRANSCRIPT */}
      {seg === 'transcript' && (
        <div style={{ paddingBottom: '12px' }}>
          {currentMeetingData.transcripts.map((row, i) => (
            <div key={i} className={`transcript-bubble ${row.isAi ? 'ai' : ''}`}>
              <div className="transcript-speaker">
                {row.speaker}
                <span style={{ fontWeight: 500, marginInlineStart: '10px', opacity: 0.65, fontSize: '11px' }}>{row.time}</span>
              </div>
              "{row.quote[currentLang] || row.quote.en}"
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
