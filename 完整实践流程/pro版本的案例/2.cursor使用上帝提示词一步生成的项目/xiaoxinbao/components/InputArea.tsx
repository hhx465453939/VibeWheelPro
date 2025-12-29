"use client"

import React, { useState, KeyboardEvent } from "react"
import { Send } from "lucide-react"

interface InputAreaProps {
  onSend: (message: string) => void
  disabled?: boolean
  isLoading?: boolean
}

export const InputArea: React.FC<InputAreaProps> = ({
  onSend,
  disabled = false,
  isLoading = false,
}) => {
  const [input, setInput] = useState("")

  const handleSend = () => {
    const trimmedInput = input.trim()
    if (trimmedInput && !disabled && !isLoading) {
      onSend(trimmedInput)
      setInput("")
    }
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const isSendDisabled = !input.trim() || disabled || isLoading

  return (
    <div className="flex items-end gap-2 p-4 bg-warm-white border-t border-sage/20">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="输入你的想法..."
        disabled={disabled || isLoading}
        rows={1}
        className="flex-1 resize-none rounded-xl border border-sage/30 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sage/50 focus:border-sage disabled:opacity-50 disabled:cursor-not-allowed max-h-32 overflow-y-auto scrollbar-hide"
        style={{
          minHeight: "48px",
        }}
      />
      <button
        onClick={handleSend}
        disabled={isSendDisabled}
        className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all ${
          isSendDisabled
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-sage text-white hover:bg-sage-dark active:scale-95"
        }`}
        aria-label="发送消息"
      >
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <Send className="w-5 h-5" />
        )}
      </button>
    </div>
  )
}

