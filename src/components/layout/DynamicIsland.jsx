import React from 'react';
import { useApp } from '../../context/AppContext';

export const DynamicIsland = () => {
  const { isRecording, toggleRecording, recSeconds, currentLang } = useApp();

  const pad = (n) => String(n).padStart(2, '0');
  const timer = `${pad(Math.floor(recSeconds / 60))}:${pad(recSeconds % 60)}`;

  return (
    <div
      className={`ios-island ${isRecording ? 'is-recording' : ''}`}
      id="dynamicIsland"
      onClick={toggleRecording}
      title={isRecording ? 'Tap to finish recording & synthesize' : 'Tap to start ambient companion listening'}
    >
      {!isRecording ? (
        /* ── IDLE Elahi AMBIENT STATE ── */
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '0 16px' }}>
          <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#E2E8F0', letterSpacing: '0.4px' }}>
            Elahi AI
          </span>
          <span className="island-pulse-orb" />
        </div>
      ) : (
        /* ── ACTIVE RECORDING / AMBIENT SYNTHESIS STATE ── */
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '0 14px', gap: '10px' }}>
          {/* Red pulse dot */}
          <span className="island-rec-dot" />

          {/* Label */}
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#FFFFFF', letterSpacing: '0.2px' }}>
            {currentLang === 'ar' ? 'إلهي يستمع...' : 'Elahi Ambient'}
          </span>

          {/* Soundwave Frequency Bars */}
          <div className="island-waveform">
            {[1, 2, 3, 2, 1].map((_, i) => (
              <span key={i} className="wave-bar" />
            ))}
          </div>

          {/* Live Timer */}
          <span style={{ fontSize: '11px', color: '#94A3B8', fontVariantNumeric: 'tabular-nums', letterSpacing: '0.5px', fontWeight: 600 }}>
            {timer}
          </span>
        </div>
      )}
    </div>
  );
};
