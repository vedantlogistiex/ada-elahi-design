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

      {/* Spacious Conversational Input Wrap */}
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
            <span style={{ fontSize: '11px', color: 'var(--ada-grey)', fontWeight: 600 }}>
              {currentLang === 'ar' ? 'سري · معالجة سيادية معزولة' : 'Confidential · Air-gapped Sovereign AI'}
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

      {/* Suggested Prompts with Anees Pill Styling */}
      <div className="section-label">{t('suggestedPromptsKicker')}</div>

      {prompts.map((p, i) => (
        <div className="prompt-item" key={i} onClick={() => executeAskQuery(p)}>
          <span style={{ lineHeight: 1.45 }}>{p}</span>
          <span style={{ color: 'var(--ada-blue)', fontSize: '15px', fontWeight: 700, marginInlineStart: '10px' }}>→</span>
        </div>
      ))}

      {/* Recent Intelligence Queries */}
      <div className="section-label">{t('recentQueriesKicker')}</div>
      <div
        className="card"
        style={{ padding: '14px 18px', cursor: 'pointer' }}
        onClick={() => executeAskQuery('Compare Terminal A retail yield vs Q2 benchmark')}
      >
        <div style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--ada-navy)' }}>
          Compare Terminal A retail yield vs Q2 benchmark
        </div>
        <div style={{ fontSize: '11.5px', color: 'var(--ada-grey)', marginTop: '3px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span>Yesterday</span>
          <span>·</span>
          <span style={{ color: 'var(--ada-teal)', fontWeight: 600 }}>3 verified sovereign sources</span>
        </div>
      </div>
    </section>
  );
};
