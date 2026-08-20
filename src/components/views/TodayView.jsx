import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const TodayView = () => {
  const { t, switchTab, startRecording, openMeetingOutput, setActiveSheet } = useApp();
  const [activeDeckIndex, setActiveDeckIndex] = useState(0);

  const handleDeckScroll = (e) => {
    const scrollLeft = e.target.scrollLeft;
    const cardWidth = e.target.offsetWidth * 0.92;
    const index = Math.round(scrollLeft / cardWidth);
    setActiveDeckIndex(Math.min(Math.max(index, 0), 3));
  };

  return (
    <section className="screen-view" id="viewToday">
      <div>
        <h2 className="screen-title" id="todayGreeting">{t('todayGreeting')}</h2>
      </div>

      {/* Swipeable Mails & Meetings Carousel */}
      <div className="swipeable-deck-container">
        <div className="deck-header-row">
          <div className="section-kicker" style={{ margin: 0 }}>
            <span>{t('mailsAndMeetingsKicker')}</span>
          </div>
          <span className="deck-counter-badge">
            <span id="deckCounterText">{activeDeckIndex + 1} of 4</span>
          </span>
        </div>

        <div className="swipeable-deck" id="swipeableDeck" onScroll={handleDeckScroll}>
          {/* Card 1: ELT Review Meeting */}
          <div className="deck-card meeting-theme" onClick={() => switchTab('premeeting')}>
            <div className="deck-card-badge-row">
              <span className="deck-badge meeting">
                <span className="island-rec-dot" style={{ width: '6px', height: '6px' }} />
                <span>{t('card1Time')}</span>
              </span>
              <span style={{ fontSize: '11px', color: '#93C5FD' }}>Boardroom A</span>
            </div>
            <div className="deck-card-title">{t('card1Title')}</div>
            <div className="deck-card-sender">{t('card1Meta')}</div>
            <div className="deck-card-snippet">{t('card1Snippet')}</div>
            <div className="deck-card-action">
              <span>{t('card1Action')}</span>
            </div>
          </div>

          {/* Card 2: Priority Mail from GCAA */}
          <div className="deck-card mail-theme" onClick={() => setActiveSheet('approval')}>
            <div className="deck-card-badge-row">
              <span className="deck-badge mail-urgent">
                <span>⚠️</span>
                <span>{t('card2Badge')}</span>
              </span>
              <span style={{ fontSize: '11px', color: 'var(--critical)', fontWeight: 700 }}>Due 14:00</span>
            </div>
            <div className="deck-card-title">{t('card2Title')}</div>
            <div className="deck-card-sender">{t('card2Sender')}</div>
            <div className="deck-card-snippet">{t('card2Snippet')}</div>
            <div className="deck-card-action">
              <span>{t('card2Action')}</span>
            </div>
          </div>

          {/* Card 3: Terminal A Concessionaire & Retail */}
          <div className="deck-card mail-theme" onClick={() => openMeetingOutput('retail', 'approved')}>
            <div className="deck-card-badge-row">
              <span className="deck-badge mail-ops">
                <span>📊</span>
                <span>{t('card3Badge')}</span>
              </span>
              <span style={{ fontSize: '11px', color: 'var(--secondary-grey)' }}>Commercial</span>
            </div>
            <div className="deck-card-title">{t('card3Title')}</div>
            <div className="deck-card-sender">{t('card3Sender')}</div>
            <div className="deck-card-snippet">{t('card3Snippet')}</div>
            <div className="deck-card-action">
              <span>{t('card3Action')}</span>
            </div>
          </div>

          {/* Card 4: Etihad Joint Operations SLA */}
          <div className="deck-card meeting-theme" onClick={() => openMeetingOutput('etihad', 'approved')}>
            <div className="deck-card-badge-row">
              <span className="deck-badge meeting-comm">
                <span>✈️</span>
                <span>{t('card4Badge')}</span>
              </span>
              <span style={{ fontSize: '11px', color: '#CBD5E1' }}>Terminal A Command</span>
            </div>
            <div className="deck-card-title">{t('card4Title')}</div>
            <div className="deck-card-sender">{t('card4Sender')}</div>
            <div className="deck-card-snippet">{t('card4Snippet')}</div>
            <div className="deck-card-action">
              <span>{t('card4Action')}</span>
            </div>
          </div>
        </div>

        {/* Carousel Dot Indicators */}
        <div className="deck-pagination" id="deckDots">
          {[0, 1, 2, 3].map((idx) => (
            <span
              key={idx}
              className={`deck-dot ${activeDeckIndex === idx ? 'active' : ''}`}
              onClick={() => {
                const el = document.getElementById('swipeableDeck');
                if (el) {
                  const cardWidth = el.offsetWidth * 0.92;
                  el.scrollTo({ left: idx * cardWidth, behavior: 'smooth' });
                  setActiveDeckIndex(idx);
                }
              }}
            />
          ))}
        </div>
      </div>

      {/* Prominent Hero Record Meeting Button */}
      <button className="hero-record-btn" onClick={startRecording} id="btnStartRecToday">
        <div className="hero-record-left">
          <div className="hero-record-icon-wrap">
            <span className="live-rec-dot-beacon" />
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="23" />
              <line x1="8" y1="23" x2="16" y2="23" />
            </svg>
          </div>
          <div className="hero-record-text">
            <span className="hero-record-title">
              <span>{t('heroRecTitle')}</span>
            </span>
            <span className="hero-record-sub">{t('heroRecSub')}</span>
          </div>
        </div>
        <span className="hero-record-cta-badge">
          <span>{t('recNowBtn')}</span>
        </span>
      </button>

      {/* Top Priorities & Directives */}
      <div className="section-kicker">
        <span>{t('prioritiesKicker')}</span>
      </div>

      <div className="priority-list">
        <div className="priority-item" onClick={() => switchTab('answer')}>
          <div className="priority-indicator action" />
          <div className="priority-content">
            <div className="priority-title">{t('p1Title')}</div>
            <div className="priority-desc">{t('p1Desc')}</div>
          </div>
          <span className="priority-badge act">{t('p1Badge')}</span>
        </div>

        <div className="priority-item" onClick={() => setActiveSheet('approval')}>
          <div className="priority-indicator attention" />
          <div className="priority-content">
            <div className="priority-title">{t('p2Title')}</div>
            <div className="priority-desc">{t('p2Desc')}</div>
          </div>
          <span className="priority-badge att">{t('p2Badge')}</span>
        </div>

        <div className="priority-item" onClick={() => switchTab('answer')}>
          <div className="priority-indicator verified" />
          <div className="priority-content">
            <div className="priority-title">{t('p3Title')}</div>
            <div className="priority-desc">{t('p3Desc')}</div>
          </div>
          <span className="priority-badge ver">{t('p3Badge')}</span>
        </div>
      </div>

      {/* 30-Second Morning Operational Briefing */}
      <div className="section-kicker">
        <span>{t('morningBriefKicker')}</span>
      </div>

      <div className="exec-card">
        <div className="exec-card-title">{t('morningBriefTitle')}</div>
        <div className="exec-summary-text">{t('morningBriefText')}</div>

        <div className="kpi-row">
          <div className="kpi-stat">
            <span className="kpi-val good">{t('kpiOtp')}</span>
            <span className="kpi-lbl">{t('kpiOtpLabel')}</span>
          </div>
          <div className="kpi-stat">
            <span className="kpi-val good">{t('kpiBaggage')}</span>
            <span className="kpi-lbl">{t('kpiBaggageLabel')}</span>
          </div>
          <div className="kpi-stat">
            <span className="kpi-val warn">{t('kpiT1')}</span>
            <span className="kpi-lbl">{t('kpiT1Label')}</span>
          </div>
        </div>

        <div className="trust-chip" onClick={() => setActiveSheet('why')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <span>{t('trustBadge')}</span>
        </div>
      </div>

      {/* Quick Entry to Ask View */}
      <div className="ask-entry-card" onClick={() => switchTab('ask')}>
        <div className="ask-entry-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
        </div>
        <span className="ask-entry-text">{t('askEntryText')}</span>
      </div>
    </section>
  );
};
