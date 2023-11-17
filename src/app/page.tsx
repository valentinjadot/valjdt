"use client";
import Header from "@/components/Header";
import Chat from "@/components/Chat";
import { useChat } from "ai/react";

const Page: React.FC = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <Chat
        input={input}
        handleInputChange={handleInputChange}
        handleMessageSubmit={handleSubmit}
        messages={messages}
      />
    </div>
  );
};

export default Page;
