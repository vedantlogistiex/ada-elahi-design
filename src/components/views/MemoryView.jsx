import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const MemoryView = () => {
  const { t, currentLang, setActiveSheet } = useApp();
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');

  const records = [
    {
      id: '1',
      cat: 'decision',
      tagKey: 'tagDecision',
      date: currentLang === 'ar' ? '12 يونيو 2026' : '12 Jun 2026',
      titleKey: 'mem1Title',
      descKey: 'mem1Desc',
      stats: currentLang === 'ar' ? 'تصريح مستوى 1' : 'Level 1 Clearance',
    },
    {
      id: '2',
      cat: 'resolution',
      tagKey: 'tagResolution',
      date: currentLang === 'ar' ? '28 مايو 2026' : '28 May 2026',
      titleKey: 'mem2Title',
      descKey: 'mem2Desc',
      stats: currentLang === 'ar' ? 'قرار مجلس الإدارة' : 'Board Ratified',
    },
    {
      id: '3',
      cat: 'commitment',
      tagKey: 'tagCommitment',
      date: currentLang === 'ar' ? '15 أبريل 2026' : '15 Apr 2026',
      titleKey: 'mem3Title',
      descKey: 'mem3Desc',
      stats: currentLang === 'ar' ? 'اتفاقية الاتحاد للطيران' : 'Etihad Bilateral',
    },
  ];

  const visible = records.filter((r) => {
    const matchCat = filter === 'all' || r.cat === filter;
    const q = query.toLowerCase();
    return matchCat && (!q || t(r.titleKey).toLowerCase().includes(q) || t(r.descKey).toLowerCase().includes(q));
  });

  return (
    <section className="screen-view active" id="viewMemory">
      <div className="greeting">
        <h1 className="page-title">{t('memoryTitle')}</h1>
        <div className="page-sub">{t('memorySubtitle')}</div>
      </div>

      {/* Search Input */}
      <div className="search-input-wrap">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--ada-grey)" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          className="search-input"
          placeholder={t('memorySearchPlaceholder')}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Filter Bar */}
      <div className="seg-bar">
        <button
          className={`seg-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
          type="button"
        >
          {t('filterAll')}
        </button>
        <button
          className={`seg-btn ${filter === 'decision' ? 'active' : ''}`}
          onClick={() => setFilter('decision')}
          type="button"
        >
          {t('filterDecisions')}
        </button>
        <button
          className={`seg-btn ${filter === 'commitment' ? 'active' : ''}`}
          onClick={() => setFilter('commitment')}
          type="button"
        >
          {t('filterCommitments')}
        </button>
      </div>

      {/* Memory Records */}
      <div>
        {visible.length === 0 && (
          <div style={{ padding: '30px 0', fontSize: '13px', color: 'var(--ada-grey)', textAlign: 'center' }}>
            {currentLang === 'ar' ? 'لا توجد سجلات مطابقة' : 'No matching records found'}
          </div>
        )}
        {visible.map((item) => (
          <div
            className="exec-card accent-teal"
            key={item.id}
            onClick={() => setActiveSheet('why')}
          >
            <div className="exec-card-header">
              <span className="exec-chip active-blue">
                {t(item.tagKey)}
              </span>
              <span className="exec-card-time">{item.date}</span>
            </div>

            <div className="exec-card-title">
              {t(item.titleKey)}
            </div>

            <div className="exec-card-body">
              {t(item.descKey)}
            </div>

            <div className="exec-card-footer">
              <span style={{ fontSize: '11.5px', color: 'var(--ada-grey)', fontWeight: 500 }}>
                {item.stats}
              </span>
              <div className="exec-card-action-link">
                <span>{currentLang === 'ar' ? 'فحص السجل ←' : 'Audit Trail →'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
