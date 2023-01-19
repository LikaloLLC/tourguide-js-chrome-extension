import React from 'react';

import { Bold, Italic, Underline, CodeBlock, Mark, Dfn, Keyboard } from './Btns';

const Toolbar = () => {
  const btns = [Bold, Italic, Underline, CodeBlock, Mark, Dfn, Keyboard];

  return (
    <nav className="docsie-menu docsie-menu-horizontal" style={{ margin: '8px 0' }}>
      <ul className="docsie-menu-list docsie-u" style={{ columnGap: '4px' }}>
        {btns.map((Btn, i) => (
          <li key={i} className="docsie-menu-item docsie-button-group">
            <Btn />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Toolbar;
