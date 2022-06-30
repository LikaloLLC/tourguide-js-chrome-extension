import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';

import { IframeProvider } from '../contexts/iframeContext';

import { Body } from './Body';
import { Header } from './Header';
import { OnMessage } from './OnMessage';
import { Style } from './Style';

export const App = () => {
  return (
    <IframeProvider>
      <Style />
      <OnMessage />
      <div className="d-flex flex-column">
        <Header />
        <Body />
      </div>
    </IframeProvider>
  );
};
