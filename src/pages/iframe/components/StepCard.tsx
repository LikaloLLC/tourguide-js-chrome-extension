import React from 'react';

import { useIframeContext } from '../contexts/iframeContext';

import Editor from './Editor/Editor';

type StepCardProps = {
  index: number;
  step: Step;
};

export const StepCard = (props: StepCardProps) => {
  const iframeContext = useIframeContext();

  const onClickRemove = () => {
    iframeContext.dispatch({
      type: 'STEP_REMOVE',
      payload: props.index,
    });
  };

  const onClickTarget = () => {
    chrome.runtime.sendMessage({
      type: 'PICKER_OPEN',
      payload: props.index,
    });

    chrome.runtime.sendMessage({
      type: 'IFRAME_MINIMIZE',
      payload: props.index,
    });

    iframeContext.dispatch({
      type: 'IFRAME_MINIMIZE',
    });
  };

  const onChange = (
    value:
      | { title: string }
      | { layout: 'horizontal' | 'vertical' }
      | { selector: string }
      | { width: number }
      | { height: number }
      | { navigation: boolean }
      | { overlay: boolean }
  ) => {
    iframeContext.dispatch({
      type: 'STEP_UPDATE',
      payload: {
        change: value,
        index: props.index,
      },
    });
  };

  return (
    <div className="pure docsie docsie-blue" id={`step-container-${props.index}`}>
      <div
        className="docsie-dialog step-card-container"
        style={{ width: 'min-content', minWidth: 'min-content', margin: 0 }}
      >
        <div
          className="docsie-dialog-header style-container"
          style={{ padding: '1em 1em 0 1em', justifyContent: 'space-between' }}
        >
          <div className="box"></div>
          <svg className="icon icon--tour " viewBox="0 0 20 20" width="32" height="32">
            <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#icon-tour"></use>
          </svg>
          <div>
            <button className="btn btn-icon" onClick={() => onClickRemove()}>
              <svg className="icon-trash" width="20" height="20" viewBox="0 0 20 20">
                <path d="M6.5 3V1.5h7V3M4.5 4v14.5h11V4" fill="none" stroke="currentColor" />
                <path fill="currentColor" d="M8 7h1v9H8zM11 7h1v9h-1zM2 3h16v1H2z" />
              </svg>
            </button>
          </div>
        </div>
        <div className="docsie-dialog-body">
          <form
            className="docsie-form docsie-form-stacked docsie-form-stacked l-h-box"
            autoComplete="off"
            noValidate={true}
          >
            {props.step.image && (
              <div className="form-group">
                <div className="docsie-relative">
                  <img src={props.step.image} alt="Step image" draggable="false" style={{ width: '100%' }} />
                </div>
              </div>
            )}
            <div className="form-group">
              <label htmlFor="title">Content:</label>
              <input
                type="text"
                name="title"
                placeholder="Step title"
                value={props.step.title}
                onChange={(event) => onChange({ title: event.target.value })}
                required
                style={{ width: '100%' }}
              />
            </div>
            <Editor defaultContent={props.step.content} index={props.index} />
            {props.step.actions && (
              <div className="form-group">
                <span>
                  <strong>Actions</strong>
                </span>
                {props.step.actions.map(({ i, label, action }) => {
                  return (
                    <div className="style-container" key={i} style={{ columnGap: 8 }}>
                      <div style={{ width: '50%' }}>
                        <label htmlFor="label">Label</label>
                        <input type="text" name="label" value={label} readOnly />
                      </div>
                      <div style={{ width: '50%' }}>
                        <label htmlFor="action">Action</label>
                        <select name="action" style={{ width: '100%', height: 41.8 }} disabled>
                          {' '}
                          <option value="" selected={action === ''}></option>
                          <option value="link" selected={action === 'link'}>
                            Open link
                          </option>
                          <option value="next" selected={action === 'next'}>
                            Next step
                          </option>
                          <option value="previous" selected={action === 'previous'}>
                            Previous step
                          </option>
                          <option value="go" selected={action === 'go'}>
                            Go-to step
                          </option>
                          <option value="stop" selected={action === 'stop'}>
                            Stop tour
                          </option>
                        </select>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            <div className="form-group">
              <label htmlFor="selector">Target: </label>
              <input
                className="docise-tour-step-input"
                type="text"
                placeholder=".selector_className"
                name="selector"
                value={props.step.selector}
                onChange={(event) => onChange({ selector: event.currentTarget.value })}
              />
              <button
                className="btn btn-sm btn-outline-secondary btn-block"
                onClick={(event) => {
                  event.preventDefault();
                  onClickTarget();
                }}
                style={{ border: '2px solid var(--docsie-gray)' }}
              >
                {props.step.selector !== '' ? 'Change target on page' : 'Select target on page'}
              </button>
            </div>
            <div className="form-group style-container docsie-tour-step-container" style={{ columnGap: 8 }}>
              <div className="docsie-tour-step-size" style={{ width: '50%' }}>
                <label htmlFor="width">Width</label>
                <input
                  name="width"
                  placeholder="auto"
                  type="number"
                  min={0}
                  value={props.step.width}
                  onChange={(event) => onChange({ width: event.currentTarget.valueAsNumber })}
                />
              </div>
              <div className="docsie-tour-step-size" style={{ width: '50%' }}>
                <label htmlFor="height">Height</label>
                <input
                  name="height"
                  placeholder="auto"
                  type="number"
                  min={0}
                  value={props.step.height}
                  onChange={(event) => onChange({ height: event.currentTarget.valueAsNumber })}
                />
              </div>
            </div>
            <div className="form-group style-container" style={{ columnGap: 8 }}>
              <span className="style-container" style={{ width: '50%', alignItems: 'center' }}>
                <input
                  name="navigation"
                  type="checkbox"
                  defaultChecked={true}
                  checked={props.step.navigation}
                  onChange={(event) => onChange({ navigation: event.currentTarget.checked })}
                />
                <label htmlFor="navigation" style={{ margin: 0, fontSize: 'smaller' }}>
                  &nbsp;Display controls
                </label>
              </span>
              <span className="style-container" style={{ width: '50%', alignItems: 'center' }}>
                <input
                  name="overlay"
                  type="checkbox"
                  checked={props.step.overlay}
                  defaultChecked={true}
                  onChange={(event) => onChange({ overlay: event.currentTarget.checked })}
                />
                <label htmlFor="overlay" style={{ margin: 0, fontSize: 'smaller' }}>
                  &nbsp;Display background overlay
                </label>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StepCard;
