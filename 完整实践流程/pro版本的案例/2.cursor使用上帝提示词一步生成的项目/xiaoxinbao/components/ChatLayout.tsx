"use client"

import React from "react"

interface ChatLayoutProps {
  children: React.ReactNode
  header?: React.ReactNode
  footer?: React.ReactNode
}

export const ChatLayout: React.FC<ChatLayoutProps> = ({
  children,
  header,
  footer,
}) => {
  return (
    <div className="flex flex-col h-screen max-h-screen overflow-hidden bg-warm-white">
      {header && (
        <header className="flex-shrink-0 border-b border-sage/20 bg-warm-white">
          {header}
        </header>
      )}
      <main className="flex-1 overflow-hidden flex flex-col">{children}</main>
      {footer && (
        <footer className="flex-shrink-0 border-t border-sage/20 bg-warm-white">
          {footer}
        </footer>
      )}
    </div>
  )
}

