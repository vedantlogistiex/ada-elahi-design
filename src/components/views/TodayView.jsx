import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const TodayView = () => {
  const { t, currentLang, switchTab, startRecording, openMeetingOutput, setActiveSheet } = useApp();
  const [activeDeckIndex, setActiveDeckIndex] = useState(0);

  const handleDeckScroll = (e) => {
    const scrollLeft = e.target.scrollLeft;
    const cardWidth = e.target.offsetWidth * 0.92;
    const index = Math.round(scrollLeft / cardWidth);
    setActiveDeckIndex(Math.min(Math.max(index, 0), 3));
  };

  const scrollToDeckCard = (index) => {
    const el = document.getElementById('todaySwipeDeck');
    if (el) {
      const cardWidth = el.offsetWidth * 0.92;
      el.scrollTo({ left: index * cardWidth, behavior: 'smooth' });
      setActiveDeckIndex(index);
    }
  };

  return (
    <section className="screen-view active" id="viewToday">
      <h1 className="screen-title" data-i18n="todayGreeting">
        {t('todayGreeting')}
      </h1>
      <div className="screen-subtitle" id="currentDateDisplay">
        {currentLang === 'ar'
          ? 'الخميس، 20 أغسطس · مطار زايد الدولي (AUH)'
          : 'Thursday, 20 August · Zayed International (AUH)'}
      </div>

      {/* Today's Important Mails & Meetings (Swipeable Deck - iOS Style) */}
      <div className="deck-header-row">
        <span className="section-kicker" style={{ marginBottom: 0 }} data-i18n="mailsAndMeetingsKicker">
          {t('mailsAndMeetingsKicker')}
        </span>
        <span className="deck-counter-badge" id="deckCounter">
          {activeDeckIndex + 1} of 4
        </span>
      </div>

      <div className="swipeable-deck-container">
        <div className="swipeable-deck" id="todaySwipeDeck" onScroll={handleDeckScroll}>
          {/* Card 1: Next Meeting */}
          <div className="deck-card meeting-theme" onClick={() => switchTab('premeeting')}>
            <div className="deck-card-badge-row">
              <div className="deck-badge meeting">
                <span className="live-pulse" style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ADE80' }} />
                <span data-i18n="card1Time">{t('card1Time')}</span>
              </div>
              <span style={{ fontSize: '11px', color: '#94A3B8' }}>45 min</span>
            </div>
            <div className="deck-card-title" data-i18n="card1Title">
              {t('card1Title')}
            </div>
            <div className="deck-card-sender" style={{ color: '#B5C4D3' }} data-i18n="card1Meta">
              {t('card1Meta')}
            </div>
            <div className="deck-card-snippet" data-i18n="card1Snippet">
              {t('card1Snippet')}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px', gap: '8px' }}>
              <button
                className="hero-record-cta-badge"
                style={{ border: 'none', cursor: 'pointer', padding: '6px 12px', fontSize: '11.5px' }}
                onClick={(e) => {
                  e.stopPropagation();
                  startRecording();
                }}
              >
                <span className="live-pulse" style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#FFFFFF' }} />
                <span data-i18n="recNowBtn">{t('recNowBtn')}</span>
              </button>
              <div className="deck-card-action">
                <span data-i18n="card1Action">{t('card1Action')}</span>
              </div>
            </div>
          </div>

          {/* Card 2: Priority Mail from GCAA */}
          <div className="deck-card mail-theme" onClick={() => setActiveSheet('approval')}>
            <div className="deck-card-badge-row">
              <div className="deck-badge mail-urgent">
                <span data-i18n="card2Badge">{t('card2Badge')}</span>
              </div>
              <span style={{ fontSize: '11px', color: 'var(--secondary-grey)' }}>08:45 AM</span>
            </div>
            <div className="deck-card-title" data-i18n="card2Title">
              {t('card2Title')}
            </div>
            <div className="deck-card-sender" data-i18n="card2Sender">
              {t('card2Sender')}
            </div>
            <div className="deck-card-snippet" data-i18n="card2Snippet">
              {t('card2Snippet')}
            </div>
            <div className="deck-card-action">
              <span data-i18n="card2Action">{t('card2Action')}</span>
            </div>
          </div>

          {/* Card 3: Afternoon Commercial Meeting */}
          <div className="deck-card meeting-theme" onClick={() => openMeetingOutput('retail', 'draft')}>
            <div className="deck-card-badge-row">
              <div className="deck-badge meeting-comm">
                <span data-i18n="card3Badge">{t('card3Badge')}</span>
              </div>
              <span style={{ fontSize: '11px', color: '#94A3B8' }}>30 min</span>
            </div>
            <div className="deck-card-title" data-i18n="card3Title">
              {t('card3Title')}
            </div>
            <div className="deck-card-sender" style={{ color: '#B5C4D3' }} data-i18n="card3Meta">
              {t('card3Meta')}
            </div>
            <div className="deck-card-snippet" data-i18n="card3Snippet">
              {t('card3Snippet')}
            </div>
            <div className="deck-card-action">
              <span data-i18n="card3Action">{t('card3Action')}</span>
            </div>
          </div>

          {/* Card 4: Operations Mail from Etihad */}
          <div className="deck-card mail-theme" onClick={() => switchTab('answer')}>
            <div className="deck-card-badge-row">
              <div className="deck-badge mail-ops">
                <span data-i18n="card4Badge">{t('card4Badge')}</span>
              </div>
              <span style={{ fontSize: '11px', color: 'var(--secondary-grey)' }}>09:12 AM</span>
            </div>
            <div className="deck-card-title" data-i18n="card4Title">
              {t('card4Title')}
            </div>
            <div className="deck-card-sender" data-i18n="card4Sender">
              {t('card4Sender')}
            </div>
            <div className="deck-card-snippet" data-i18n="card4Snippet">
              {t('card4Snippet')}
            </div>
            <div className="deck-card-action">
              <span data-i18n="card4Action">{t('card4Action')}</span>
            </div>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="deck-pagination" id="deckPagination">
          {[0, 1, 2, 3].map((idx) => (
            <div
              key={idx}
              className={`deck-dot ${activeDeckIndex === idx ? 'active' : ''}`}
              onClick={() => scrollToDeckCard(idx)}
            />
          ))}
        </div>
      </div>

      {/* Prominent Live Meeting Hero Record Launcher */}
      <button className="hero-record-btn" onClick={startRecording}>
        <div className="hero-record-left">
          <div className="hero-record-icon-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="22" />
            </svg>
            <span className="live-rec-dot-beacon" />
          </div>
          <div className="hero-record-text">
            <div className="hero-record-title">
              <span data-i18n="heroRecTitle">{t('heroRecTitle')}</span>
            </div>
            <div className="hero-record-sub" data-i18n="heroRecSub">
              {t('heroRecSub')}
            </div>
          </div>
        </div>
        <div className="hero-record-cta-badge">
          <span className="live-pulse" style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#FFFFFF' }} />
          <span data-i18n="heroRecBtn">{t('heroRecBtn')}</span>
        </div>
      </button>

      {/* What Needs Attention (Strictly Top 3 Items) */}
      <div className="section-kicker">
        <span data-i18n="whatNeedsAttention">{t('whatNeedsAttention')}</span>
        <span style={{ color: 'var(--secondary-grey)', fontSize: '10px' }} data-i18n="topPriorities">
          {t('topPriorities')}
        </span>
      </div>

      <div className="priority-list">
        {/* Item 1: Delay Risk */}
        <div className="priority-item" onClick={() => switchTab('answer')}>
          <div className="priority-indicator attention" />
          <div className="priority-content">
            <div className="priority-title" data-i18n="pri1Title">{t('pri1Title')}</div>
            <div className="priority-desc" data-i18n="pri1Desc">{t('pri1Desc')}</div>
          </div>
          <span className="priority-badge att" data-i18n="badgeAttention">{t('badgeAttention')}</span>
        </div>

        {/* Item 2: Approval Required */}
        <div className="priority-item" onClick={() => setActiveSheet('approval')}>
          <div className="priority-indicator action" />
          <div className="priority-content">
            <div className="priority-title" data-i18n="pri2Title">{t('pri2Title')}</div>
            <div className="priority-desc" data-i18n="pri2Desc">{t('pri2Desc')}</div>
          </div>
          <span className="priority-badge act" data-i18n="badgeActionRequired">{t('badgeActionRequired')}</span>
        </div>

        {/* Item 3: Meeting Brief Ready */}
        <div className="priority-item" onClick={() => switchTab('premeeting')}>
          <div className="priority-indicator verified" />
          <div className="priority-content">
            <div className="priority-title" data-i18n="pri3Title">{t('pri3Title')}</div>
            <div className="priority-desc" data-i18n="pri3Desc">{t('pri3Desc')}</div>
          </div>
          <span className="priority-badge ver" data-i18n="badgeVerified">{t('badgeVerified')}</span>
        </div>
      </div>

      {/* Executive Briefing */}
      <div className="section-kicker" data-i18n="execBriefingKicker">{t('execBriefingKicker')}</div>
      <div className="briefing-card">
        <h3 data-i18n="todayPositionTitle">{t('todayPositionTitle')}</h3>
        <p className="briefing-text" data-i18n="todayPositionSummary">
          {t('todayPositionSummary')}
        </p>

        <div className="kpi-row">
          <div className="kpi-unit">
            <div className="kpi-val" style={{ color: 'var(--success)' }}>91.4%</div>
            <div className="kpi-lbl" data-i18n="kpiOTD">{t('kpiOTD')}</div>
          </div>
          <div className="kpi-unit">
            <div className="kpi-val" style={{ color: 'var(--navy)' }}>99.1%</div>
            <div className="kpi-lbl" data-i18n="kpiBaggage">{t('kpiBaggage')}</div>
          </div>
          <div className="kpi-unit">
            <div className="kpi-val" style={{ color: 'var(--aviation-teal)' }}>Nominal</div>
            <div className="kpi-lbl" data-i18n="kpiTerminal">{t('kpiTerminal')}</div>
          </div>
        </div>

        <div className="trust-chip" onClick={() => setActiveSheet('why')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <span data-i18n="trustChipLabel">{t('trustChipLabel')}</span>
        </div>
      </div>

      {/* Restrained Entry Point into Ask */}
      <div className="ask-entry-card" onClick={() => switchTab('ask')}>
        <div className="ask-entry-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
        <div className="ask-entry-placeholder" data-i18n="askPlaceholder">
          {t('askPlaceholder')}
        </div>
        <div className="ask-entry-arrow">→</div>
      </div>
    </section>
  );
};
