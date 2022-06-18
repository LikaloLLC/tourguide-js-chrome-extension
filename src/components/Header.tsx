import React, { useState } from 'react';

interface HeaderProps {
  steps: Step[];
  recording: boolean;
  setRecording: React.Dispatch<React.SetStateAction<boolean>>;
}

function Header(props: HeaderProps) {
  const [minimized, setMinimized] = useState<boolean>(false);

  function onClickStart() {
    props.setRecording(true);
  }

  function onClickFinish() {
    chrome.runtime.sendMessage({ type: 'finishRecording', data: { title: 'TODO', steps: props.steps } });
  }

  function onClickCancel() {}

  function onClickMinimize() {
    setMinimized(true);
    chrome.runtime.sendMessage({ minimize: true });
  }

  if (minimized) {
    return (
      <div className="navbar navbar-light d-flex border-top border-bottom align-items-center">
        <div className="alert alert-warning m-0" role="alert">
          Please select an element where you want to attach the tour step, <b>or</b> click{' '}
          <span className="badge badge-secondary">Cancel</span> button.
        </div>
        <div className="btn-group ml-auto" role="group" aria-label="Basic example">
          <button className="btn btn-outline-secondary">Cancel</button>
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
        <input className="form-control" id="title" name="title" placeholder="Tour title" value="Tour" disabled />
      </form>
      <div className="btn-group ml-auto" role="group" aria-label="Basic example">
        {!props.recording ? (
          <>
            <button className="btn btn-primary" onClick={() => onClickStart()}>
              Start recording
            </button>
            <button className="btn btn-outline-secondary" onClick={() => onClickCancel()}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <button className="btn btn-outline-secondary" onClick={() => onClickMinimize()}>
              Minimize
            </button>
            <button className="btn btn-outline-secondary" onClick={() => onClickCancel()}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={() => onClickFinish()}>
              Finish recording
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
