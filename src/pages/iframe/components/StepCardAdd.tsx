import React from 'react';

import { useIframeContext } from '../contexts/iframeContext';

export const StepCardAdd = () => {
  const iframeContext = useIframeContext();

  const onClick = () => {
    iframeContext.dispatch({
      type: 'STEP_ADD',
    });
  };

  return (
    <div className="card step">
      <button className="btn btn-icon h-100 step-add" onClick={() => onClick()}>
        <svg className="icon-plus-circle" width="48" height="48" viewBox="0 0 20 20">
          <g fill="none" stroke="currentColor">
            <path d="M9 1h1v17H9z" />
            <path d="M1 9h17v1H1z" />
          </g>
        </svg>
      </button>
    </div>
  );
};
