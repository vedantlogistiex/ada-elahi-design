import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const MeetingsView = () => {
  const { t, currentLang, switchTab, openMeetingOutput } = useApp();
  const [tab, setTab] = useState('schedule');

  const scheduleItems = [
    {
      time: currentLang === 'ar' ? 'اليوم · 10:30 ص' : 'Today · 10:30 AM',
      relative: currentLang === 'ar' ? 'خلال 48 د' : 'In 48 mins',
      eyebrow: currentLang === 'ar' ? 'إحاطة جاهزة' : 'Brief Ready',
      title: t('m1Title'),
      snippet: t('m1Desc'),
      location: 'Boardroom A / Secure Video',
      attendees: '6 ELT Members · 45 mins',
      onClick: () => switchTab('premeeting'),
    },
    {
      time: currentLang === 'ar' ? 'اليوم · 02:00 م' : 'Today · 02:00 PM',
      relative: currentLang === 'ar' ? 'خلال 3.5 س' : 'In 3h 30m',
      eyebrow: currentLang === 'ar' ? 'مسودة ذكية' : 'Draft Agenda',
      title: t('m2Title'),
      snippet: t('m2Desc'),
      location: 'Executive Suite',
      attendees: '4 Retail Leads · 30 mins',
      onClick: () => openMeetingOutput('retail', 'draft'),
    },
    {
      time: currentLang === 'ar' ? 'اليوم · 04:30 م' : 'Today · 04:30 PM',
      relative: currentLang === 'ar' ? 'مجدول' : 'Scheduled',
      eyebrow: currentLang === 'ar' ? 'تنسيق أمني' : 'Joint Security',
      title: t('m3Title'),
      snippet: t('m3Desc'),
      location: 'Customs & Border Control Command',
      attendees: '8 Agency Leads · 60 mins',
      onClick: () => {},
    },
  ];

  const historyItems = [
    {
      time: currentLang === 'ar' ? 'اليوم · 10:30 ص' : 'Today · 10:30 AM',
      eyebrow: currentLang === 'ar' ? 'بانتظار الاعتماد' : 'Needs Sign-off',
      title: t('rec1Title'),
      snippet: t('rec1Desc'),
      tag: 'ELT Operations',
      duration: '42s synthesized audio',
      onClick: () => openMeetingOutput('ops', 'draft'),
    },
    {
      time: currentLang === 'ar' ? '19 أغسطس · 14:00' : '19 Aug · 14:00',
      eyebrow: currentLang === 'ar' ? 'سجل مختوم' : 'Sealed Record',
      title: t('rec2Title'),
      snippet: t('rec2Desc'),
      tag: 'Retail Ops & Leasing',
      duration: '38s synthesized audio',
      onClick: () => openMeetingOutput('retail', 'approved'),
    },
    {
      time: currentLang === 'ar' ? '18 أغسطس · 09:00' : '18 Aug · 09:00',
      eyebrow: currentLang === 'ar' ? 'سجل مختوم' : 'Sealed Record',
      title: t('rec3Title'),
      snippet: t('rec3Desc'),
      tag: 'GCAA Directive',
      duration: '31s synthesized audio',
      onClick: () => openMeetingOutput('runway', 'approved'),
    },
    {
      time: currentLang === 'ar' ? '17 أغسطس · 11:30' : '17 Aug · 11:30',
      eyebrow: currentLang === 'ar' ? 'سجل مختوم' : 'Sealed Record',
      title: t('rec4Title'),
      snippet: t('rec4Desc'),
      tag: 'Etihad SLA Bilateral',
      duration: '40s synthesized audio',
      onClick: () => {},
    },
  ];

  return (
    <section className="screen-view active" id="viewMeetings">
      <div className="greeting">
        <h1 className="page-title">{t('meetingsTitle')}</h1>
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

      {/* UPCOMING SCHEDULE */}
      {tab === 'schedule' && (
        <div>
          {scheduleItems.map((item, idx) => (
            <div className="exec-card" key={idx} onClick={item.onClick}>
              <div className="exec-card-header">
                <span className="exec-card-eyebrow">
                  {item.eyebrow}
                </span>
                <span className="exec-card-time">{item.time} · {item.relative}</span>
              </div>

              <div className="exec-card-title">
                {item.title}
              </div>

              <div className="exec-card-body">
                {item.snippet}
              </div>

              <div className="exec-card-footer">
                <div className="exec-card-meta-tags">
                  <span className="exec-chip">{item.location}</span>
                  <span className="exec-chip">{item.attendees}</span>
                </div>
                <div className="exec-card-action-link">
                  <span>{currentLang === 'ar' ? 'عرض الإحاطة ←' : 'Open Brief →'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* RECORDED HISTORY */}
      {tab === 'history' && (
        <div>
          {historyItems.map((item, idx) => (
            <div className="exec-card" key={idx} onClick={item.onClick}>
              <div className="exec-card-header">
                <span className={`exec-chip ${idx === 0 ? 'active-blue' : ''}`}>
                  {item.eyebrow}
                </span>
                <span className="exec-card-time">{item.time}</span>
              </div>

              <div className="exec-card-title">
                {item.title}
              </div>

              <div className="exec-card-body">
                {item.snippet}
              </div>

              <div className="exec-card-footer">
                <div className="exec-card-meta-tags">
                  <span className="exec-chip">{item.tag}</span>
                  <span className="exec-chip">{item.duration}</span>
                </div>
                <div className="exec-card-action-link">
                  <span>{currentLang === 'ar' ? 'فتح المحضر ←' : 'Open Minutes →'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
