import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const MemoryView = () => {
  const { t, setActiveSheet } = useApp();
  const [filter, setFilter] = useState('all'); // 'all' | 'decision' | 'commitment' | 'resolution'
  const [query, setQuery] = useState('');

  const records = [
    {
      id: '1',
      cat: 'decision',
      tagKey: 'tagDecision',
      date: '12 Jun 2026',
      titleKey: 'mem1Title',
      descKey: 'mem1Desc',
      metaKey: 'mem1Meta'
    },
    {
      id: '2',
      cat: 'resolution',
      tagKey: 'tagResolution',
      date: '28 May 2026',
      titleKey: 'mem2Title',
      descKey: 'mem2Desc',
      metaKey: 'mem2Meta'
    },
    {
      id: '3',
      cat: 'commitment',
      tagKey: 'tagCommitment',
      date: '15 Apr 2026',
      titleKey: 'mem3Title',
      descKey: 'mem3Desc',
      metaKey: 'mem3Meta'
    }
  ];

  const filtered = records.filter((r) => {
    const matchCat = filter === 'all' || r.cat === filter;
    const title = t(r.titleKey).toLowerCase();
    const desc = t(r.descKey).toLowerCase();
    const meta = t(r.metaKey).toLowerCase();
    const q = query.toLowerCase();
    const matchQuery = !q || title.includes(q) || desc.includes(q) || meta.includes(q);
    return matchCat && matchQuery;
  });

  return (
    <section className="screen-view active" id="viewMemory">
      <h1 className="screen-title" data-i18n="memoryTitle">
        {t('memoryTitle')}
      </h1>
      <div className="screen-subtitle" data-i18n="memorySubtitle">
        {t('memorySubtitle')}
      </div>

      {/* Restrained Corporate Search */}
      <div style={{ background: 'var(--white-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', boxShadow: 'var(--shadow-sm)' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          id="memorySearchInput"
          placeholder={t('memorySearchPlaceholder')}
          data-i18n-placeholder="memorySearchPlaceholder"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ border: 'none', outline: 'none', fontFamily: 'inherit', fontSize: '14px', color: 'var(--navy)', width: '100%', background: 'transparent' }}
        />
      </div>

      {/* Category Filters */}
      <div className="search-filter-pills">
        <button
          className={`filter-pill ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
          data-i18n="filterAll"
        >
          {t('filterAll')}
        </button>
        <button
          className={`filter-pill ${filter === 'decision' ? 'active' : ''}`}
          onClick={() => setFilter('decision')}
          data-i18n="filterDecisions"
        >
          {t('filterDecisions')}
        </button>
        <button
          className={`filter-pill ${filter === 'commitment' ? 'active' : ''}`}
          onClick={() => setFilter('commitment')}
          data-i18n="filterCommitments"
        >
          {t('filterCommitments')}
        </button>
        <button
          className={`filter-pill ${filter === 'resolution' ? 'active' : ''}`}
          onClick={() => setFilter('resolution')}
          data-i18n="filterResolutions"
        >
          {t('filterResolutions')}
        </button>
      </div>

      {/* Memory Records List */}
      <div id="memoryRecordList">
        {filtered.map((item) => (
          <div
            className="memory-item-card"
            key={item.id}
            data-cat={item.cat}
            onClick={() => setActiveSheet('why')}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="memory-tag" data-i18n={item.tagKey}>
                {t(item.tagKey)}
              </span>
              <span style={{ fontSize: '11.5px', color: 'var(--secondary-grey)' }}>
                {item.date}
              </span>
            </div>
            <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--navy)', margin: '4px 0 2px' }} data-i18n={item.titleKey}>
              {t(item.titleKey)}
            </div>
            <div style={{ fontSize: '12.5px', color: 'var(--slate)', lineHeight: 1.35 }} data-i18n={item.descKey}>
              {t(item.descKey)}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--secondary-grey)', marginTop: '6px' }} data-i18n={item.metaKey}>
              {t(item.metaKey)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
