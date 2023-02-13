import produce from 'immer';
import React, { useContext, useReducer } from 'react';

type IframeContextState = {
  doc: Step[];
  name: string;
  description: string;
  version: number;
  workspaceImages: WorkspaceImages[];
  minimized: boolean;
  recording: boolean;
  targeting: number;
};

type IframeContextActions =
  | {
      type: 'DOC_SET';
      payload: Step[];
    }
  | {
      type: 'STEP_ADD';
      payload?: undefined;
    }
  | {
      type: 'STEP_REMOVE';
      payload: number;
    }
  | {
      type: 'STEP_UPDATE';
      payload: {
        change: { [k: string]: string | number | boolean };
        index: number;
      };
    }
  | {
      type: 'NAME_UPDATE';
      payload: string;
    }
  | {
      type: 'DESCRIPTION_UPDATE';
      payload: string;
    }
  | {
      type: 'IFRAME_MINIMIZE';
      payload?: undefined;
    }
  | {
      type: 'IFRAME_MAXIMIZE';
      payload?: undefined;
    }
  | {
      type: 'RECORDING_UPDATE';
      payload: boolean;
    }
  | {
      type: 'TARGETING_UPDATE';
      payload: number;
    }
  | {
      type: 'VERSION_SET';
      payload: number;
    }
  | {
      type: 'IMAGES_SET';
      payload: WorkspaceImages[];
    };

const initialState: IframeContextState = {
  doc: null,
  name: null,
  description: null,
  version: null,
  workspaceImages: [],
  minimized: false,
  recording: null,
  targeting: null,
};

const reducer = (state: IframeContextState, action: IframeContextActions) =>
  produce(state, (draft) => {
    console.log('action', action.type, action.payload);

    switch (action.type) {
      case 'DOC_SET': {
        draft.doc = action.payload;
        break;
      }
      case 'NAME_UPDATE': {
        draft.name = action.payload;
        break;
      }

      case 'IFRAME_MAXIMIZE': {
        draft.minimized = false;
        break;
      }

      case 'IFRAME_MINIMIZE': {
        draft.minimized = true;
        break;
      }

      case 'STEP_ADD': {
        draft.doc.push({
          step: draft.doc.length + 1,
          image: null,
          layout: 'vertical',
          title: '',
          content: '',
          selector: '',
        });
        break;
      }

      case 'STEP_REMOVE': {
        draft.doc.splice(action.payload, 1);
        draft.doc = draft.doc.map((steps: Step, index) => {
          steps.step = index + 1;

          return steps;
        });
        break;
      }
      case 'STEP_UPDATE': {
        draft.doc[action.payload.index] = {
          ...draft.doc[action.payload.index],
          ...action.payload.change,
        };
        break;
      }

      case 'RECORDING_UPDATE': {
        draft.recording = action.payload;
        break;
      }

      case 'VERSION_SET': {
        draft.version = action.payload;
        break;
      }

      case 'IMAGES_SET': {
        draft.workspaceImages = action.payload;
        break;
      }
    }
  });

const initialContext: { state: IframeContextState; dispatch: React.Dispatch<IframeContextActions> } = {
  state: initialState,
  dispatch: () => {},
};

const IframeContext = React.createContext(initialContext);

export const IframeProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <IframeContext.Provider value={{ state, dispatch }}>{props.children}</IframeContext.Provider>;
};

export const useIframeContext = () => useContext(IframeContext);
