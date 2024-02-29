"use client";

import Canvas from "@/components/Canvas/index";
import Chat from "@/components/Chat";
import { useChat } from "ai/react";
import { CAMERA_CHECKPOINTS } from "../constants";
import { formatInitialQuestion } from "./formatInitialQuestion";
import { useCurrentUser } from "@/contexts/CurrentUserContext";
import { useConversationLogger } from "@/components/Chat/useConversationLogger";
import { useEffect, useState } from "react";

export default function Page({
  params,
}: {
  params: { initialQuestion?: string[] };
}) {
  const currentUser = useCurrentUser();

  const [conversationUUID] = useState<string>(crypto.randomUUID());
  const [readyToLog, setReadyToLog] = useState<boolean>(false);

  const { logConversationMessages } = useConversationLogger(
    currentUser,
    conversationUUID
  );
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    initialInput: formatInitialQuestion(params.initialQuestion),
    id: conversationUUID,
    onFinish: () => setReadyToLog(true),
  });

  useEffect(() => {
    if (messages.length > 0 && readyToLog) {
      logConversationMessages(messages);
      setReadyToLog(false);
    }
  }, [messages, logConversationMessages, conversationUUID, readyToLog]);

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
