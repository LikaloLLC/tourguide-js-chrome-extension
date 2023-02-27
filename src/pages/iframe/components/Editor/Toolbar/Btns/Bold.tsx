import React from 'react';
import { Icon, useActive, useChainedCommands } from '@remirror/react';

const Bold = () => {
  const chain = useChainedCommands();
  const { bold } = useActive();

  return (
    <button
      aria-label="Bold (Ctrl + b)"
      className={`docsie-button docsie-button-icon ${bold() && 'docsie-button-active'}`}
      onClick={(event) => {
        event.preventDefault();
        chain.toggleBold().focus().run();
      }}
    >
      <Icon name="bold" />
    </button>
  );
};

export default Bold;
