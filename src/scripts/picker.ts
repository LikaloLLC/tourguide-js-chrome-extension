import { getCssSelector } from 'css-selector-generator';
import { ElementPicker } from 'pick-dom-element';

const picker = new ElementPicker({
  borderColor: 'blue',
  borderWidth: '3px',
  boxShadow: '0 0 0 max(100vh, 100vw) rgba(0, 0, 0, 0.4)',
  zIndex: '200',
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('onMessage', message);

  if (message.openPicker) {
    picker.start({
      onHover: (el) => {
        console.log('hover', { el: el, querySelector: getCssSelector(el) });
      },
      onClick: (el) => {
        picker.stop();
        console.log('click', { el: el, querySelector: getCssSelector(el) });
        //sendResponse({ el: el, querySelector: getCssSelector(el) });
        chrome.runtime.sendMessage({ pickerValue: { querySelector: getCssSelector(el) }, stepIndex: message.step });
      },
    });
  }
});
