import { useState } from "react"
import type { Message, Sender } from "../types/chat"
import ChatHistory from "./ChatHistory"
import ChatInput from "./ChatInput"

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)

  const addMessage = (text: string, sender: Sender) => {
    const newMessage: Message = {
      id: crypto.randomUUID(),
      text,
      sender,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, newMessage])
  }

  const handleSend = (text: string, sender: Sender) => {
    if (sender === "bot") {
      setIsTyping(true)
      const delay = 800 + Math.random() * 700
      setTimeout(() => {
        addMessage(text, sender)
        setIsTyping(false)
      }, delay)
    } else {
      addMessage(text, sender)
    }
  }

  return (
    <div className="flex h-dvh flex-col bg-amber-50">
      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col overflow-hidden rounded-2xl border border-gray-300 mt-[50px] mb-[50px]">
        <ChatHistory messages={messages} isTyping={isTyping} />
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  )
}
