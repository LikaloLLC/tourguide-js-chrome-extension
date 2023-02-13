import React, { useEffect } from 'react';
import { useIframeContext } from '../contexts/iframeContext';

export const OnMessage = () => {
  const iframeContext = useIframeContext();

  useEffect(() => {
    chrome.runtime.sendMessage({
      type: 'EDIT_ON_TAB',
    });

    chrome.runtime.onMessage.addListener((message) => {
      console.log('OnMessage:', message);

      switch (message.type) {
        case 'EDIT_ON_TAB': {
          iframeContext.dispatch({
            type: 'DESCRIPTION_UPDATE',
            payload: message.payload.description,
          });

          iframeContext.dispatch({
            type: 'DOC_SET',
            payload: message.payload.doc,
          });

          iframeContext.dispatch({
            type: 'NAME_UPDATE',
            payload: message.payload.name,
          });

          iframeContext.dispatch({
            type: 'VERSION_SET',
            payload: message.payload.version,
          });

          iframeContext.dispatch({
            type: 'IMAGES_SET',
            payload: message.payload.workspaceImages,
          });

          break;
        }

        case 'PICKER_VALUE': {
          chrome.runtime.sendMessage({
            type: 'IFRAME_MAXIMIZE',
          });

          iframeContext.dispatch({
            type: 'IFRAME_MAXIMIZE',
          });

          iframeContext.dispatch({
            type: 'TARGETING_UPDATE',
            payload: message.payload.index,
          });

          iframeContext.dispatch({
            type: 'STEP_UPDATE',
            payload: {
              change: {
                selector: message.payload.value,
              },
              index: message.payload.index,
            },
          });
          break;
        }
      }
    });
  }, []);

  return <></>;
};
