import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const TodayView = () => {
  const { t, currentLang, switchTab, startRecording, setActiveSheet, openMeetingOutput } = useApp();
  const [activeCard, setActiveCard] = useState(0);

  const highlightCards = [
    {
      time: t('card1Time'),
      title: t('card1Title'),
      meta: t('card1Meta'),
      snippet: t('card1Snippet'),
      cta: t('card1Action'),
      tag: currentLang === 'ar' ? 'اجتماع تنفيذي' : 'Executive Meeting',
      onClick: () => switchTab('premeeting'),
    },
    {
      time: '08:45 AM',
      title: t('card2Title'),
      meta: 'GCAA · Priority Sovereign Directive',
      snippet: t('card2Snippet'),
      cta: t('card2Action'),
      tag: currentLang === 'ar' ? 'توجيه سيادي' : 'Priority Directive',
      onClick: () => setActiveSheet('approval'),
    },
    {
      time: '02:00 PM',
      title: t('card3Title'),
      meta: t('card3Meta'),
      snippet: t('card3Snippet'),
      cta: t('card3Action'),
      tag: currentLang === 'ar' ? 'مراجعة تجارية' : 'Commercial Review',
      onClick: () => openMeetingOutput('retail', 'draft'),
    },
    {
      time: '09:12 AM',
      title: t('card4Title'),
      meta: t('card4Sender'),
      snippet: t('card4Snippet'),
      cta: t('card4Action'),
      tag: currentLang === 'ar' ? 'بريد العمليات' : 'Operations Mail',
      onClick: () => switchTab('answer'),
    },
  ];

  const feedItems = [
    {
      time: currentLang === 'ar' ? 'اليوم · 10:30 ص' : 'Today · 10:30 AM',
      title: t('card1Title'),
      snippet: t('card1Snippet'),
      tags: [currentLang === 'ar' ? 'اجتماع تنفيذي' : 'Executive Meeting', '+2'],
      stats: '👤 6 · ⏳ 45 mins',
      onClick: () => switchTab('premeeting'),
    },
    {
      time: currentLang === 'ar' ? 'اليوم · 08:45 ص' : 'Today · 8:45 AM',
      title: t('card2Title'),
      snippet: t('card2Snippet'),
      tags: [currentLang === 'ar' ? 'توجيه GCAA' : 'GCAA Directive', '+3'],
      stats: '👤 5 · ⏳ Due 14:00',
      onClick: () => setActiveSheet('approval'),
    },
    {
      time: currentLang === 'ar' ? 'اليوم · 02:00 م' : 'Today · 2:00 PM',
      title: t('card3Title'),
      snippet: t('card3Snippet'),
      tags: [currentLang === 'ar' ? 'مراجعة تجارية' : 'Commercial Review', '+2'],
      stats: '👤 4 · ⏳ 30 mins',
      onClick: () => openMeetingOutput('retail', 'draft'),
    },
  ];

  return (
    <section className="screen-view active" id="viewToday">
      {/* Date & Executive Greeting */}
      <div className="greeting">
        <div className="page-eyebrow">
          {currentLang === 'ar' ? 'الخميس، 20 أغسطس · مطار زايد الدولي (AUH)' : 'Thursday, 20 August · Zayed International (AUH)'}
        </div>
        <h1 className="page-title">
          {t('todayGreeting')}
        </h1>
      </div>

      {/* Spacious KPI Strip */}
      <div className="kpi-row">
        <div className="kpi-unit">
          <div className="kpi-val" style={{ color: 'var(--ada-success)' }}>91.4%</div>
          <div className="kpi-lbl">{t('kpiOTD')}</div>
        </div>
        <div className="kpi-unit">
          <div className="kpi-val">99.1%</div>
          <div className="kpi-lbl">{t('kpiBaggage')}</div>
        </div>
        <div className="kpi-unit">
          <div className="kpi-val" style={{ color: 'var(--ada-success)', fontSize: '16px', paddingTop: '3px' }}>
            {currentLang === 'ar' ? 'مستقر' : 'Stable'}
          </div>
          <div className="kpi-lbl">{t('kpiTerminal')}</div>
        </div>
      </div>

      {/* Highlight Carousel Card with Anees Outline */}
      <div
        className="anees-highlight-card"
        onClick={highlightCards[activeCard].onClick}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <div className="anees-highlight-tag">
            {highlightCards[activeCard].tag}
          </div>
          <span style={{ fontSize: '12px', color: 'var(--ada-grey)', fontWeight: 600 }}>
            {highlightCards[activeCard].time}
          </span>
        </div>

        <div className="anees-highlight-title">
          {highlightCards[activeCard].title}
        </div>

        <div className="anees-highlight-meta">
          {highlightCards[activeCard].meta}
        </div>

        <div className="anees-highlight-quote">
          “{highlightCards[activeCard].snippet}”
        </div>

        <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--ada-blue)', display: 'flex', alignItems: 'center', gap: '4px' }}>
          {highlightCards[activeCard].cta}
        </div>
      </div>

      {/* Anees Pagination Dots */}
      <div className="anees-pagination-dots">
        {highlightCards.map((_, i) => (
          <div
            key={i}
            className={`anees-dot ${activeCard === i ? 'active' : ''}`}
            onClick={() => setActiveCard(i)}
            style={{ cursor: 'pointer' }}
          />
        ))}
      </div>

      {/* Section: Important Mails & Meetings (Spaced-out Cards Matching Reference) */}
      <div className="section-label">
        <span>{t('mailsAndMeetingsKicker')}</span>
        <span className="view-all-link" onClick={() => switchTab('meetings')}>
          {currentLang === 'ar' ? 'عرض الكل' : 'View all'}
        </span>
      </div>

      {feedItems.map((item, idx) => (
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

      {/* Section: What Needs Attention (Spaced-out Individual Cards) */}
      <div className="section-label" style={{ marginTop: '26px' }}>{t('whatNeedsAttention')}</div>

      {/* Priority 1 */}
      <div className="spaced-card" onClick={() => switchTab('answer')}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
          <span className="pill warn">{t('badgeAttention')}</span>
          <span style={{ fontSize: '12px', color: 'var(--ada-grey)', fontWeight: 600 }}>09:40</span>
        </div>
        <div className="spaced-card-title" style={{ fontSize: '16px' }}>{t('pri1Title')}</div>
        <div className="spaced-card-snippet" style={{ marginBottom: '12px' }}>{t('pri1Desc')}</div>
        <div style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--ada-blue)', display: 'flex', alignItems: 'center', gap: '4px' }}>
          {currentLang === 'ar' ? 'فحص التحليل التنفيذي ←' : 'Inspect Executive Analysis →'}
        </div>
      </div>

      {/* Priority 2 */}
      <div className="spaced-card" onClick={() => setActiveSheet('approval')}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
          <span className="pill err">{t('badgeActionRequired')}</span>
          <span style={{ fontSize: '12px', color: 'var(--ada-grey)', fontWeight: 600 }}>14:00 Deadline</span>
        </div>
        <div className="spaced-card-title" style={{ fontSize: '16px' }}>{t('pri2Title')}</div>
        <div className="spaced-card-snippet" style={{ marginBottom: '12px' }}>{t('pri2Desc')}</div>
        <div style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--ada-blue)', display: 'flex', alignItems: 'center', gap: '4px' }}>
          {currentLang === 'ar' ? 'مراجعة وتوقيع الاعتماد ←' : 'Review & Sign-off →'}
        </div>
      </div>

      {/* Priority 3 */}
      <div className="spaced-card" onClick={() => switchTab('premeeting')}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
          <span className="pill ok">{t('badgeVerified')}</span>
          <span style={{ fontSize: '12px', color: 'var(--ada-grey)', fontWeight: 600 }}>09:35 Refreshed</span>
        </div>
        <div className="spaced-card-title" style={{ fontSize: '16px' }}>{t('pri3Title')}</div>
        <div className="spaced-card-snippet" style={{ marginBottom: '12px' }}>{t('pri3Desc')}</div>
        <div style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--ada-blue)', display: 'flex', alignItems: 'center', gap: '4px' }}>
          {t('open60sBrief')}
        </div>
      </div>

      {/* Conversational Ask Trigger Capsule */}
      <div
        className="spaced-card"
        style={{
          background: 'var(--ada-sky)',
          borderColor: 'rgba(23, 105, 170, 0.25)',
          padding: '16px 20px',
          marginTop: '10px'
        }}
        onClick={() => switchTab('ask')}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--ada-blue)" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span style={{ fontSize: '13.5px', color: 'var(--ada-navy)', fontWeight: 700 }}>
              {t('askPlaceholder')}
            </span>
          </div>
          <span style={{ color: 'var(--ada-blue)', fontWeight: 800, fontSize: '18px' }}>→</span>
        </div>
      </div>
    </section>
  );
};
