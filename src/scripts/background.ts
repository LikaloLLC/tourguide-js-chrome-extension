const editOnTab: {
  [tabId: number]: {
    openerTabId: number;
    title: string;
    steps: [
      {
        title: string;
        content: string;
        selector: string;
      }
    ];
  };
} = {};

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  console.log('onMessage', message);

  if (message.minimize) {
    chrome.tabs.sendMessage(sender.tab.id, { minimize: true });
  }
  if (message.openPicker) {
    chrome.tabs.sendMessage(sender.tab.id, { openPicker: true, step: message.step, minimize: true }, (response) => {
      console.log(response);
    });
  }
  if (message.pickerValue) {
    console.log(message.pickerValue);
    chrome.tabs.sendMessage(sender.tab.id, { pickerValue: message.pickerValue, maximize: true });
  }

  if (message.type === 'editOnSite') {
    const tab = await chrome.tabs.create({ url: 'https://www.google.com/' });
    editOnTab[tab.id] = message.data;
    editOnTab[tab.id].openerTabId = sender.tab.id;
  }

  if (message.type === 'editOnTab') {
  }

  if (message.type === 'finishRecording') {
    chrome.tabs.sendMessage(editOnTab[sender.tab.id].openerTabId, { type: 'finishRecording', data: message.data });
    chrome.tabs.update(editOnTab[sender.tab.id].openerTabId, { highlighted: true });
    chrome.tabs.remove(sender.tab.id);
  }
});

chrome.webNavigation.onCompleted.addListener(async (details) => {
  if (details.frameId === 0 && editOnTab[details.tabId]) {
    await chrome.scripting.executeScript({
      target: { tabId: details.tabId },
      files: ['/scripts/iframe.js', '/scripts/picker.js'],
    });

    // TODO: Change this to wait for a message and respond to know the tab has been loaded.
    setTimeout(async () => {
      await chrome.tabs.sendMessage(details.tabId, {
        type: 'editOnTab',
        data: editOnTab[details.tabId],
      });
    }, 100);
  }
});

console.log('test');
