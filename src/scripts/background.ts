import { getStorageContent, isTabOriginCorrect, setStorageContent } from '../utils/storageContent';

let memoUrl = '';

chrome.runtime.onMessageExternal.addListener((message) => {
  console.log('onMessageExternal', message);

  memoUrl = message.description;
});

chrome.runtime.onMessage.addListener(async (message, sender) => {
  // console.log('onMessage', message);

  switch (message.type) {
    case 'EDIT_ON_SITE': {
      const tab = await chrome.tabs.create({ url: memoUrl || 'https://www.google.com/' });
      setStorageContent(message.payload, tab.id, sender.tab.id);
      break;
    }

    case 'EDIT_ON_TAB': {
      const [state, tabId] = await getStorageContent();
      chrome.tabs.sendMessage(sender.tab.id, {
        type: 'EDIT_ON_TAB',
        payload: { ...state, tabId },
      });
      break;
    }

    case 'IFRAME_MAXIMIZE': {
      chrome.tabs.sendMessage(sender.tab.id, {
        type: 'IFRAME_MAXIMIZE',
      });
      break;
    }

    case 'IFRAME_MINIMIZE': {
      chrome.tabs.sendMessage(sender.tab.id, {
        type: 'IFRAME_MINIMIZE',
      });
      break;
    }

    case 'PICKER_OPEN': {
      chrome.tabs.sendMessage(sender.tab.id, {
        type: 'PICKER_OPEN',
        payload: message.payload,
      });
      break;
    }

    case 'PICKER_VALUE': {
      chrome.tabs.sendMessage(sender.tab.id, {
        type: 'PICKER_VALUE',
        payload: message.payload,
        // pickerValue: message.pickerValue,
        // maximize: true,
      });
      break;
    }

    case 'RECORDING_CANCEL': {
      const [state] = await getStorageContent();
      chrome.tabs.update(state.openerTabId, { highlighted: true });
      chrome.tabs.remove(sender.tab.id);
      break;
    }

    case 'SHOWING_PREVIEW': {
      chrome.tabs.sendMessage(sender.tab.id, {
        type: 'SHOWING_PREVIEW',
        payload: message.payload,
      });
      break;
    }

    case 'SAVE_STATE': {
      setStorageContent(message.payload);
      break;
    }

    case 'RECORDING_FINISH': {
      const [storageContent] = await getStorageContent();
      const { name, description, doc, openerTabId } = storageContent;
      const state = {
        name,
        description,
        doc: {
          steps: doc,
        },
      };

      chrome.scripting.executeScript({
        target: { tabId: openerTabId },
        func: function (state) {
          this.window.addEventListener('click', function () {
            this.dispatchEvent(new CustomEvent('data', { bubbles: true, detail: state }));
          });
        },
        args: [state],
      });

      chrome.tabs.update(openerTabId, { highlighted: true });
      chrome.tabs.remove(sender.tab.id);
      chrome.storage.session.clear();
      break;
    }
  }
});

chrome.webNavigation.onCompleted.addListener(async (details) => {
  if (details.frameId === 0 && (await isTabOriginCorrect(details.tabId))) {
    chrome.scripting.executeScript({
      target: { tabId: details.tabId },
      files: ['/scripts/iframe.js', '/scripts/picker.js', '/scripts/preview.js'],
    });
  }
});
