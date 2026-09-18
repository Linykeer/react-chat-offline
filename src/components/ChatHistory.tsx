import { useEffect, useRef } from "react"
import type { Message } from "../types/chat"
import MessageBubble from "./MessageBubble"
import TypingIndicator from "./TypingIndicator"

type ChatHistoryProps = {
  messages: Message[]
  isTyping: boolean
}

export default function ChatHistory({ messages, isTyping }: ChatHistoryProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  return (
    <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} />
      ))}
      {isTyping && <TypingIndicator />}
      <div ref={bottomRef} />
    </div>
  )
}
