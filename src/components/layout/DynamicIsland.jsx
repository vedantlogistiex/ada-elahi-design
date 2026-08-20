import React from 'react';
import { useApp } from '../../context/AppContext';

export const DynamicIsland = () => {
  const { isRecording, toggleRecording, recSeconds } = useApp();

  const formatTimer = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="ios-island" id="dynamicIsland" onClick={toggleRecording}>
      {!isRecording ? (
        <div className="island-idle-state" id="islandIdleState">
          <span style={{ color: '#CBD5E1' }}>ADA Intelligence</span>
          <span className="island-dot" />
        </div>
      ) : (
        <div className="island-recording-state" id="islandRecordingState" style={{ display: 'flex' }}>
          <div className="island-pulse-group">
            <span className="island-rec-dot" />
            <span style={{ color: '#FFFFFF', fontWeight: 700, letterSpacing: '-0.2px' }}>
              Elahi Active
            </span>
          </div>
          <div className="island-waveform">
            <span className="wave-bar" />
            <span className="wave-bar" />
            <span className="wave-bar" />
            <span className="wave-bar" />
          </div>
          <span className="island-timer" id="islandTimer">
            {formatTimer(recSeconds)}
          </span>
        </div>
      )}
    </div>
  );
};
