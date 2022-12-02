import { getCssSelector } from 'css-selector-generator';
import { ElementPicker } from 'pick-dom-element';
import { getMaxZIndex } from '../utils/getMaxZIndex';

const picker = new ElementPicker({
  borderColor: '#0d6efd',
  borderWidth: '4px',
  borderRadius: '2px',
  boxShadow: '0 0 0 max(100vh, 100vw) rgba(0, 0, 0, 0.4)',
  zIndex: (getMaxZIndex() + 1).toString(),
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.type) {
    case 'IFRAME_MAXIMIZE': {
      picker.stop();
      break;
    }

    case 'PICKER_OPEN': {
      picker.start({
        onClick: (el) => {
          chrome.runtime.sendMessage({
            type: 'PICKER_VALUE',
            payload: {
              value: getCssSelector(el),
              index: message.payload,
            },
          });

          picker.stop();
        },
      });
      break;
    }
  }
});
