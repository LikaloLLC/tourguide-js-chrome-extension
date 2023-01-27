const editOnTab: {
  [tabId: number]: {
    openerTabId: number;
    doc: Step[];
    name: string;
    description: string;
    version: number;
  };
} = {};

let state = { doc: { steps: <Step[]>[] }, name: '', description: '', version: 2 };

chrome.runtime.onMessageExternal.addListener((message) => {
  console.log('onMessageExternal', message);

  state = {
    doc: message.doc,
    name: message.name,
    description: message.description,
    version: message.version,
  };
});

chrome.runtime.onMessage.addListener(async (message, sender) => {
  // console.log('onMessage', message);

  switch (message.type) {
    case 'EDIT_ON_SITE': {
      const tab = await chrome.tabs.create({ url: state.description || 'https://www.google.com/' });
      editOnTab[tab.id] = {
        openerTabId: tab.id,
        doc: state.doc.steps,
        name: state.name,
        description: state.description,
        version: state.version,
      };
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

    case 'SHOWING_PREVIEW': {
      chrome.tabs.sendMessage(sender.tab.id, {
        type: 'SHOWING_PREVIEW',
        payload: message.payload,
      });
      break;
    }

    case 'RECORDING_FINISH': {
      const openerTabId = editOnTab[sender.tab.id].openerTabId;
      state = message.payload;

      chrome.scripting.executeScript({
        target: { tabId: openerTabId },
        func: (state) => {
          this.window.addEventListener('click', function () {
            this.dispatchEvent(new CustomEvent('data', { bubbles: true, detail: state }));
          });
        },
        args: [state],
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
      files: ['/scripts/iframe.js', '/scripts/picker.js', '/scripts/preview.js'],
    });
  }
});
