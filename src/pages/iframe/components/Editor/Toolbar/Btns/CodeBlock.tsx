import React from 'react';
import { Icon, useActive, useChainedCommands } from '@remirror/react';

const CodeBlock = () => {
  const chain = useChainedCommands();
  const { codeBlock } = useActive();

  return (
    <button
      aria-label="CodeBlock"
      className={`docsie-button docsie-button-icon ${codeBlock() && 'docsie-button-active'}`}
      onClick={(event) => {
        event.preventDefault();
        chain.toggleCodeBlock().focus().run();
      }}
    >
      <Icon name="codeLine" />
    </button>
  );
};

export default CodeBlock;
