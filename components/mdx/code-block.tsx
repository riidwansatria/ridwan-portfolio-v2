'use client'

import { useState, useRef, type ComponentPropsWithoutRef } from 'react'
import { Check, Copy } from 'lucide-react'

type MdxPreProps = ComponentPropsWithoutRef<'pre'> & { 'data-title'?: string }

export function MdxPre({ 'data-title': title, ...props }: MdxPreProps) {
  const [copied, setCopied] = useState(false)
  const ref = useRef<HTMLPreElement>(null)

  function copy() {
    const text = ref.current?.querySelector('code')?.innerText ?? ''
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }

  const copyButton = (
    <button
      onClick={copy}
      aria-label="Copy code"
      className="p-1 rounded text-muted-foreground hover:text-foreground transition-colors"
    >
      {copied ? <Check size={13} /> : <Copy size={13} />}
    </button>
  )

  return (
    <div className="group">
      {title && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-border font-mono text-xs text-muted-foreground">
          <span>{title}</span>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            {copyButton}
          </div>
        </div>
      )}
      <div className="relative">
        <pre {...props} ref={ref} />
        {!title && (
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            {copyButton}
          </div>
        )}
      </div>
    </div>
  )
}
