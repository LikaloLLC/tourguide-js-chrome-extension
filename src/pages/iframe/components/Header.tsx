import React from 'react';
import { getCurrentUrl } from '../../../utils/getCurrentUrl';

import { useIframeContext } from '../contexts/iframeContext';

export const Header = () => {
  const iframeContext = useIframeContext();

  const recordingStart = () => {
    iframeContext.dispatch({
      type: 'RECORDING_UPDATE',
      payload: true,
    });
  };

  const recordingCancel = () => {
    chrome.runtime.sendMessage({
      type: 'RECORDING_CANCEL',
    });
  };

  function showingPreview() {
    chrome.runtime.sendMessage({
      type: 'SHOWING_PREVIEW',
      payload: {
        doc: iframeContext.state.doc,
      },
    });
  }

  async function recordingFinish() {
    chrome.runtime.sendMessage({
      type: 'RECORDING_FINISH',
      payload: {
        description: await getCurrentUrl(),
        doc: {
          steps: iframeContext.state.doc,
        },
        name: iframeContext.state.name,
      },
    });
  }

  const iframeMaximize = () => {
    chrome.runtime.sendMessage({
      type: 'IFRAME_MAXIMIZE',
    });

    iframeContext.dispatch({
      type: 'IFRAME_MAXIMIZE',
    });
  };

  const iframeMinimize = () => {
    chrome.runtime.sendMessage({
      type: 'IFRAME_MINIMIZE',
    });

    iframeContext.dispatch({
      type: 'IFRAME_MINIMIZE',
    });
  };

  const nameUpdate = (value: string) => {
    iframeContext.dispatch({
      type: 'NAME_UPDATE',
      payload: value,
    });
  };

  if (iframeContext.state.minimized) {
    return (
      <div className="navbar navbar-light d-flex border-top border-bottom align-items-center">
        <div className="alert alert-warning m-0" role="alert">
          Please select an element where you want to attach the tour step, <b>or</b> click{' '}
          <span className="badge badge-secondary">Cancel</span> button.
        </div>
        <div className="btn-group ml-auto" role="group" aria-label="Basic example">
          <button className="btn btn-outline-secondary" onClick={() => iframeMaximize()}>
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="navbar navbar-light d-flex border-top border-bottom align-items-center">
      <form className="form-inline my-2 my-lg-0">
        <label htmlFor="title" className="col-form-label mr-2">
          Title:
        </label>
        <input
          className="form-control"
          id="title"
          name="title"
          placeholder="Tour title"
          value={iframeContext.state.name}
          onChange={(e) => nameUpdate(e.currentTarget.value)}
          disabled={!iframeContext.state.recording}
        />
      </form>
      <div className="btn-group ml-auto" role="group" aria-label="Basic example">
        {!iframeContext.state.recording ? (
          <>
            <button className="btn btn-primary" onClick={() => recordingStart()}>
              Start recording
            </button>
            <button className="btn btn-outline-secondary" onClick={() => recordingCancel()}>
              Discard
            </button>
          </>
        ) : (
          <>
            <button className="btn btn-outline-secondary" onClick={() => iframeMinimize()}>
              Minimize
            </button>
            <button className="btn btn-outline-secondary" onClick={() => recordingCancel()}>
              Discard
            </button>
            <button className="btn btn-secondary" onClick={() => showingPreview()}>
              Preview
            </button>
            <button className="btn btn-primary" onClick={() => recordingFinish()}>
              Finish recording
            </button>
          </>
        )}
      </div>
    </div>
  );
};
