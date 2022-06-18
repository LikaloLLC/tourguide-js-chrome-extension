import React from 'react';

import StepCard from './StepCard';
import StepCardAdd from './StepCardAdd';

interface BodyProps {
  recording: boolean;
  steps: Step[];
  select: number;
  setSelect: React.Dispatch<React.SetStateAction<number | null>>;
  stepAdd: any;
  stepUpdate: any;
  stepRemove: any;
}

function Body(props: BodyProps) {
  console.log('steps', props.steps);
  return !props.recording ? (
    <div
      className="step-container container-fluid border-bottom"
      style={{ height: 220 }}
    >
      <div className="alert alert-warning my-3" role="alert">
        Please navigate to the page where you wish to record your guided tour,
        and press <span className="badge badge-primary">Start recording</span>{' '}
        button to begin
      </div>
    </div>
  ) : (
    <div>
      <div className="step-container container-fluid border-bottom flex-row">
        <div className="card-deck">
          <>
            {props.steps.map((step, i) => (
              <StepCard
                key={i}
                index={i}
                select={props.select}
                step={step}
                setSelect={props.setSelect}
                stepUpdate={props.stepUpdate}
                stepRemove={props.stepRemove}
              />
            ))}
            <StepCardAdd stepAdd={props.stepAdd} />
          </>
        </div>
      </div>
    </div>
  );
}

export default Body;
