import React from 'react';

const ScrollToBottomButton = ({ onClick }) => {
  return (
    <div className="floating-button" onClick={onClick}>
      {/* Add an arrow icon or any other suitable content */}
      <div className="arrow-icon">▼</div>
    </div>
  );
};

export default ScrollToBottomButton;
