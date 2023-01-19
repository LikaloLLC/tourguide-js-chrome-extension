import React from 'react';
import { Icon, useActive, useChainedCommands } from '@remirror/react';

const Italic = () => {
  const chain = useChainedCommands();
  const { italic } = useActive();

  return (
    <button
      aria-label="Italic (Ctrl + i)"
      className={`docsie-button docsie-button-icon ${italic() && 'docsie-button-active'}`}
      onClick={(event) => {
        event.preventDefault();
        chain.toggleItalic().focus().run();
      }}
    >
      <Icon name="italic" />
    </button>
  );
};

export default Italic;
