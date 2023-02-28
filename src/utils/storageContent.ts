import { getCurrentUrl } from './getCurrentUrl';

interface State {
  name: string;
  description: string;
  doc: Step[];
  openerTabId: number;
}

interface Content {
  [k: number]: State;
}

type ContentWithVoid = Content & void;

export const isTabOriginCorrect = async (tabId: number): Promise<boolean> => {
  const content = (await chrome.storage.session.get(null)) as ContentWithVoid;
  return Boolean(content[tabId]);
};

export const getStorageContent = async (): Promise<[State, number]> => {
  const content = (await chrome.storage.session.get(null)) as ContentWithVoid;

  const tabId = Number(Object.keys(content)[0]);
  const url = await getCurrentUrl();
  const { doc, name, openerTabId } = content[tabId];
  const state = {
    doc,
    name,
    description: url,
    openerTabId,
  };

  return [state, tabId];
};

export const setStorageContent = async (state: State, tabId?: number, senderTabId?: number) => {
  if (tabId && senderTabId) {
    chrome.storage.session.set({
      [tabId]: {
        ...state,
        openerTabId: senderTabId,
      },
    });
  } else {
    const [oldState, tabId] = await getStorageContent();
    chrome.storage.session.set({
      [tabId]: {
        ...oldState,
        ...state,
      },
    });
  }
};
