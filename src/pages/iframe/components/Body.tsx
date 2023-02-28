import React, { useEffect, useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import { useIframeContext } from '../contexts/iframeContext';

import { StepCard } from './StepCard';
import { StepCardAdd } from './StepCardAdd';

export const Body = () => {
  const iframeContext = useIframeContext();
  const [list, setList] = useState<StepWithId[]>([]);

  useEffect(() => {
    if (iframeContext.state?.doc) {
      const doc = iframeContext.state.doc.map((doc, index) => {
        return {
          ...doc,
          id: 'step' + index,
        };
      });
      setList(doc);

      chrome.runtime.sendMessage({
        type: 'SAVE_STATE',
        payload: { doc },
      });
    }
  }, [iframeContext.state?.doc]);

  const onDragDropEnds = (oldIndex: number, newIndex: number) => {
    const cloneList = [...iframeContext.state.doc];
    if (oldIndex !== newIndex) {
      const stepRemoved = cloneList.splice(oldIndex, 1).pop();
      cloneList.splice(newIndex, 0, stepRemoved);
      const reMapperDoc: Step[] = cloneList.map((step, index) => {
        return {
          ...step,
          step: index + 1,
        };
      });

      iframeContext.dispatch({
        type: 'DOC_SET',
        payload: reMapperDoc,
      });
    }
  };

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
            <ReactSortable
              animation={150}
              list={list}
              handle=".dragHandle"
              swapThreshold={0.65}
              setList={() => {}}
              style={{ display: 'flex' }}
              onEnd={({ oldIndex, newIndex }) => onDragDropEnds(oldIndex, newIndex)}
            >
              {list.map((step, i) => (
                <StepCard key={i} index={i} step={step} />
              ))}
            </ReactSortable>
            <StepCardAdd />
          </>
        </div>
      </div>
    </div>
  );
};
