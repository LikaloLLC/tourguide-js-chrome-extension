import React, { useRef } from 'react';

import { wrapText } from '../../../utils/wrapText';

import { useIframeContext } from '../contexts/iframeContext';

import Editor from './Editor/Editor';

type StepCardProps = {
  index: number;
  step: Step;
};

export const StepCard = (props: StepCardProps) => {
  const iframeContext = useIframeContext();

  const textareaRef = useRef<HTMLTextAreaElement>();

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

  const onClickWrap = (openTag: string, closeTag: string) => {
    onChange({ content: wrapText(textareaRef.current, openTag, closeTag) });
    textareaRef.current.focus();
  };

  const onChange = (
    value:
      | { title: string }
      | { content: string }
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

  const onPreviewStep = () => {
    chrome.runtime.sendMessage({
      type: 'SHOWING_PREVIEW',
      payload: {
        doc: [props.step],
      },
    });
  };

  if (iframeContext.state.version === 2) {
    return (
      <div className="card step">
        <div className="card-header d-flex align-items-center dragHandle">
          <div>
            <span>Step {props.index + 1}</span>
          </div>
          <div className="ml-auto">
            <button className="btn btn-icon" onClick={() => onClickRemove()}>
              <svg className="icon-trash" width="20" height="20" viewBox="0 0 20 20">
                <path d="M6.5 3V1.5h7V3M4.5 4v14.5h11V4" fill="none" stroke="currentColor" />
                <path fill="currentColor" d="M8 7h1v9H8zM11 7h1v9h-1zM2 3h16v1H2z" />
              </svg>
            </button>
          </div>
        </div>
        <div className="card-body">
          <form className="card-form">
            <div className="form-group">
              <label className="sr-only" htmlFor="title">
                Step title
              </label>
              <input
                name="title"
                className="form-control"
                placeholder="Step title"
                value={props.step.title}
                onChange={(e) => onChange({ title: e.currentTarget.value })}
              />
            </div>
            <div className="btn-group btn-group-toggle mb-1">
              <label className="btn btn-sm btn-outline-secondary">
                <input type="radio" onClick={() => onClickWrap('<b>', '</b>')} />{' '}
                <svg className="icon-bold" width="16" height="16" viewBox="0 0 20 20">
                  <path
                    d="M5 15.3c.66 0 .9-.3.9-.77V5.5c0-.58-.34-.8-.9-.8V4h3.95c3.65 0 4.75 1.37 4.75 2.9 0 .97-.56 2.27-2.84 2.69v.11c2.39.16 3.43 1.58 3.44 2.84C14.3 14.47 12.94 16 9 16H5v-.7zm4-6c2.19 0 2.8-.8 2.85-2.3 0-1.35-.55-2.2-2.85-2.2H7.67v4.5H9zm.185 5.92C11.97 15 12.39 14 12.4 12.58 12.4 11.15 11.39 10 9 10H7.67v5h1.51z"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>
              </label>
              <label className="btn btn-sm btn-outline-secondary">
                <input type="radio" onClick={() => onClickWrap('<i>', '</i>')} />{' '}
                <svg className="icon-italic" width="16" height="16" viewBox="0 0 20 20">
                  <path
                    d="M12.63 5.48l-2.48 9.04c-.15.56.22.73 1.77.78l-.2.7H6l.2-.69c1.58-.05 1.99-.22 2.14-.78l2.48-9.04c.15-.57-.19-.73-1.73-.78L9.28 4H15l-.19.69c-1.58.06-2.03.22-2.18.79z"
                    fill="currentColor"
                    stroke="none"
                  ></path>
                </svg>
              </label>
              <label className="btn btn-sm btn-outline-secondary">
                <input type="radio" onClick={() => onClickWrap('<u>', '</u>')} />{' '}
                <svg className="icon-underline" width="16" height="16" viewBox="0 0 20 20">
                  <path
                    d="M4.276 4v.691c.84 0 1.043.33 1.043.993V12.5c0 1.933 1.646 3.5 4.181 3.5 2.472 0 4.158-1.567 4.158-3.5V5.684c0-.663.169-.993 1.01-.993V4h-3.672v.691c.84 0 1.004.33 1.004.993V12.5a2.5 2.5 0 11-5 0V5.684c0-.663.142-.993.982-.993V4z"
                    fill="currentColor"
                    stroke="none"
                  ></path>
                  <path d="M4 18h11v1H4z" fill="none" stroke="currentColor"></path>
                </svg>
              </label>
              <label className="btn btn-sm btn-outline-secondary">
                <input type="radio" onClick={() => onClickWrap('<mark>', '</mark>')} />{' '}
                <svg className="icon-mark" width="16" height="16" viewBox="0 0 20 20">
                  <circle cx="10" cy="10" r="10" fill="yellow" stroke="none" />
                </svg>
              </label>
              <label className="btn btn-sm btn-outline-secondary">
                <input type="radio" onClick={() => onClickWrap('<dfn>', '</dfn>')} />{' '}
                <svg className="icon-highlight" width="16" height="16" viewBox="0 0 20 20">
                  <circle cx="10" cy="10" r="10" fill="pink" stroke="none" />
                </svg>
              </label>
              <label className="btn btn-sm btn-outline-secondary">
                <input type="radio" onClick={() => onClickWrap('<kbd>', '</kbd>')} />{' '}
                <svg className="icon-button" width="16" height="16" viewBox="0 0 20 20">
                  <path
                    d="M4.005 17.501c-.8 0-1.5-.7-1.5-1.5V3.985c0-.8.7-1.5 1.5-1.5H16c.8 0 1.5.7 1.5 1.5v12.016c0 .8-.7 1.5-1.5 1.5z"
                    fill="none"
                    stroke="currentColor"
                  ></path>
                  <path d="M8 10.5h3.465V5" fill="none" stroke="currentColor"></path>
                  <path d="M9.515 8.97L8 10.484 9.515 12" fill="none" stroke="currentColor"></path>
                  <path d="M3 14.556h14V17H3z" fill-opacity=".5"></path>
                </svg>
              </label>
            </div>
            <div className="form-group">
              <label className="sr-only" htmlFor="conent">
                Step content
              </label>
              <textarea
                ref={textareaRef}
                name="content"
                placeholder="Step content"
                className="form-control"
                value={props.step.content}
                onChange={(e) => onChange({ content: e.currentTarget.value })}
              ></textarea>
            </div>
          </form>
          <div className="form-group m-0">
            {props.step.selector !== '' ? (
              <button className="btn btn-sm btn-outline-secondary btn-block" onClick={() => onClickTarget()}>
                Change target on page
              </button>
            ) : (
              <button className="btn btn-sm btn-outline-primary btn-block" onClick={() => onClickTarget()}>
                Select target on page
              </button>
            )}
            <div className="selector">{props.step.selector || 'undefined'}</div>
          </div>
        </div>
      </div>
    );
  }

  if (iframeContext.state.version === 3) {
    return (
      <div className="pure docsie docsie-blue" id={`step-container-${props.index}`}>
        <div
          className="docsie-dialog step-card-container dragHandle"
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
            <div className="box"></div>
          </div>
          <div
            className="docsie-dialog-header style-container"
            style={{ padding: '0 1.5em', justifyContent: 'space-between' }}
          >
            <button
              onClick={onPreviewStep}
              className="docsie-button docsie-button-icon docsie-button-ghost"
              aria-label="Preview step"
            >
              <svg className="icon icon--preview" viewBox="0 0 20 20" width="20" height="20">
                <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#icon-preview"></use>
              </svg>
            </button>
            <div className="box"></div>
            <button className="btn btn-icon" onClick={() => onClickRemove()}>
              <svg className="icon-trash" width="20" height="20" viewBox="0 0 20 20">
                <path d="M6.5 3V1.5h7V3M4.5 4v14.5h11V4" fill="none" stroke="currentColor" />
                <path fill="currentColor" d="M8 7h1v9H8zM11 7h1v9h-1zM2 3h16v1H2z" />
              </svg>
            </button>
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
  }
};
