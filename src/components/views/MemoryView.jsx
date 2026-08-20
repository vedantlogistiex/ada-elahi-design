import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const MemoryView = () => {
  const { t, currentLang, setActiveSheet } = useApp();
  const [filter, setFilter] = useState('all'); // 'all' | 'decision' | 'commitment' | 'resolution'
  const [search, setSearch] = useState('');

  const records = [
    {
      id: '1',
      cat: 'decision',
      tag: t('tagDecision'),
      title: t('mem1Title'),
      desc: t('mem1Desc'),
      meta: t('mem1Meta')
    },
    {
      id: '2',
      cat: 'resolution',
      tag: t('tagResolution'),
      title: t('mem2Title'),
      desc: t('mem2Desc'),
      meta: t('mem2Meta')
    },
    {
      id: '3',
      cat: 'commitment',
      tag: t('tagCommitment'),
      title: t('mem3Title'),
      desc: t('mem3Desc'),
      meta: t('mem3Meta')
    }
  ];

  const filteredRecords = records.filter((r) => {
    const matchCat = filter === 'all' || r.cat === filter;
    const matchSearch =
      !search.trim() ||
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.desc.toLowerCase().includes(search.toLowerCase()) ||
      r.meta.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <section className="screen-view" id="viewMemory">
      <div>
        <h2 className="screen-title">{t('memoryTitle')}</h2>
        <div className="screen-subtitle">{t('memorySubtitle')}</div>
      </div>

      {/* Search Field */}
      <div style={{ background: 'var(--white-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--secondary-grey)" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t('memorySearchPlaceholder')}
          style={{ border: 'none', outline: 'none', background: 'transparent', width: '100%', fontSize: '13.5px', fontFamily: 'inherit' }}
        />
      </div>

      {/* Filter Pills */}
      <div className="search-filter-pills">
        <button
          className={`filter-pill ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          {t('filterAll')}
        </button>
        <button
          className={`filter-pill ${filter === 'decision' ? 'active' : ''}`}
          onClick={() => setFilter('decision')}
        >
          {t('filterDecisions')}
        </button>
        <button
          className={`filter-pill ${filter === 'commitment' ? 'active' : ''}`}
          onClick={() => setFilter('commitment')}
        >
          {t('filterCommitments')}
        </button>
        <button
          className={`filter-pill ${filter === 'resolution' ? 'active' : ''}`}
          onClick={() => setFilter('resolution')}
        >
          {t('filterResolutions')}
        </button>
      </div>

      {/* Record Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filteredRecords.map((item) => (
          <div className="memory-item-card" key={item.id} onClick={() => setActiveSheet('why')}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span className="memory-tag">{item.tag}</span>
              <span style={{ fontSize: '11px', color: 'var(--secondary-grey)' }}>Verified Archive</span>
            </div>
            <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--navy)', marginBottom: '4px' }}>
              {item.title}
            </div>
            <div style={{ fontSize: '13px', color: 'var(--slate)', lineHeight: 1.4, marginBottom: '8px' }}>
              {item.desc}
            </div>
            <div style={{ fontSize: '11.5px', color: 'var(--secondary-grey)' }}>
              {item.meta}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
