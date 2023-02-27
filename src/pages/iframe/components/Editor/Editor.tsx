import React from 'react';
import markdown from 'refractor/lang/markdown';
import json from 'refractor/lang/json';
import css from 'refractor/lang/css';
import javascript from 'refractor/lang/javascript';
import typescript from 'refractor/lang/typescript';
import { RemirrorEventListener } from 'remirror';
import {
  BoldExtension,
  ItalicExtension,
  UnderlineExtension,
  CodeBlockExtension,
  MarkdownExtension,
  HardBreakExtension,
} from 'remirror/extensions';
import { DocsieMarkExtension, DfnExtension, KeyboardExtension } from './CustomExtension';
import { EditorComponent, Remirror, useRemirror } from '@remirror/react';
import { Toolbar } from './Toolbar';
import { useIframeContext } from '../../contexts/iframeContext';
import './blockCode.css';

const Editor = ({ defaultContent, index }: { defaultContent: string; index: number }) => {
  const iframeContext = useIframeContext();
  const extensions = () => [
    new BoldExtension({ disableExtraAttributes: true }),
    new ItalicExtension(),
    new UnderlineExtension(),
    new CodeBlockExtension({
      supportedLanguages: [css, json, markdown, javascript, typescript],
      defaultLanguage: 'javascript',
    }),
    new DocsieMarkExtension(),
    new DfnExtension(),
    new KeyboardExtension(),
    new MarkdownExtension({ copyAsMarkdown: true }),
    new HardBreakExtension(),
  ];

  const { manager, state, setState } = useRemirror({
    extensions,
    content: defaultContent,
    stringHandler: 'markdown',
  });

  const onChange: RemirrorEventListener<Remirror.Extensions> = (parameter) => {
    const nextState = parameter.state;

    if (parameter.tr?.docChanged) {
      const { getMarkdown } = parameter.helpers;
      const markdownContent = getMarkdown(nextState);

      iframeContext.dispatch({
        type: 'STEP_UPDATE',
        payload: {
          change: { content: markdownContent },
          index,
        },
      });
    }

    setState(nextState);
  };

  return (
    <div className="remirror-theme">
      <Remirror manager={manager} initialContent={state} onChange={onChange}>
        <Toolbar />
        <EditorComponent />
      </Remirror>
    </div>
  );
};

export default Editor;
