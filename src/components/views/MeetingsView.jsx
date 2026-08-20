import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const MeetingsView = () => {
  const { t, switchTab, openMeetingOutput } = useApp();
  const [tab, setTab] = useState('schedule');

  return (
    <section className="screen-view active" id="viewMeetings">
      <div className="greeting">
        <h1 className="page-title" data-i18n="meetingsTitle">{t('meetingsTitle')}</h1>
        <div className="page-sub">{t('meetingsSubtitle')}</div>
      </div>

      <div className="seg-bar">
        <button className={`seg-btn ${tab === 'schedule' ? 'active' : ''}`} id="btnMtgSchedule" onClick={() => setTab('schedule')} type="button">
          {t('tabMtgSchedule')}
        </button>
        <button className={`seg-btn ${tab === 'history' ? 'active' : ''}`} id="btnMtgHistory" onClick={() => setTab('history')} type="button">
          {t('tabMtgHistory')}
        </button>
      </div>

      {/* UPCOMING SCHEDULE */}
      {tab === 'schedule' && (
        <div className="card" style={{ padding: '4px 20px' }}>
          <div className="meeting-row" onClick={() => switchTab('premeeting')}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
              <div className="meeting-time">10:30 AM · In 48 min</div>
              <span className="pill ok">Brief Ready</span>
            </div>
            <div className="meeting-title">{t('m1Title')}</div>
            <div className="meeting-meta">{t('m1Desc')}</div>
            <div className="meeting-cta">{t('open60sBrief')}</div>
          </div>

          <div className="meeting-row" onClick={() => openMeetingOutput('retail', 'draft')}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
              <div className="meeting-time">02:00 PM · In 3h 30m</div>
              <span className="pill warn">AI Draft</span>
            </div>
            <div className="meeting-title">{t('m2Title')}</div>
            <div className="meeting-meta">{t('m2Desc')}</div>
            <div className="meeting-cta">{t('viewOutputBtn')}</div>
          </div>

          <div className="meeting-row" style={{ opacity: 0.7 }}>
            <div className="meeting-time">04:30 PM</div>
            <div className="meeting-title">{t('m3Title')}</div>
            <div className="meeting-meta">{t('m3Desc')}</div>
          </div>
        </div>
      )}

      {/* RECORDED HISTORY */}
      {tab === 'history' && (
        <div className="card" style={{ padding: '4px 20px' }}>
          <div className="meeting-row" onClick={() => openMeetingOutput('ops', 'draft')}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
              <div className="meeting-time">Today · 10:30 AM</div>
              <span className="pill err">Sign-off Pending</span>
            </div>
            <div className="meeting-title">{t('rec1Title')}</div>
            <div className="meeting-meta">{t('rec1Desc')}</div>
            <div className="meeting-cta">{t('viewTranscriptDecisions')}</div>
          </div>

          <div className="meeting-row" onClick={() => openMeetingOutput('retail', 'approved')}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
              <div className="meeting-time">19 Aug · 14:00</div>
              <span className="pill ok">Sealed</span>
            </div>
            <div className="meeting-title">{t('rec2Title')}</div>
            <div className="meeting-meta">{t('rec2Desc')}</div>
            <div className="meeting-cta">{t('viewTranscriptDecisions')}</div>
          </div>

          <div className="meeting-row" onClick={() => openMeetingOutput('runway', 'approved')}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
              <div className="meeting-time">18 Aug · 09:00</div>
              <span className="pill ok">Sealed</span>
            </div>
            <div className="meeting-title">{t('rec3Title')}</div>
            <div className="meeting-meta">{t('rec3Desc')}</div>
            <div className="meeting-cta">{t('viewTranscriptDecisions')}</div>
          </div>
        </div>
      )}
    </section>
  );
};
