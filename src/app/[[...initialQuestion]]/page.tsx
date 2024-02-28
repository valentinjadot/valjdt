"use client";

import Canvas from "@/components/Canvas/index";
import Chat from "@/components/Chat";
import { useChat } from "ai/react";
import { CAMERA_CHECKPOINTS } from "../constants";

const formatInitialQuestion = (initialQuestion: string[] | undefined) => {
  if (!initialQuestion) return "";

  const sentence = initialQuestion[0].split("-").join(" ");
  const uppercasedSentence =
    sentence.charAt(0).toUpperCase() + sentence.slice(1);

  return uppercasedSentence;
};

export default function Page({
  params,
}: {
  params: { initialQuestion?: string[] };
}) {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    initialInput: formatInitialQuestion(params.initialQuestion),
  });

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
        hasInitialQuestion={!!params.initialQuestion}
      />
    </div>
  );
}
