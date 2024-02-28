import { Message } from "ai";
import { useRef } from "react";

export default function Messages({ messages }: { messages: Message[] }) {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  return (
    <div className=" border-gray-600 p-6 rounded-lg overflow-y-scroll pb-20 flex-grow flex flex-col font-mono text-white">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`my-2 p-3 rounded hover:shadow-lg transition-shadow duration-200 flex items-center `}
        >
          <div className="rounded-tl-lgp-2"></div>
          <div className="ml-2 flex items-center text-gray-200 mix-blend-difference font-extralight text-xs md:text-base">
            <div>
              <span className="font-black	inline">
                {msg.role === "user" ? "❂" : "⚆"}
              </span>{" "}
              {msg.content}
            </div>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
