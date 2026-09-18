export type Sender = "user" | "bot"

export type Message = {
  id: string
  text: string
  sender: Sender
  timestamp: Date
}
