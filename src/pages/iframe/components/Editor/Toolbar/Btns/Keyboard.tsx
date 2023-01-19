import React from 'react';
import { useActive, useChainedCommands } from '@remirror/react';

const Keyboard = () => {
  const chain = useChainedCommands();
  const { kbd } = useActive() as unknown as { kbd: () => boolean };

  return (
    <button
      aria-label="key"
      className={`docsie-button docsie-button-icon ${kbd() && 'docsie-button-active'}`}
      onClick={(event) => {
        event.preventDefault();
        kbd() ? chain.removeKeyboard().focus().run() : chain.toggleKeyboard().focus().run();
      }}
    >
      <svg className="icon icon--key" viewBox="0 0 20 20" width="16" height="16">
        <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#icon-key"></use>
      </svg>
    </button>
  );
};

export default Keyboard;
