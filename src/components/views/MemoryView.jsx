import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const MemoryView = () => {
  const { t, setActiveSheet } = useApp();
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');

  const records = [
    { id: '1', cat: 'decision', tagKey: 'tagDecision', date: '12 Jun 2026', titleKey: 'mem1Title', descKey: 'mem1Desc' },
    { id: '2', cat: 'resolution', tagKey: 'tagResolution', date: '28 May 2026', titleKey: 'mem2Title', descKey: 'mem2Desc' },
    { id: '3', cat: 'commitment', tagKey: 'tagCommitment', date: '15 Apr 2026', titleKey: 'mem3Title', descKey: 'mem3Desc' },
  ];

  const visible = records.filter((r) => {
    const matchCat = filter === 'all' || r.cat === filter;
    const q = query.toLowerCase();
    return matchCat && (!q || t(r.titleKey).toLowerCase().includes(q));
  });

  return (
    <section className="screen-view active" id="viewMemory">
      <div className="greeting">
        <h1 className="page-title" data-i18n="memoryTitle">{t('memoryTitle')}</h1>
        <div className="page-sub">{t('memorySubtitle')}</div>
      </div>

      {/* Glass Search Input */}
      <div className="search-input-wrap">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--ink-muted)" strokeWidth="2">
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

      {/* Segmented Filter Pills */}
      <div className="seg-bar">
        <button className={`seg-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')} type="button">
          {t('filterAll')}
        </button>
        <button className={`seg-btn ${filter === 'decision' ? 'active' : ''}`} onClick={() => setFilter('decision')} type="button">
          {t('filterDecisions')}
        </button>
        <button className={`seg-btn ${filter === 'commitment' ? 'active' : ''}`} onClick={() => setFilter('commitment')} type="button">
          {t('filterCommitments')}
        </button>
      </div>

      {/* Memory Records Card */}
      <div className="card" style={{ padding: '6px 20px' }}>
        {visible.map((item, i) => (
          <div
            key={item.id}
            className="memory-record"
            onClick={() => setActiveSheet('why')}
            style={{ borderBottom: i < visible.length - 1 ? '1px solid var(--border-glass)' : 'none' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span className="pill ok" style={{ fontSize: '10.5px' }}>{t(item.tagKey)}</span>
              <span style={{ fontSize: '11.5px', color: 'var(--ink-muted)', fontWeight: 600 }}>{item.date}</span>
            </div>
            <div className="memory-title">{t(item.titleKey)}</div>
            <div className="memory-desc">{t(item.descKey)}</div>
          </div>
        ))}
      </div>
    </section>
  );
};
