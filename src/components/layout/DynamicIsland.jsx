import React from 'react';
import { useApp } from '../../context/AppContext';

export const DynamicIsland = () => {
  const { isRecording, recSeconds, toggleRecording } = useApp();

  const formatTimer = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins < 10 ? '0' + mins : mins}:${secs < 10 ? '0' + secs : secs}`;
  };

  return (
    <div
      className={`ios-island ${isRecording ? 'is-recording' : ''}`}
      id="dynamicIsland"
      onClick={toggleRecording}
      title={isRecording ? 'Click to stop recording' : 'Click to start Elahi recording'}
    >
      {!isRecording ? (
        <div className="island-idle-state" id="islandIdleState">
          <span style={{ color: '#CBD5E1' }}>ADA Intelligence</span>
          <span className="island-dot" />
        </div>
      ) : (
        <div className="island-recording-state" id="islandRecordingState">
          <div className="island-pulse-group">
            <span className="island-rec-dot" />
            <span style={{ color: '#FFFFFF', fontWeight: 700, letterSpacing: '-0.2px' }}>Elahi Active</span>
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
