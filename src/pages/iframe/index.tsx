import React from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './components/App';

const container = document.querySelector('#root');
const root = createRoot(container);
root.render(<App />);


fetch(new Request("https://appcdn2.docsie.io/images/icons.svg"), {
  headers: {
    "Content-Type": "text/plain",
  },
}).then((response) => response.text()).then((assets) => {
  const asset = document.createElement("div");
  asset.style.display = "none";
  asset.innerHTML = assets;
  container.append(asset);
});