import { getCssSelector } from 'css-selector-generator';
import { ElementPicker } from 'pick-dom-element';

const picker = new ElementPicker({
  borderColor: 'blue',
  borderWidth: '3px',
  boxShadow: '0 0 0 max(100vh, 100vw) rgba(0, 0, 0, 0.4)',
  zIndex: '200',
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
