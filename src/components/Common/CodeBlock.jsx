import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { atelierCaveDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const CodeBlock = ({ node, inline, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || '');
    return !inline && match ? (
      <SyntaxHighlighter wrapLines={true} showLineNumbers={true} language={match[1]} style={atelierCaveDark} {...props}>
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  };

  export default React.memo(CodeBlock)