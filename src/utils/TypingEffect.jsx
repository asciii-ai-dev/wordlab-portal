import React, { useState, useEffect } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import CodeBlock from "../components/Common/CodeBlock";

const TypingEffect = ({ text, onComplete, isNewResponse  }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
   
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, 0); // Adjust the typing speed here (in milliseconds)

      return () => clearTimeout(timeout);
    } else {
      onComplete(); // Call the onComplete function when typing is complete
    }
  }, [currentIndex, text, onComplete, isNewResponse  ]);
  const customComponents = {
    code: CodeBlock,
  };

  return (
      <ReactMarkdown components={customComponents} remarkPlugins={[remarkGfm]}>
        {isNewResponse ? displayText : text}
      </ReactMarkdown>
  );
};

export default React.memo(TypingEffect);
