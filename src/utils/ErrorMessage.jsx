import React from "react";

const ErrorMessage = ({ message }) => {
  return (
    message && (
      <p className="text-[12px] text-red-700 pt-1 capitalize">
        *{message[0]}
        <span className="lowercase">{message.slice(1)}</span>
      </p>
    )
  );
};

export default ErrorMessage;
