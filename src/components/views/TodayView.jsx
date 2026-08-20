import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const TodayView = () => {
  const { t, currentLang, switchTab, startRecording, setActiveSheet, openMeetingOutput } = useApp();
  const [activeCard, setActiveCard] = useState(0);

  const cards = [
    {
      type: 'meeting',
      time: t('card1Time'),
      title: t('card1Title'),
      meta: t('card1Meta'),
      snippet: t('card1Snippet'),
      cta: t('card1Action'),
      onClick: () => switchTab('premeeting'),
      accent: 'var(--accent-ok)',
      tag: 'Executive Meeting',
    },
    {
      type: 'mail',
      time: '08:45',
      title: t('card2Title'),
      meta: 'GCAA · Priority Sovereign Directive',
      snippet: t('card2Snippet'),
      cta: t('card2Action'),
      onClick: () => setActiveSheet('approval'),
      accent: 'var(--accent-err)',
      tag: 'Action Required',
    },
    {
      type: 'meeting',
      time: '02:00 PM',
      title: t('card3Title'),
      meta: t('card3Meta'),
      snippet: t('card3Snippet'),
      cta: t('card3Action'),
      onClick: () => openMeetingOutput('retail', 'draft'),
      accent: 'var(--accent-cyan)',
      tag: 'Executive Brief',
    },
    {
      type: 'mail',
      time: '09:12',
      title: t('card4Title'),
      meta: t('card4Sender'),
      snippet: t('card4Snippet'),
      cta: t('card4Action'),
      onClick: () => switchTab('answer'),
      accent: 'var(--ink-secondary)',
      tag: 'Operations Mail',
    },
  ];

  return (
    <section className="screen-view active" id="viewToday">

      {/* Greeting Header */}
      <div className="greeting">
        <div className="page-eyebrow">
          {currentLang === 'ar' ? 'الخميس، 20 أغسطس · مطار زايد الدولي' : 'Thursday, 20 August · Zayed International (AUH)'}
        </div>
        <h1 className="page-title" data-i18n="todayGreeting">
          {t('todayGreeting')}
        </h1>
      </div>

      {/* Spacious KPI Strip */}
      <div className="kpi-row">
        <div className="kpi-unit">
          <div className="kpi-val" style={{ color: 'var(--accent-ok)' }}>91.4%</div>
          <div className="kpi-lbl">{t('kpiOTD')}</div>
        </div>
        <div className="kpi-unit">
          <div className="kpi-val">99.1%</div>
          <div className="kpi-lbl">{t('kpiBaggage')}</div>
        </div>
        <div className="kpi-unit">
          <div className="kpi-val" style={{ fontSize: '15px', color: 'var(--accent-ok)', paddingTop: '4px' }}>
            {currentLang === 'ar' ? 'مستقر' : 'Stable'}
          </div>
          <div className="kpi-lbl">{t('kpiTerminal')}</div>
        </div>
      </div>

      {/* Swipeable Executive Deck Header */}
      <div style={{ margin: '24px 0 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div className="section-label" style={{ margin: 0 }}>{t('mailsAndMeetingsKicker')}</div>
        <span style={{ fontSize: '11.5px', color: 'var(--ink-muted)', fontWeight: 600 }}>{activeCard + 1} / {cards.length}</span>
      </div>

      {/* Swipeable Cards Deck with Elahi AI Glass Styling */}
      <div style={{ overflow: 'hidden', marginBottom: '16px' }}>
        <div
          style={{
            display: 'flex',
            gap: '14px',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none',
            paddingBottom: '4px',
          }}
          onScroll={(e) => {
            const w = e.target.scrollWidth / cards.length;
            setActiveCard(Math.round(e.target.scrollLeft / w));
          }}
        >
          {cards.map((card, i) => (
            <div
              key={i}
              onClick={card.onClick}
              style={{
                flex: '0 0 90%',
                scrollSnapAlign: 'start',
                background: 'var(--bg-card)',
                backdropFilter: 'var(--blur-card)',
                WebkitBackdropFilter: 'var(--blur-card)',
                border: '1px solid var(--border-glass)',
                borderLeft: currentLang === 'ar' ? '1px solid var(--border-glass)' : `4px solid ${card.accent}`,
                borderRight: currentLang === 'ar' ? `4px solid ${card.accent}` : '1px solid var(--border-glass)',
                borderRadius: 'var(--r-xl)',
                padding: '20px 22px',
                boxShadow: 'var(--shadow-card)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: card.accent, textTransform: 'uppercase', letterSpacing: '0.6px' }}>
                  {card.tag}
                </span>
                <span style={{ fontSize: '11.5px', color: 'var(--ink-muted)', fontWeight: 600 }}>{card.time}</span>
              </div>
              <div style={{ fontSize: '15.5px', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.35, marginBottom: '6px' }}>
                {card.title}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--ink-muted)', marginBottom: '12px' }}>{card.meta}</div>
              <div style={{ fontSize: '13px', color: 'var(--ink-secondary)', lineHeight: 1.55, marginBottom: '14px' }}>
                {card.snippet}
              </div>
              <div style={{ fontSize: '12.5px', fontWeight: 700, color: card.accent, display: 'flex', alignItems: 'center', gap: '6px' }}>
                {card.cta} <span>→</span>
              </div>
            </div>
          ))}
        </div>
        {/* Pagination indicator dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '10px' }}>
          {cards.map((_, i) => (
            <div
              key={i}
              style={{
                width: activeCard === i ? '20px' : '6px',
                height: '5px',
                borderRadius: 'var(--r-pill)',
                background: activeCard === i ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.12)',
                boxShadow: activeCard === i ? '0 0 8px var(--accent-cyan)' : 'none',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            />
          ))}
        </div>
      </div>

      {/* Hero Ambient Companion Recorder CTA */}
      <button className="btn-record" onClick={startRecording} type="button">
        <span className="rec-dot-live" />
        <div style={{ flex: 1, textAlign: currentLang === 'ar' ? 'right' : 'left' }}>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#FFFFFF' }}>{t('heroRecTitle')}</div>
          <div style={{ fontSize: '12px', color: 'var(--ink-secondary)', marginTop: '2px' }}>{t('heroRecSub')}</div>
        </div>
        <span className="pill blue" style={{ fontSize: '11px' }}>{t('heroRecBtn')}</span>
      </button>

      {/* Executive Priority Action Items */}
      <div className="section-label">{t('whatNeedsAttention')}</div>
      <div className="card" style={{ padding: '4px 0' }}>
        <div className="card-row" style={{ cursor: 'pointer' }} onClick={() => switchTab('answer')}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#FFFFFF' }}>{t('pri1Title')}</div>
            <div style={{ fontSize: '12px', color: 'var(--ink-secondary)', marginTop: '3px' }}>{t('pri1Desc')}</div>
          </div>
          <span className="pill warn" style={{ marginInlineStart: '12px', flexShrink: 0 }}>{t('badgeAttention')}</span>
        </div>

        <div className="card-row" style={{ cursor: 'pointer' }} onClick={() => setActiveSheet('approval')}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#FFFFFF' }}>{t('pri2Title')}</div>
            <div style={{ fontSize: '12px', color: 'var(--ink-secondary)', marginTop: '3px' }}>{t('pri2Desc')}</div>
          </div>
          <span className="pill err" style={{ marginInlineStart: '12px', flexShrink: 0 }}>{t('badgeActionRequired')}</span>
        </div>

        <div className="card-row" style={{ cursor: 'pointer' }} onClick={() => switchTab('premeeting')}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#FFFFFF' }}>{t('pri3Title')}</div>
            <div style={{ fontSize: '12px', color: 'var(--ink-secondary)', marginTop: '3px' }}>{t('pri3Desc')}</div>
          </div>
          <span className="pill ok" style={{ marginInlineStart: '12px', flexShrink: 0 }}>{t('badgeVerified')}</span>
        </div>
      </div>

      {/* Conversational Ask Trigger Capsule */}
      <div className="ask-capsule" style={{ marginTop: '18px' }} onClick={() => switchTab('ask')}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <span style={{ fontSize: '13.5px' }}>{t('askPlaceholder')}</span>
        </div>
        <span style={{ color: 'var(--accent-cyan)', fontWeight: 700, fontSize: '17px' }}>→</span>
      </div>

    </section>
  );
};
