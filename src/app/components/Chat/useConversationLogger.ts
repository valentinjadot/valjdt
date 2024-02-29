import { Conversation, User, Prisma } from "@prisma/client";
import { Message } from "ai";
import { useEffect, useState } from "react";

export function useConversationLogger(
  currentUser: User | null,
  conversationUUID: string
) {
  const [conversation, setConversation] = useState<Conversation | undefined>(
    undefined
  );

  useEffect(() => {
    const findOrCreateConversation = async () => {
      if (!currentUser) {
        return;
      }

      const data: Prisma.ConversationCreateArgs["data"] = {
        userId: currentUser.id,
        uuid: conversationUUID,
      };

      const response = await fetch("/api/conversation", {
        method: "POST",
        body: JSON.stringify({
          data,
        }),
      });

      const json = await response.json();
      if (!response.ok) throw new Error(json.error);

      return json.conversation as Conversation;
    };

    findOrCreateConversation().then((conversation) => {
      setConversation(conversation);
    });
  }, [currentUser, conversationUUID]);

  const logConversationMessages = async (messages: Message[]) => {
    if (!currentUser || !conversation) {
      return;
    }

    const messagesCreateManyArgs: Prisma.MessageCreateManyArgs = {
      data: messages.map((message) => ({
        conversationId: conversation.id,
        role: message.role,
        uuid: message.id,
        senderId: message.role === "assistant" ? 1 : currentUser.id,
        messageText: message.content,
      })),
    };

    const result = await fetch("/api/messages", {
      method: "POST",
      body: JSON.stringify(messagesCreateManyArgs),
    });

    console.log(result);
  };

  return { logConversationMessages };
}
