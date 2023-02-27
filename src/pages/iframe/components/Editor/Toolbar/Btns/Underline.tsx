import React from 'react';
import { Icon, useActive, useChainedCommands } from '@remirror/react';

const Underline = () => {
  const chain = useChainedCommands();
  const { underline } = useActive();

  return (
    <button
      aria-label="Underline (Ctrl + u)"
      className={`docsie-button docsie-button-icon ${underline() && 'docsie-button-active'}`}
      onClick={(event) => {
        event.preventDefault();
        chain.toggleUnderline().focus().run();
      }}
    >
      <Icon name="underline" />
    </button>
  );
};

export default Underline;
