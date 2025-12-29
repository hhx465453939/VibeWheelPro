import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "小馨宝 - AI心理支持助手",
  description: "温暖、安全、非评判性的AI心理支持聊天应用",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">{children}</body>
    </html>
  )
}

