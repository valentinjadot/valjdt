// Chat.tsx

import React, { ChangeEvent, useEffect, useRef } from "react";
import Messages from "./Messages";
import { Message } from "ai/react";
import { ChatRequestOptions } from "ai";

interface Chat {
  input: string;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleMessageSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    chatRequestOptions?: ChatRequestOptions
  ) => void;
  messages: Message[];
  hasInitialQuestion?: boolean;
}

const Chat: React.FC<Chat> = ({
  input,
  handleInputChange,
  handleMessageSubmit,
  messages,
  hasInitialQuestion,
}) => {
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!hasInitialQuestion) return;
    setTimeout(() => submitButtonRef.current?.click(), 2000);
  }, [hasInitialQuestion]);

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div id="chat" className="flex flex-col">
      <Messages messages={messages} />

      <>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleMessageSubmit(e);
            inputRef.current?.blur();
          }}
          className="fixed bottom-0 left-0 right-0 m-5"
        >
          <input
            type="text"
            className="input-glow z-0 appearance-none border rounded-lg w-full py-2 px-3 text-s md:text-xl text-gray-200 leading-tight focus:outline-none focus:shadow-outline pl-3 pr-10 bg-transparent border-gray-600 transition-shadow duration-200"
            value={input}
            onChange={handleInputChange}
            placeholder="Any question for Valentin?"
          />

          <button
            ref={submitButtonRef}
            type="submit"
            className="absolute inset-y-0 right-0 flex items-center pr-4 text-xs md:text-xl text-gray-200"
          >
            ⮐
          </button>
        </form>
      </>
    </div>
  );
};

export default Chat;
