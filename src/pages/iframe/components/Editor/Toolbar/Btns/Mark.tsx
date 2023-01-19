import React from 'react';
import { Icon, useActive, useChainedCommands } from '@remirror/react';

const Mark = () => {
  const chain = useChainedCommands();
  const { mark } = useActive() as unknown as { mark: () => boolean };

  return (
    <button
      aria-label="Mark"
      className={`docsie-button docsie-button-icon ${mark() && 'docsie-button-active'}`}
      onClick={(event) => {
        event.preventDefault();
        mark() ? chain.removeDocsieMark().focus().run() : chain.toggleDocsieMark().focus().run();
      }}
    >
      <Icon name="bracesLine" />
    </button>
  );
};

export default Mark;
