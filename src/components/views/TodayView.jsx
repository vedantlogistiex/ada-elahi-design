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
      eyebrow: currentLang === 'ar' ? 'اجتماع تنفيذي عاجل' : 'Executive Leadership Brief',
      onClick: () => switchTab('premeeting'),
    },
    {
      time: '08:45 AM',
      title: t('card2Title'),
      meta: 'GCAA · Priority Sovereign Directive',
      snippet: t('card2Snippet'),
      cta: t('card2Action'),
      eyebrow: currentLang === 'ar' ? 'توجيه سيادي' : 'Sovereign Directive',
      onClick: () => setActiveSheet('approval'),
    },
    {
      time: '02:00 PM',
      title: t('card3Title'),
      meta: t('card3Meta'),
      snippet: t('card3Snippet'),
      cta: t('card3Action'),
      eyebrow: currentLang === 'ar' ? 'مراجعة تجارية' : 'Commercial Review',
      onClick: () => openMeetingOutput('retail', 'draft'),
    },
    {
      time: '09:12 AM',
      title: t('card4Title'),
      meta: t('card4Sender'),
      snippet: t('card4Snippet'),
      cta: t('card4Action'),
      eyebrow: currentLang === 'ar' ? 'بريد العمليات' : 'Operations Intelligence',
      onClick: () => switchTab('answer'),
    },
  ];

  const feedItems = [
    {
      time: currentLang === 'ar' ? 'اليوم · 10:30 ص' : 'Today · 10:30 AM',
      eyebrow: currentLang === 'ar' ? 'إحاطة تنفيذية' : 'Executive Meeting',
      title: t('card1Title'),
      snippet: t('card1Snippet'),
      attendees: '6 ELT Members',
      duration: '45 mins',
      onClick: () => switchTab('premeeting'),
    },
    {
      time: currentLang === 'ar' ? 'اليوم · 08:45 ص' : 'Today · 8:45 AM',
      eyebrow: currentLang === 'ar' ? 'توجيه GCAA' : 'GCAA Regulatory',
      title: t('card2Title'),
      snippet: t('card2Snippet'),
      attendees: 'Airspace Authority',
      duration: 'Due 14:00',
      onClick: () => setActiveSheet('approval'),
    },
    {
      time: currentLang === 'ar' ? 'اليوم · 02:00 م' : 'Today · 2:00 PM',
      eyebrow: currentLang === 'ar' ? 'مراجعة تجارية' : 'Commercial Strategy',
      title: t('card3Title'),
      snippet: t('card3Snippet'),
      attendees: 'Retail Operations',
      duration: '30 mins',
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

      {/* Spacious Clean KPI Strip */}
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
          <div className="kpi-val" style={{ color: 'var(--ada-teal)', fontSize: '16px', paddingTop: '2px' }}>
            {currentLang === 'ar' ? 'مستقر' : 'Optimal'}
          </div>
          <div className="kpi-lbl">{t('kpiTerminal')}</div>
        </div>
      </div>

      {/* Bespoke Executive Spotlight Card */}
      <div
        className="exec-card is-spotlight"
        onClick={highlightCards[activeCard].onClick}
      >
        <div className="exec-card-header">
          <span className="exec-card-eyebrow">
            {highlightCards[activeCard].eyebrow}
          </span>
          <span className="exec-card-time">
            {highlightCards[activeCard].time}
          </span>
        </div>

        <div className="exec-card-title">
          {highlightCards[activeCard].title}
        </div>

        <div style={{ fontSize: '12px', color: 'var(--ada-grey)', marginBottom: '10px' }}>
          {highlightCards[activeCard].meta}
        </div>

        <div className="spotlight-focus-box">
          {highlightCards[activeCard].snippet}
        </div>

        <div className="exec-card-footer" style={{ borderTop: 'none', paddingTop: '4px' }}>
          <span className="exec-chip active-blue">
            {currentLang === 'ar' ? 'جاهز للعرض' : 'Brief Ready'}
          </span>
          <div className="exec-card-action-link">
            <span>{highlightCards[activeCard].cta}</span>
          </div>
        </div>
      </div>

      {/* Minimal Pagination Indicator */}
      <div className="pagination-dots">
        {highlightCards.map((_, i) => (
          <div
            key={i}
            className={`pagination-dot ${activeCard === i ? 'active' : ''}`}
            onClick={() => setActiveCard(i)}
            style={{ cursor: 'pointer' }}
          />
        ))}
      </div>

      {/* Section: Important Mails & Meetings */}
      <div className="section-label">
        <span>{t('mailsAndMeetingsKicker')}</span>
        <span className="view-all-link" onClick={() => switchTab('meetings')}>
          {currentLang === 'ar' ? 'عرض الكل' : 'View all'}
        </span>
      </div>

      {feedItems.map((item, idx) => (
        <div className="exec-card" key={idx} onClick={item.onClick}>
          <div className="exec-card-header">
            <span className="exec-card-eyebrow">
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
              <span className="exec-chip">{item.attendees}</span>
              <span className="exec-chip">{item.duration}</span>
            </div>
            <div className="exec-card-action-link">
              <span>{currentLang === 'ar' ? 'فتح التفاصيل ←' : 'View →'}</span>
            </div>
          </div>
        </div>
      ))}

      {/* Section: What Needs Attention */}
      <div className="section-label" style={{ marginTop: '26px' }}>
        {t('whatNeedsAttention')}
      </div>

      {/* Priority 1 */}
      <div className="exec-card accent-amber" onClick={() => switchTab('answer')}>
        <div className="exec-card-header">
          <span className="exec-card-eyebrow attention">
            {t('badgeAttention')}
          </span>
          <span className="exec-card-time">09:40 Refreshed</span>
        </div>
        <div className="exec-card-title">{t('pri1Title')}</div>
        <div className="exec-card-body">{t('pri1Desc')}</div>
        <div className="exec-card-footer">
          <span className="exec-chip active-blue">2 Routes Impacted</span>
          <div className="exec-card-action-link">
            <span>{currentLang === 'ar' ? 'فحص التحليل التنفيذي ←' : 'Inspect Analysis →'}</span>
          </div>
        </div>
      </div>

      {/* Priority 2 */}
      <div className="exec-card accent-red" onClick={() => setActiveSheet('approval')}>
        <div className="exec-card-header">
          <span className="exec-card-eyebrow urgent">
            {t('badgeActionRequired')}
          </span>
          <span className="exec-card-time">14:00 Deadline</span>
        </div>
        <div className="exec-card-title">{t('pri2Title')}</div>
        <div className="exec-card-body">{t('pri2Desc')}</div>
        <div className="exec-card-footer">
          <span className="exec-chip" style={{ color: 'var(--ada-critical)', borderColor: '#FECDD3', background: '#FFF1F2' }}>
            Sign-off Required
          </span>
          <div className="exec-card-action-link">
            <span>{currentLang === 'ar' ? 'مراجعة وتوقيع الاعتماد ←' : 'Review & Sign →'}</span>
          </div>
        </div>
      </div>

      {/* Priority 3 */}
      <div className="exec-card accent-teal" onClick={() => switchTab('premeeting')}>
        <div className="exec-card-header">
          <span className="exec-card-eyebrow" style={{ color: 'var(--ada-teal)' }}>
            {t('badgeVerified')}
          </span>
          <span className="exec-card-time">09:35 Refreshed</span>
        </div>
        <div className="exec-card-title">{t('pri3Title')}</div>
        <div className="exec-card-body">{t('pri3Desc')}</div>
        <div className="exec-card-footer">
          <span className="exec-chip">Boardroom A</span>
          <div className="exec-card-action-link">
            <span>{t('open60sBrief')}</span>
          </div>
        </div>
      </div>

      {/* Conversational Query Bar */}
      <div
        className="exec-card"
        style={{
          background: '#F8FAFC',
          borderColor: '#CBD5E1',
          padding: '14px 18px',
          marginTop: '14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        onClick={() => switchTab('ask')}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--ada-blue)" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <span style={{ fontSize: '13px', color: 'var(--ada-navy)', fontWeight: 600 }}>
            {t('askPlaceholder')}
          </span>
        </div>
        <span style={{ color: 'var(--ada-blue)', fontWeight: 700, fontSize: '16px' }}>→</span>
      </div>
    </section>
  );
};
