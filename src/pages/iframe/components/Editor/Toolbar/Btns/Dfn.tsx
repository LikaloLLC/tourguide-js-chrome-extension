import React from 'react';
import { useActive, useChainedCommands } from '@remirror/react';

const Dfn = () => {
  const chain = useChainedCommands();
  const { dfn } = useActive() as unknown as { dfn: () => boolean };

  return (
    <button
      aria-label="Dfn"
      className={`docsie-button docsie-button-icon ${dfn() && 'docsie-button-active'}`}
      onClick={(event) => {
        event.preventDefault();
        dfn() ? chain.removeDfn().focus().run() : chain.toggleDfn().focus().run();
      }}
    >
      <svg className="icon icon--brakets" viewBox="0 0 20 20" width="16" height="16">
        <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#icon-brakets"></use>
      </svg>
    </button>
  );
};

export default Dfn;
