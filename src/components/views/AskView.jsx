import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const AskView = () => {
  const { t, currentLang, executeAskQuery } = useApp();
  const [query, setQuery] = useState('');

  const prompts = [
    t('prompt1'),
    t('prompt2'),
    t('prompt3'),
    t('prompt4'),
    t('prompt5'),
  ];

  return (
    <section className="screen-view active" id="viewAsk">
      <div className="greeting">
        <div className="page-eyebrow">
          {currentLang === 'ar' ? 'تصريح أمني مستوى 1 · 14 مجموعة بيانات سيادية' : 'Level 1 Clearance · 14 Sovereign Datasets'}
        </div>
        <h1 className="page-title">{t('askHeader')}</h1>
      </div>

      {/* Spacious Conversational Input Box */}
      <div className="ask-input-wrap">
        <textarea
          className="ask-textarea"
          placeholder={t('inputAskPlaceholder')}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="ask-footer">
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--ada-teal)', display: 'inline-block' }} />
            <span style={{ fontSize: '11px', color: 'var(--ada-grey)', fontWeight: 500 }}>
              {currentLang === 'ar' ? 'سري · معالجة سيادية معزولة' : 'Confidential · Sovereign Air-Gapped AI'}
            </span>
          </div>
          <button
            className="btn-primary btn-sm"
            onClick={() => executeAskQuery(query || prompts[0])}
            type="button"
          >
            {t('askSubmit')} →
          </button>
        </div>
      </div>

      {/* Suggested Inquiries */}
      <div className="section-label">{t('suggestedPromptsKicker')}</div>

      {prompts.map((p, i) => (
        <div className="exec-card" key={i} style={{ padding: '13px 16px', marginBottom: '8px' }} onClick={() => executeAskQuery(p)}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ada-navy)', lineHeight: 1.4 }}>{p}</span>
            <span style={{ color: 'var(--ada-blue)', fontSize: '14px', fontWeight: 600, marginInlineStart: '10px' }}>→</span>
          </div>
        </div>
      ))}

      {/* Recent Intelligence Queries */}
      <div className="section-label" style={{ marginTop: '24px' }}>{t('recentQueriesKicker')}</div>
      <div
        className="exec-card"
        style={{ cursor: 'pointer' }}
        onClick={() => executeAskQuery('Compare Terminal A retail yield vs Q2 benchmark')}
      >
        <div className="exec-card-header">
          <span className="exec-chip active-blue">Executive Analytics</span>
          <span className="exec-card-time">Yesterday · 16:40</span>
        </div>
        <div className="exec-card-title" style={{ fontSize: '14px' }}>
          Compare Terminal A retail yield vs Q2 benchmark
        </div>
        <div className="exec-card-footer" style={{ borderTop: 'none', paddingTop: '4px' }}>
          <span style={{ fontSize: '11.5px', color: 'var(--ada-teal)', fontWeight: 600 }}>
            3 verified sovereign sources
          </span>
          <div className="exec-card-action-link">
            <span>{currentLang === 'ar' ? 'إعادة الفحص ←' : 'Re-run →'}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
