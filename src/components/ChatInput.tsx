import { useCallback, useRef, useState } from "react"
import type { Sender } from "../types/chat"

type ChatInputProps = {
  onSend: (text: string, sender: Sender) => void
}

export default function ChatInput({ onSend }: ChatInputProps) {
  const [text, setText] = useState("")
  const [sender, setSender] = useState<Sender>("user")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const isBot = sender === "bot"
  const canSend = text.trim().length > 0

  const resetTextarea = useCallback(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
    }
  }, [])

  const handleAutoResize = () => {
    const el = textareaRef.current
    if (el) {
      el.style.height = "auto"
      el.style.height = `${el.scrollHeight}px`
    }
  }

  const handleSend = () => {
    if (!canSend) return
    onSend(text.trim(), sender)
    setText("")
    resetTextarea()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const toggleSender = () => {
    setSender((prev) => (prev === "user" ? "bot" : "user"))
  }

  return (
    <div className="p-4">
      <div
        className={`flex items-end gap-2 rounded-2xl bg-white p-3 shadow-md transition-colors ${
          isBot ? "ring-2 ring-purple-400" : "ring-1 ring-gray-200"
        }`}
      >
        {/* Toggle usuário / robô */}
        <button
          type="button"
          onClick={toggleSender}
          className={`flex shrink-0 items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-medium transition-colors ${
            isBot
              ? "bg-purple-100 text-purple-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          <span>{isBot ? "🤖" : "👤"}</span>
          <span>{isBot ? "Robô" : "Usuário"}</span>
        </button>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => {
            setText(e.target.value)
            handleAutoResize()
          }}
          onKeyDown={handleKeyDown}
          placeholder="Digite uma mensagem..."
          rows={1}
          className="max-h-32 flex-1 resize-none bg-transparent py-2 text-sm text-gray-800 outline-none placeholder:text-gray-400"
        />

        {/* Botão enviar */}
        <button
          type="button"
          onClick={handleSend}
          disabled={!canSend}
          className="flex shrink-0 items-center justify-center rounded-xl bg-gray-800 p-2 text-white transition-opacity disabled:opacity-30"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path d="M3.105 2.288a.75.75 0 0 0-.826.95l1.414 4.926A1.5 1.5 0 0 0 5.135 9.25h6.115a.75.75 0 0 1 0 1.5H5.135a1.5 1.5 0 0 0-1.442 1.086l-1.414 4.926a.75.75 0 0 0 .826.95l15.5-6.5a.75.75 0 0 0 0-1.424l-15.5-6.5Z" />
          </svg>
        </button>
      </div>
    </div>
  )
}
