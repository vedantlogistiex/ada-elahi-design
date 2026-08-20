import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const MeetingsView = () => {
  const { t, currentLang, switchTab, openMeetingOutput } = useApp();
  const [tab, setTab] = useState('schedule');

  const scheduleItems = [
    {
      time: currentLang === 'ar' ? 'اليوم · 10:30 ص · خلال 48 د' : 'Today · 10:30 AM · In 48 mins',
      title: t('m1Title'),
      snippet: t('m1Desc'),
      tags: [currentLang === 'ar' ? 'الموجز جاهز' : 'Brief Ready', 'Boardroom A'],
      stats: '👤 6 · ⏳ 45 mins',
      onClick: () => switchTab('premeeting'),
    },
    {
      time: currentLang === 'ar' ? 'اليوم · 02:00 م · خلال 3.5 س' : 'Today · 02:00 PM · In 3h 30m',
      title: t('m2Title'),
      snippet: t('m2Desc'),
      tags: [currentLang === 'ar' ? 'مسودة ذكية' : 'AI Draft', 'Commercial'],
      stats: '👤 4 · ⏳ 30 mins',
      onClick: () => openMeetingOutput('retail', 'draft'),
    },
    {
      time: currentLang === 'ar' ? 'اليوم · 04:30 م' : 'Today · 04:30 PM',
      title: t('m3Title'),
      snippet: t('m3Desc'),
      tags: [currentLang === 'ar' ? 'مجدول' : 'Scheduled', 'Customs/Police'],
      stats: '👤 8 · ⏳ 60 mins',
      onClick: () => {},
    },
  ];

  const historyItems = [
    {
      time: currentLang === 'ar' ? 'اليوم · 10:30 ص' : 'Today · 10:30 AM',
      title: t('rec1Title'),
      snippet: t('rec1Desc'),
      tags: [currentLang === 'ar' ? 'بانتظار الاعتماد' : 'Needs Sign-off', 'ELT Review'],
      stats: '👤 6 · ⏳ 42s',
      onClick: () => openMeetingOutput('ops', 'draft'),
    },
    {
      time: currentLang === 'ar' ? '19 أغسطس · 14:00' : '19 Aug · 14:00',
      title: t('rec2Title'),
      snippet: t('rec2Desc'),
      tags: [currentLang === 'ar' ? 'مختوم' : 'Sealed', 'Retail Ops'],
      stats: '👤 5 · ⏳ 38s',
      onClick: () => openMeetingOutput('retail', 'approved'),
    },
    {
      time: currentLang === 'ar' ? '18 أغسطس · 09:00' : '18 Aug · 09:00',
      title: t('rec3Title'),
      snippet: t('rec3Desc'),
      tags: [currentLang === 'ar' ? 'مختوم' : 'Sealed', 'GCAA Directive'],
      stats: '👤 5 · ⏳ 31s',
      onClick: () => openMeetingOutput('runway', 'approved'),
    },
    {
      time: currentLang === 'ar' ? '17 أغسطس · 11:30' : '17 Aug · 11:30',
      title: t('rec4Title'),
      snippet: t('rec4Desc'),
      tags: [currentLang === 'ar' ? 'مختوم' : 'Sealed', 'Etihad SLA'],
      stats: '👤 4 · ⏳ 40s',
      onClick: () => {},
    },
  ];

  return (
    <section className="screen-view active" id="viewMeetings">
      <div className="greeting">
        <h1 className="page-title" data-i18n="meetingsTitle">{t('meetingsTitle')}</h1>
        <div className="page-sub">{t('meetingsSubtitle')}</div>
      </div>

      {/* Segmented Control Bar */}
      <div className="seg-bar">
        <button
          className={`seg-btn ${tab === 'schedule' ? 'active' : ''}`}
          id="btnMtgSchedule"
          onClick={() => setTab('schedule')}
          type="button"
        >
          {t('tabMtgSchedule')}
        </button>
        <button
          className={`seg-btn ${tab === 'history' ? 'active' : ''}`}
          id="btnMtgHistory"
          onClick={() => setTab('history')}
          type="button"
        >
          {t('tabMtgHistory')}
        </button>
      </div>

      {/* UPCOMING SCHEDULE (Spaced-out Cards) */}
      {tab === 'schedule' && (
        <div>
          {scheduleItems.map((item, idx) => (
            <div className="spaced-card" key={idx} onClick={item.onClick}>
              <div className="spaced-card-time">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>{item.time}</span>
              </div>

              <div className="spaced-card-title">
                {item.title}
              </div>

              <div className="spaced-card-snippet">
                {item.snippet}
              </div>

              <div className="spaced-card-footer">
                <div className="spaced-card-tags">
                  <span className="spaced-tag">{item.tags[0]}</span>
                  {item.tags[1] && <span className="spaced-tag count">{item.tags[1]}</span>}
                </div>
                <div className="spaced-card-meta-stats">
                  {item.stats}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* RECORDED HISTORY (Spaced-out Cards) */}
      {tab === 'history' && (
        <div>
          {historyItems.map((item, idx) => (
            <div className="spaced-card" key={idx} onClick={item.onClick}>
              <div className="spaced-card-time">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>{item.time}</span>
              </div>

              <div className="spaced-card-title">
                {item.title}
              </div>

              <div className="spaced-card-snippet">
                {item.snippet}
              </div>

              <div className="spaced-card-footer">
                <div className="spaced-card-tags">
                  <span className="spaced-tag">{item.tags[0]}</span>
                  {item.tags[1] && <span className="spaced-tag count">{item.tags[1]}</span>}
                </div>
                <div className="spaced-card-meta-stats">
                  {item.stats}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
