import React from 'react';
import { useIframeContext } from '../contexts/iframeContext';

import { StepCard } from './StepCard';
import { StepCardAdd } from './StepCardAdd';

export const Body = () => {
  const iframeContext = useIframeContext();

  return !iframeContext.state.recording ? (
    <div className="step-container container-fluid border-bottom" style={{ height: 220 }}>
      <div className="alert alert-warning my-3" role="alert">
        Please navigate to the page where you wish to record your guided tour, and press{' '}
        <span className="badge badge-primary">Start recording</span> button to begin
      </div>
    </div>
  ) : (
    <div>
      <div className="step-container container-fluid border-bottom flex-row">
        <div className="card-deck">
          <>
            {iframeContext.state.doc.map((step, i) => (
              <StepCard key={i} index={i} step={step} />
            ))}
            <StepCardAdd />
          </>
        </div>
      </div>
    </div>
  );
};
