import axios from "axios"
import type { ChatResponse } from "@/types/message"

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
})

export const sendChatMessage = async (
  message: string
): Promise<ChatResponse> => {
  try {
    const response = await api.post<ChatResponse>("/api/chat", {
      message,
    })
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.error || "Connection unstable, please try again"
      )
    }
    throw new Error("Connection unstable, please try again")
  }
}

