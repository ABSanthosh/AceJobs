import React from "react";
import "./ChatBot.scss";

function ChatBot() {
  return (
    <div className="ChatBotWrapper">
      <div className="ChatBotWrapper__header">
        <span data-icon={String.fromCharCode(61666)} />
        Chat with us
      </div>
    </div>
  );
}

export default ChatBot;
