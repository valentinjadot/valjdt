"use client";

import Canvas from "@/components/Canvas/index";
import Chat from "@/components/Chat";
import { useChat } from "ai/react";
import { CAMERA_CHECKPOINTS } from "./constants";

const Page: React.FC = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <Canvas cameraCheckpoints={CAMERA_CHECKPOINTS} />
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
