"use client"

import React, { useState, useEffect, useRef } from "react"
import { ChatLayout } from "@/components/ChatLayout"
import { MessageBubble } from "@/components/MessageBubble"
import { InputArea } from "@/components/InputArea"
import { Toast } from "@/components/Toast"
import { sendChatMessage } from "@/utils/api"
import type { Message } from "@/types/message"
import { Heart } from "lucide-react"

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "disclaimer",
      role: "system",
      content: "AI response is for emotional support only, not medical diagnosis.",
      timestamp: new Date(),
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async (content: string) => {
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content,
      timestamp: new Date(),
    }

    // 立即添加用户消息
    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    try {
      const response = await sendChatMessage(content)
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        role: "assistant",
        content: response.message,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Connection unstable, please try again"
      setToast(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ChatLayout
      header={
        <div className="flex items-center justify-center px-4 py-3">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-sage" fill="currentColor" />
            <h1 className="text-lg font-semibold text-gray-800">小馨宝</h1>
          </div>
        </div>
      }
      footer={
        <div className="px-4 py-2 border-t border-sage/20">
          <p className="text-xs text-sage-dark text-center">
            AI response is for emotional support only, not medical diagnosis.
          </p>
        </div>
      }
    >
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="max-w-4xl mx-auto py-4">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          {isLoading && (
            <div className="flex justify-start mb-4 px-4">
              <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm border border-gray-100">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-sage rounded-full animate-bounce" />
                  <div
                    className="w-2 h-2 bg-sage rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  />
                  <div
                    className="w-2 h-2 bg-sage rounded-full animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <InputArea onSend={sendMessage} disabled={false} isLoading={isLoading} />
      {toast && (
        <Toast
          message={toast}
          onClose={() => setToast(null)}
          duration={4000}
        />
      )}
    </ChatLayout>
  )
}

