const heightMaximized = '360px';
const heightMinimized = '55px';

const heightSet = (height: typeof heightMaximized | typeof heightMinimized) => {
  iframe.style.height = height;
  document.body.style.marginBottom = height;
};

const iframe = document.createElement('iframe');
iframe.src = chrome.runtime.getURL('pages/iframe/index.html');
iframe.style.position = 'fixed';
iframe.style.bottom = '0';
iframe.style.left = '0';
iframe.style.width = '100vw';
iframe.style.zIndex = '999999999';
iframe.style.border = 'none';
iframe.style.boxShadow = '0 0 10px';
document.body.append(iframe);

heightSet(heightMaximized);

chrome.runtime.onMessage.addListener((message) => {
  switch (message.type) {
    case 'IFRAME_MAXIMIZE': {
      heightSet(heightMaximized);
      break;
    }

    case 'IFRAME_MINIMIZE': {
      heightSet(heightMinimized);
      break;
    }
  }
});
