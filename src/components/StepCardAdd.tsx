import React from 'react';

interface StepCardAddProps {
  stepAdd: any;
}

function StepCardAdd(props: StepCardAddProps) {
  return (
    <div className="card step">
      <button className="btn btn-icon h-100" onClick={() => props.stepAdd()}>
        <svg
          className="icon-plus-circle"
          width="48"
          height="48"
          viewBox="0 0 20 20"
        >
          <g fill="none" stroke="currentColor">
            <path d="M9 1h1v17H9z" />
            <path d="M1 9h17v1H1z" />
          </g>
        </svg>
      </button>
    </div>
  );
}

export default StepCardAdd;
