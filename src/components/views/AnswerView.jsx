import React from 'react';
import { useApp } from '../../context/AppContext';

export const AnswerView = () => {
  const { t, currentLang, switchTab, setActiveSheet } = useApp();

  return (
    <section className="screen-view active" id="viewAnswer">
      {/* Navigation & Timestamp */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0 16px' }}>
        <button className="btn-link" onClick={() => switchTab('ask')} type="button">
          <span>{currentLang === 'ar' ? '→ العودة إلى الاستفسار' : '← Back to Ask'}</span>
        </button>
        <span style={{ fontSize: '11.5px', color: 'var(--ada-grey)', fontWeight: 500 }}>{t('queryTimestamp')}</span>
      </div>

      {/* Human-crafted Executive Decision Brief Card */}
      <div className="exec-card" style={{ padding: '20px 22px', borderColor: '#CBD5E1', boxShadow: '0 4px 20px -2px rgba(15, 23, 42, 0.06)' }}>
        <div className="exec-card-header">
          <span className="exec-chip active-blue">
            {currentLang === 'ar' ? 'التحليل التنفيذي المعتمد' : 'Executive Decision Synthesis'}
          </span>
          <span className="exec-card-time">AUH Ops Data</span>
        </div>

        <div className="exec-card-title" style={{ fontSize: '17px', margin: '8px 0 14px' }}>
          {t('ansHeadlineText')}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
          <div style={{ background: '#F8FAFC', borderRadius: '8px', padding: '10px 12px', fontSize: '12.5px', lineHeight: 1.5, color: 'var(--ada-slate)', borderLeft: '3px solid var(--ada-attention)' }}>
            <strong style={{ color: 'var(--ada-navy)', display: 'block', marginBottom: '2px' }}>
              {currentLang === 'ar' ? 'الأثر التشغيلي' : 'Operational Implication'}
            </strong>
            {t('ansImplicationText')}
          </div>

          <div style={{ background: '#F8FAFC', borderRadius: '8px', padding: '10px 12px', fontSize: '12.5px', lineHeight: 1.5, color: 'var(--ada-slate)', borderLeft: '3px solid var(--ada-blue)' }}>
            <strong style={{ color: 'var(--ada-navy)', display: 'block', marginBottom: '2px' }}>
              {currentLang === 'ar' ? 'الإجراء الموصى به' : 'Recommended Leadership Action'}
            </strong>
            {t('ansActionText')}
          </div>
        </div>

        <div className="exec-card-footer" style={{ borderTop: '1px solid #F1F5F9', paddingTop: '12px' }}>
          <span style={{ fontSize: '11.5px', color: 'var(--ada-grey)', fontWeight: 500 }}>{t('ansSourcesSummary')}</span>
          <button className="btn-link" style={{ fontSize: '12px', fontWeight: 600 }} onClick={() => setActiveSheet('why')} type="button">
            {currentLang === 'ar' ? 'فحص مصادر البيانات ←' : 'Data Provenance →'}
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px' }}>
        <button
          className="btn-primary"
          style={{ width: '100%' }}
          onClick={() => setActiveSheet('approval')}
          type="button"
        >
          {t('actionAuthorize')}
        </button>
        <button
          className="btn-ghost"
          style={{ width: '100%' }}
          onClick={() => switchTab('premeeting')}
          type="button"
        >
          {t('actionAttachToBrief')}
        </button>
      </div>
    </section>
  );
};
