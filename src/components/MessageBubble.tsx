import type { Message } from "../types/chat"

type MessageBubbleProps = {
  message: Message
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  })
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.sender === "user"

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className="max-w-[75%] rounded-2xl bg-white px-4 py-2 shadow-sm">
        <p className="whitespace-pre-wrap break-words text-sm text-gray-800">
          {message.text}
        </p>
        <span className="mt-1 block text-right text-xs text-gray-400">
          {formatTime(message.timestamp)}
        </span>
      </div>
    </div>
  )
}
