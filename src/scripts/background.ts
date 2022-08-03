import { getCurrentUrl } from '../utils/getCurrentUrl';

const editOnTab: {
  [tabId: number]: {
    openerTabId: number;
    doc: Step[];
    name: string;
    description: string;
  };
} = {};

let memoUrl = '';
let newUrl = '';

chrome.runtime.onMessageExternal.addListener((message, sender, sendResponse) => {
  console.log('onMessageExternal', message);

  memoUrl = message.description;

  memoUrl !== newUrl && sendResponse(newUrl);

  return true;
});

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  console.log('onMessage', message);

  switch (message.type) {
    case 'EDIT_ON_SITE': {
      const tab = await chrome.tabs.create({ url: memoUrl });
      editOnTab[tab.id] = message.payload;
      editOnTab[tab.id].openerTabId = sender.tab.id;
      break;
    }

    case 'EDIT_ON_TAB': {
      chrome.tabs.sendMessage(sender.tab.id, {
        type: 'EDIT_ON_TAB',
        payload: editOnTab[sender.tab.id],
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
      const openerTabId = editOnTab[sender.tab.id].openerTabId;
      chrome.tabs.update(openerTabId, { highlighted: true });
      chrome.tabs.remove(sender.tab.id);
      break;
    }

    case 'RECORDING_FINISH': {
      newUrl = await getCurrentUrl();

      const openerTabId = editOnTab[sender.tab.id].openerTabId;
      chrome.tabs.sendMessage(openerTabId, {
        type: 'RECORDING_FINISH',
        payload: message.payload,
      });
      chrome.tabs.update(openerTabId, { highlighted: true });
      chrome.tabs.remove(sender.tab.id);
      break;
    }
  }
});

chrome.webNavigation.onCompleted.addListener((details) => {
  if (details.frameId === 0 && editOnTab[details.tabId]) {
    chrome.scripting.executeScript({
      target: { tabId: details.tabId },
      files: ['/scripts/iframe.js', '/scripts/picker.js'],
    });
  }
});
