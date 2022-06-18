const iframe = document.createElement('iframe');
iframe.src = chrome.runtime.getURL('pages/iframe.html');
iframe.style.position = 'fixed';
iframe.style.bottom = '0';
iframe.style.left = '0';
iframe.style.height = '350px';
iframe.style.width = '100vw';
iframe.style.zIndex = '999999999'

document.body.append(iframe);


const marginBottom = document.body.style.marginBottom;
document.body.style.marginBottom = iframe.style.height;

function onMessage(message: any) {
  console.log('onMessage', message);

  if (message.minimize) {
    iframe.style.height = '55px';
  }

  if (message.maximize) {
    iframe.style.height = '350px';
  }

  if (message.remove) {
    iframe.remove();
    document.body.style.marginBottom = marginBottom;
    chrome.runtime.onMessage.removeListener(onMessage);
  }
}

chrome.runtime.onMessage.addListener(onMessage);
